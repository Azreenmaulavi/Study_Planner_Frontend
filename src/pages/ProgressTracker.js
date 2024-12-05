import React, { useState, useEffect } from 'react';
import { Card, Button, Progress, Row, Col, Typography, notification, Spin } from 'antd';
import { Line } from 'react-chartjs-2';
import api from '../services/Api'; // API service for requests
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressTracker = () => {
  const [progressData, setProgressData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        // Fetch progress and task data
        const progressResponse = await api.get(`/${userId}/progress`);
        const tasksResponse = await api.get(`/tasks/progress/${userId}`);
        console.log("Progress Response", progressResponse.data);
        console.log("Task Response", tasksResponse.data);

        // Safely set tasks to an empty array if tasksResponse.data.tasks is not an array
        setProgressData(progressResponse.data);
        setTasks(Array.isArray(tasksResponse.data.tasks) ? tasksResponse.data.tasks : []);
      } catch (error) {
        notification.error({ message: 'Error fetching progress data', description: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgressData();
  }, [userId]);

  // If loading, show a spinner
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  // Chart data for progress over time (tasks completion)
  const chartData = {
    labels: tasks.map(task => task.dueDate), // Dates of tasks
    datasets: [
      {
        label: 'Task Completion',
        data: tasks.map(task => (task.isCompleted ? 100 : 0)), // Progress of each task (0 or 100)
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Handle reset progress
  const handleResetProgress = async () => {
    try {
      await api.post(`/progress/reset/${userId}`);
      notification.success({ message: 'Progress has been reset.' });
      setProgressData({ progress: 0 });
      setTasks(tasks.map(task => ({ ...task, isCompleted: false }))); // Reset task status
    } catch (error) {
      notification.error({ message: 'Error resetting progress', description: error.message });
    }
  };

  return (
    <div className="progress-tracker">
      <Typography.Title level={3} style={{ textAlign: 'center' }}>
        Progress Tracker
      </Typography.Title>

      <Row gutter={16}>
        {/* Progress Overview Section */}
        <Col span={8}>
          <Card title="Overall Progress" bordered={false} style={{ width: '100%' }}>
            <Progress
              type="circle"
              percent={progressData?.progress || 0}
              format={(percent) => `${percent}%`}
            />
          </Card>
        </Col>

        {/* Line Chart Showing Progress Over Time */}
        <Col span={16}>
          <Card title="Progress Over Time" bordered={false}>
            <Line data={chartData} options={{ responsive: true }} />
          </Card>
        </Col>
      </Row>

      {/* Task List Section */}
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card title="Task List" bordered={false}>
            {tasks.length > 0 ? (
              tasks.map(task => (
                <div key={task.taskId} style={{ marginBottom: '10px' }}>
                  <Row>
                    <Col span={12}>{task.title}</Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                      <Progress percent={task.isCompleted ? 100 : 0} />
                    </Col>
                  </Row>
                </div>
              ))
            ) : (
              <div>No tasks available.</div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Reset Progress Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button type="danger" onClick={handleResetProgress}>
          Reset Progress
        </Button>
      </div>
    </div>
  );
};

export default ProgressTracker;
