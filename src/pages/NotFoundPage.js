// src/components/NotFoundPage.js
import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you are looking for does not exist."
        extra={
          <Button type="primary">
            <Link to="/">Back to Home</Link>
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
