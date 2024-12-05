// src/components/FooterComponent.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 Study Planner. All Rights Reserved.</p>
           
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
