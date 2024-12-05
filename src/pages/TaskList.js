import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, notification, Popconfirm, Row, Col, Spin, Typography, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../services/Api';
import moment from 'moment';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const pastelColors = [
  '#FFDAB9', // Peach Puff 
  '#FFFACD', // Lemon Chiffon
  '#E0FFFF', // Light Cyan
  '#D8BFD8', // Thistle
  '#E6E6FA', // Lavender
];

const TaskList = () => {
  const { planId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTask, setEditingTask] = useState({
    _id:'',
    title: '',
    dueDate: '',
    completedHours:0,
    isCompleted: false,
    target: 0,
    progress: 0,
    week: ''
  });
  const [isModalVisible, setIsModalVisible] = useState(false);


 // Function to fetch tasks
 useEffect(() => {
  let isMounted = true; // To handle component unmounting
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/${planId}/tasks`);
      if (isMounted) {
        setTasks(response.data.tasks || []);
      }
    } catch (error) {
      notification.error({ message: 'Error fetching tasks', description: error.message });
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  };

  if (planId) {
    fetchTasks(); // Only fetch if planId is available
  }

  return () => {
    isMounted = false; // Cleanup to prevent memory leaks
  };
}, [planId]); // Dependency on planId




  const handleDelete = async (taskId) => {
    try {
      const response = await api.delete(`/deleteTask/${taskId}`);
      if (response.data.success) {
        notification.success({ message: 'Task deleted successfully!' });
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      }
    } catch (error) {
      notification.error({ message: 'Error deleting task', description: error.message });
    }
  };

  const handleEditTask = (task) => {
    // setEditingTask(task);
    setEditingTask({
      _id: task._id,
      title: task.title,
      dueDate: moment(task.dueDate).format('YYYY-MM-DD'),
      completedHours:task.completedHours,
      target: task.target,
      // progress: task.progress,
      week: task.week
    });
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingTask(null);
  };


  const handleTaskSubmit = async (values) => {
    try {
      const updatedTask = { ...editingTask, ...values };
      console.log("Updated Task",updatedTask);
      const response = await api.put(`/task/${updatedTask._id}`, updatedTask);
      if (response.data.success) {
        notification.success({ message: 'Task updated successfully!' });
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
        setIsModalVisible(false);
        setEditingTask(null);
      }
    } catch (error) {
      notification.error({ message: 'Error updating task', description: error.message });
    }
  };
  
  return (
    <div className="task-list">
      <Title level={3} style={{ textAlign: 'center', color: '#333' }}>
        Tasks for Selected Planner
      </Title>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Spin size="large" />
        </div>
      ) : tasks.length === 0 ? (
        <Paragraph style={{ textAlign: 'center' }}>No tasks available for this planner.</Paragraph>
      ) : (
<Row gutter={[16, 16]}>
  {tasks.map((task, index) => {
    const progressPercentage = task.target > 0 
      ? Math.min((task.progress / task.target) * 100, 100).toFixed(2) 
      : 0;

    return (
      <Col xs={24} sm={12} md={8} lg={8} xl={8} key={task._id}>
        <Card
          hoverable
          style={{
            width: '100%',
            minWidth: 300,
            height: 'auto',
            maxHeight: '500px',
            marginBottom: 16,
            backgroundColor: pastelColors[index % pastelColors.length],
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
        >
          <Meta
            title={
              <Title level={4} style={{ color: '#333', fontSize: '16px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                {task.title}
              </Title>
            }
          />
          <Paragraph style={{ color: '#333', fontSize: '16px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {`Due: ${moment(task.dueDate).format('MMM DD, YYYY')}`}
          </Paragraph>
          <Paragraph style={{ color: '#333', fontSize: '16px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {`Target: ${task.target} hrs`}
          </Paragraph>
          <Paragraph style={{ color: '#333', fontSize: '16px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {`Completed Hours: ${task.completedHours}`}
          </Paragraph>
          <Paragraph style={{ color: '#333', fontSize: '16px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {`Progress: ${task.progress} %`}
          </Paragraph>
          <Paragraph style={{ color: '#333', fontSize: '16px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {`Week: ${task.week}`}
          </Paragraph>
          <Paragraph style={{ marginTop: 0, color: task.isCompleted ? '#4CAF50' : '#F44336' }}>
            {task.isCompleted ? 'Completed' : 'Not Completed'}
          </Paragraph>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <Button
              type="link"
              style={{ color: '#4CAF50', fontSize: '14px', fontWeight: 'bold', marginRight: 10 }}
              onClick={() => handleEditTask(task)}
              disabled={task.isCompleted} // Disable the button if the task is completed
            >
              <EditOutlined />
              Edit Task
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this task?"
              onConfirm={() => handleDelete(task._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" icon={<DeleteOutlined />} style={{ fontSize: '14px' }}>
                Delete
              </Button>
            </Popconfirm>
          </div>
        </Card>
      </Col>
    );
  })}
</Row>
      )}

      {/* Task Edit Modal */}
      <Modal
        title="Edit Task"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          initialValues={editingTask}
          onFinish={handleTaskSubmit}
        >
          <Form.Item name="title" label="Task Title" rules={[{ required: true, message: 'Please enter the task title' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="dueDate" label="Due Date" rules={[{ required: true, message: 'Please select a due date' }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item name="target" label="Target" rules={[{ required: true, message: 'Please enter a target in hours' }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="completedHours" label="Completed Hours">
            <Input type="number" />
          </Form.Item>

          <Form.Item name="week" label="Week" rules={[{ required: true, message: 'Please select a week' }]}>
            <Input />
          </Form.Item>
          {/* <Form.Item name="isCompleted" valuePropName="checked">
            <Checkbox>Completed</Checkbox>
          </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit">Update Task</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskList;
