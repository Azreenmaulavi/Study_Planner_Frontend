import React from 'react';
import { Collapse } from 'antd';

import './FAQ.css'; // Custom styles

const { Panel } = Collapse;

const FAQ = () => {
  const faqData = [
    {
      question: 'What is StudyMaster?',
      answer: 'StudyMaster is an interactive study planner that helps students organize and manage their daily study schedule efficiently.'
    },
    {
      question: 'How do I sign up for StudyMaster?',
      answer: 'You can sign up by clicking the "Start Now" button on the top right of the navigation bar. Fill in the required details and start using the app right away.'
    },
    {
      question: 'Is StudyMaster free to use?',
      answer: 'Yes, StudyMaster offers a free plan. However, there are premium features that you can unlock with a paid subscription.'
    },
    {
      question: 'Can I customize my study plan?',
      answer: 'Absolutely! You can customize your study plan by adding or editing subjects, setting daily goals, and tracking your progress.'
    },
    {
      question: 'How can I reset my password?',
      answer: 'If you forget your password, click on "Forgot Password" on the login page and follow the instructions to reset it.'
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact support by clicking on the "Contact Us" link in the footer or sending an email to support@studymaster.com.'
    }
  ];

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions (FAQ)</h2>
      <Collapse accordion>
        {faqData.map((item, index) => (
          <Panel header={item.question} key={index} className="faq-panel">
            <p>{item.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FAQ;
