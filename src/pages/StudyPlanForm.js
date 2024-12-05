// StudyPlanForm.js
import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { notification } from 'antd';
import api from '../services/Api'; // Assuming api.js exists for API requests

const StudyPlanForm = ({ visible, onClose, currentPlan, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentPlan) {
      form.setFieldsValue({
        title: currentPlan.title,
        description: currentPlan.description,
      });
    }
  }, [currentPlan, form]);

  const handleSave = async (values) => {
    const studyPlanData = {
      title: values.title,
      description: values.description,
    };

    try {
      let response;
      if (currentPlan) {
        response = await api.put(`/update/${currentPlan._id}`, studyPlanData);
        if (!response.data) {
          throw new Error('Failed to update study plan');
        }
        notification.success({ message: 'Study Plan updated successfully!' });
      } else {
        response = await api.post('/create', studyPlanData);
        if (!response.data) {
          throw new Error('Failed to create study plan');
        }
        notification.success({ message: 'Study Plan created successfully!' });
      }

      onSave(); // Refresh study plans
      onClose(); // Close modal
    } catch (error) {
      notification.error({ message: error.message });
    }
  };

  return (
    <Modal
      title={currentPlan ? 'Edit Study Plan' : 'Add Study Plan'}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSave} initialValues={currentPlan}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudyPlanForm;
