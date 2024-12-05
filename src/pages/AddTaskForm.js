import React from 'react';
import { Modal, Form, Input, Button, DatePicker, notification } from 'antd';
import api from '../services/Api'; // Import api.js

const AddTaskForm = ({ visible, onClose, plan,sendPushNotification }) => {
  const [form] = Form.useForm();

  // Handle saving the task
  const handleSaveTask = async (values) => {
    const taskData = {
      title: values.taskTitle,
      dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : null, // Format the date
    };

    if (!taskData.dueDate) {
      notification.error({ message: 'Due Date is required' });
      return;
    }

    try {
      // Sending the request with the correct plannerId
      const response = await api.post(`/${plan._id}/task`, taskData);

      if (!response.data) {
        throw new Error('Failed to create task');
      }

        // Push Notification
      if (sendPushNotification) {
        sendPushNotification({
          title: 'New Task Added',
          message: `The task "${taskData.title}" has been added successfully!`
        });
      }

      notification.success({ message: 'Task created successfully!' });
      onClose();
      form.resetFields();
    } catch (error) {
      notification.error({ message: error.message || 'Error adding task' });
    }
  };

  return (
    <Modal
      title="Add Task"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSaveTask}>
        <Form.Item label="Task Title" name="taskTitle" rules={[{ required: true, message: 'Please input the task title!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Due Date" name="dueDate" rules={[{ required: true, message: 'Please select a due date!' }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Task
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTaskForm;
