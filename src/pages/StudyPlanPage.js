import React, { useState, useEffect } from 'react';
import { Button, Table, Popconfirm, notification, Modal } from 'antd';
import { useNavigate } from 'react-router-dom'; 
import api from '../services/Api'; 
import AddTaskForm from './AddTaskForm'; 
import StudyPlanForm from './StudyPlanForm'; 
import { sendPushNotification } from '../services/PushNotificationService';


const StudyPlanPage = () => {
  const [studyPlans, setStudyPlans] = useState([]);
  const [isStudyPlanModalVisible, setIsStudyPlanModalVisible] = useState(false);
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [currentPlanForTask, setCurrentPlanForTask] = useState(null);

  const navigate = useNavigate(); 

  // useEffect(() => {
  //   const fetchPlans = async () => {
  //     try {
  //       const response = await api.get('/getAllPlanners');
  //       setStudyPlans(response.data);
  //     } catch (error) {
  //       notification.error({ message: error.message });
  //     }
  //   };

  //   fetchPlans();
  // }, []);
   // Fetch study plans from the server
   useEffect(() => {
    let isMounted = true; // To handle component unmounting
    const fetchPlans = async () => {
      try {
        const response = await api.get('/getAllPlanners');
        if (isMounted) setStudyPlans(response.data);
      } catch (error) {
        notification.error({ message: error.message });
      }
    };

    fetchPlans();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/delete/${id}`);
      if (!response.data) {
        throw new Error('Failed to delete the study plan!');
      }
      notification.success({ message: 'Study Plan deleted successfully!' });

      const fetchResponse = await api.get('/getAllPlanners');
      setStudyPlans(fetchResponse.data);
    } catch (error) {
      notification.error({ message: error.message });
    }
  };

  const openAddTaskForm = (plan) => {
    console.log('Selected plan for adding task:', plan);
    if (!plan || !plan._id) {
      notification.error({ message: 'Invalid plan selected' });
      return;
    }
    setCurrentPlanForTask(plan); 
    setIsAddTaskModalVisible(true);
  };

  // const handleStudyPlanSave = () => {
  //   const fetchPlans = async () => {
  //     try {
  //       const response = await api.get('/getAllPlanners');
  //       setTimeout(() => {
  //         setStudyPlans(response.data); // Debounce state update
  //       }, 100);
  //     } catch (error) {
  //       notification.error({ message: error.message });
  //     }
  //   };
  //   fetchPlans();
  // };
  const handleStudyPlanSave = (updatedPlan) => {
    // Update the study plan list with the newly added/edited plan
    setStudyPlans((prevPlans) => {
      const isExistingPlan = prevPlans.some((plan) => plan._id === updatedPlan._id);
      if (isExistingPlan) {
        return prevPlans.map((plan) =>
          plan._id === updatedPlan._id ? updatedPlan : plan
        );
      }
      return [...prevPlans, updatedPlan];
    });

    setIsStudyPlanModalVisible(false);
  };
  const handleViewTasks = (planId) => {
    navigate(`/tasklist/${planId}`);
  };

  const closeModals = () => {
    setIsStudyPlanModalVisible(false);
    setIsAddTaskModalVisible(false);
    setCurrentPlan(null);
    setCurrentPlanForTask(null);
  };

  const columns = [
    {
      title: 'Plan Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              setCurrentPlan(record);
              setIsStudyPlanModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this study plan?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
          <Button
            type="link"
            onClick={() => handleViewTasks(record._id)}
          >
            View Tasks
          </Button>
          <Button
            type="primary"
            onClick={() => openAddTaskForm(record)} // Open Add Task Form
          >
            Add Task
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="study-plan-page">
      <Button
        type="primary"
        onClick={() => setIsStudyPlanModalVisible(true)}
        style={{ marginBottom: '20px' }}
      >
        Add Study Plan
      </Button>
      <Table
        columns={columns}
        dataSource={studyPlans}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 1000 }} 
      />
      <StudyPlanForm
        visible={isStudyPlanModalVisible}
        onClose={closeModals}
        currentPlan={currentPlan}
        onSave={handleStudyPlanSave}
      />

      <AddTaskForm
        visible={isAddTaskModalVisible}
        onClose={closeModals}
        plan={currentPlanForTask} // Pass the current plan to the AddTaskForm
        sendPushNotification={sendPushNotification}
      />
    </div>
  );
};

export default StudyPlanPage;
