import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Radio, List, Typography, Progress, Tag, notification, Button, Modal, DatePicker, TimePicker } from 'antd';
import api from '../services/Api'; // Adjust based on your API file
import moment from 'moment'; // Import moment.js

const { Text } = Typography;

const CalendarSection = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', or 'day'
  const [reminderModalVisible, setReminderModalVisible] = useState(false);
  const [reminderDetails, setReminderDetails] = useState({
    taskId: null,
    reminderDate: null,
    reminderTime: null,
  });

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks'); // Replace with the correct API endpoint
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component mounts
  }, []);

  // Handle reminders
  const scheduleReminder = () => {
    const { taskId, reminderDate, reminderTime } = reminderDetails;
    const reminderDateTime = moment(reminderDate).set({
      hour: reminderTime.hour(),
      minute: reminderTime.minute(),
    });

    if (!taskId || !reminderDate || !reminderTime) {
      notification.error({ message: 'Please fill in all reminder details.' });
      return;
    }

    const task = tasks.find((task) => task.taskId === taskId);
    setTimeout(() => {
      notification.info({
        message: `Reminder for Task: ${task.title}`,
        description: `This is your reminder for the task due on ${moment(task.dueDate).format('YYYY-MM-DD')}.`,
      });
    }, reminderDateTime.diff(moment()));

    setReminderModalVisible(false);
  };

  // Render tasks on specific date cells
  const handleDateCellRender = (value) => {
    const currentTasks = tasks.filter((task) =>
      moment(task.dueDate).isSame(value, 'day')
    );
    return (
      <div>
        {currentTasks.map((task) => (
          <Badge
            key={task.taskId}
            status={
              moment(task.dueDate).isBefore(moment()) && !task.isCompleted
                ? 'error' // Overdue task
                : task.isCompleted
                ? 'success' // Completed task
                : 'processing' // In progress
            }
            text={
              <span style={task.isImportant ? { fontWeight: 'bold', color: 'red' } : {}}>
                {task.title}
                {task.isCompleted && (
                  <Tag
                    color="green"
                    style={{
                      marginLeft: '8px',
                      fontSize: '10px',
                      transform: 'rotate(-15deg)',
                    }}
                  >
                    DONE
                  </Tag>
                )}
                {moment(task.dueDate).isBefore(moment()) && !task.isCompleted && (
                  <Tag color="red" style={{ marginLeft: '8px', fontSize: '10px' }}>
                    OVERDUE
                  </Tag>
                )}
              </span>
            }
          />
        ))}
      </div>
    );
  };

  // Handle view mode change
  const handleViewChange = (e) => {
    setViewMode(e.target.value);
  };

  // Filter tasks based on the view mode
  const filteredTasks = tasks.filter((task) => {
    const taskDate = moment(task.dueDate);
    if (viewMode === 'month') return true;
    if (viewMode === 'week') return taskDate.isSame(selectedDate, 'week');
    if (viewMode === 'day') return taskDate.isSame(selectedDate, 'day');
    return false;
  });

  return (
    <div>
      {/* View Mode Selector */}
      <Radio.Group
        value={viewMode}
        onChange={handleViewChange}
        style={{ marginBottom: '16px' }}
      >
        <Radio.Button value="month">Monthly</Radio.Button>
        <Radio.Button value="week">Weekly</Radio.Button>
        <Radio.Button value="day">Daily</Radio.Button>
      </Radio.Group>

      {/* Calendar Component */}
      {viewMode === 'month' && (
        <Calendar
          dateCellRender={handleDateCellRender}
          onSelect={(date) => setSelectedDate(date)}
        />
      )}

      {/* Task List for Selected View */}
      {viewMode !== 'month' && (
        <div style={{ marginTop: '16px' }}>
          <h3>{viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Tasks</h3>
          <List
            bordered
            dataSource={filteredTasks}
            renderItem={(item) => (
              <List.Item>
                <div style={{ width: '100%' }}>
                  <span>
                    {item.title}
                    {item.isCompleted && (
                      <Tag
                        color="green"
                        style={{
                          marginLeft: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}
                      >
                        COMPLETED ✔
                      </Tag>
                    )}
                    {moment(item.dueDate).isBefore(moment()) && !item.isCompleted && (
                      <Tag
                        color="red"
                        style={{
                          marginLeft: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}
                      >
                        OVERDUE
                      </Tag>
                    )}
                  </span>
                  <Progress
                    percent={item.progress || 0}
                    status={
                      item.isCompleted
                        ? 'success'
                        : moment(item.dueDate).isBefore(moment()) && !item.isCompleted
                        ? 'exception'
                        : 'active'
                    }
                    showInfo={false}
                    style={{ marginTop: '8px', marginBottom: '8px' }}
                  />
                  <Text type={item.isCompleted ? 'success' : 'warning'}>
                    {item.isCompleted
                      ? 'Task Completed!'
                      : `Due on: ${moment(item.dueDate).format('YYYY-MM-DD')}`}
                  </Text>
                  {!item.isCompleted && (
                    <Button
                      type="primary"
                      style={{ marginLeft: '16px' }}
                      onClick={() =>
                        setReminderModalVisible(true) ||
                        setReminderDetails({ ...reminderDetails, taskId: item.taskId })
                      }
                    >
                      Set Reminder
                    </Button>
                  )}
                </div>
              </List.Item>
            )}
          />
        </div>
      )}

      {/* Reminder Modal */}
      <Modal
        title="Set Reminder"
        visible={reminderModalVisible}
        onCancel={() => setReminderModalVisible(false)}
        onOk={scheduleReminder}
      >
        <DatePicker
          style={{ marginBottom: '16px', width: '100%' }}
          onChange={(date) => setReminderDetails({ ...reminderDetails, reminderDate: date })}
        />
        <TimePicker
          style={{ width: '100%' }}
          onChange={(time) => setReminderDetails({ ...reminderDetails, reminderTime: time })}
        />
      </Modal>
    </div>
  );
};

export default CalendarSection;
