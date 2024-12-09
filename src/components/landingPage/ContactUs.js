import React from 'react';
import { Form, Input, Button, Row, Col, Space } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import './LandingPage.css';

const ContactUs = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <div className="contact-us-container">
      <div>
        <h1 className="contact-us-title">Contact Us</h1>
        <Row gutter={16}>
          <Col span={24}>
            <div className="contact-form">
              <Form name="contact-form" onFinish={onFinish}>
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Please enter your name!' }]}>
                  <Input prefix={<UserOutlined />} placeholder="Your Name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}>
                  <Input prefix={<MailOutlined />} placeholder="Your Email" />
                </Form.Item>
                <Form.Item
                  name="message"
                  rules={[{ required: true, message: 'Please enter your message!' }]}>
                  <Input.TextArea placeholder="Your Message" rows={4} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="submit-button">
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactUs;
