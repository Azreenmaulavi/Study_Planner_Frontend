// import React, { useState } from 'react';
// import { Stepper, Step, StepLabel, Button, TextField, Box, Typography } from '@mui/material';
// import api from '../../services/Api'; // Axios instance

// const ForgotPassword = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
 
//   const steps = ['Generate OTP', 'Verify OTP', 'Reset Password'];

//   const handleNext = async () => {
//     try {
//       setError('');
//       if (activeStep === 0) {
//         // Step 1: Generate OTP
//         await api.post('/auth/generate-otp', { email });
//         alert('OTP has been sent to your email!');
//       } else if (activeStep === 1) {
//         // Step 2: Verify OTP
//         await api.post('/auth/verify-otp', { email, otp });
//         alert('OTP verified successfully!');
//       } else if (activeStep === 2) {
//         // Step 3: Reset Password
//         if (newPassword !== confirmPassword) {
//           setError('Passwords do not match');
//           return;
//         }
//         await api.put('/auth/reset-password', { email, newPassword });
//         alert('Password reset successfully!');
//       }
//       setActiveStep((prevStep) => prevStep + 1);
//     } catch (err) {
//       setError(err.response?.data?.error || 'An error occurred');
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//     setError('');
//   };

//   return (
//     <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Forgot Password
//       </Typography>
//       <Stepper activeStep={activeStep}>
//         {steps.map((label, index) => (
//           <Step key={index}>
//             <StepLabel >{label}</StepLabel >
//           </Step>
//         ))}
//       </Stepper>

//       {activeStep === steps.length ? (
//         <Box mt={3}>
//           <Typography variant="h5">Password reset successfully!</Typography>
//           <Button variant="contained" href="/login" sx={{ mt: 2 }} style={{ background: "#ff6b6b"}}>
//             Go to Login
//           </Button>
//         </Box>
//       ) : (
//         <Box mt={3}>
//           {error && <Typography color="error">{error}</Typography>}
//           {activeStep === 0 && (
//             <TextField
//               label="Email"
//               type="email"
//               fullWidth
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               sx={{ mb: 2 }}
//             />
//           )}
//           {activeStep === 1 && (
//             <TextField
//               label="Enter OTP"
//               type="text"
//               fullWidth
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//               sx={{ mb: 2 }}
//             />
//           )}
//           {activeStep === 2 && (
//             <>
//               <TextField
//                 label="New Password"
//                 type="password"
//                 fullWidth
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 label="Confirm Password"
//                 type="password"
//                 fullWidth
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 sx={{ mb: 2 }}
//               />
//             </>
//           )}
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Button
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               variant="outlined"
//             >
//               Back
//             </Button>
//             <Button onClick={handleNext} variant="contained" style={{ background: "#ff6b6b"}}>
//               {activeStep === steps.length - 1 ? 'Reset Password' : 'Next'}
//             </Button>
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default ForgotPassword;
import React, { useState } from 'react';
import { Steps, Input, Button, Typography, Alert, Row, Col, Form } from 'antd';
import api from '../../services/Api'; // Axios instance

const { Step } = Steps;
const { Title } = Typography;

const ForgotPassword = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const steps = ['Generate OTP', 'Verify OTP', 'Reset Password'];

  const handleNext = async () => {
    try {
      setError('');
      if (activeStep === 0) {
        // Step 1: Generate OTP
        await api.post('/auth/generate-otp', { email });
        alert('OTP has been sent to your email!');
      } else if (activeStep === 1) {
        // Step 2: Verify OTP
        await api.post('/auth/verify-otp', { email, otp });
        alert('OTP verified successfully!');
      } else if (activeStep === 2) {
        // Step 3: Reset Password
        if (newPassword !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        await api.put('/auth/reset-password', { email, newPassword });
        alert('Password reset successfully!');
      }
      setActiveStep((prevStep) => prevStep + 1);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '30px' }}>
      <Title level={2}>Forgot Password</Title>
      <Steps current={activeStep}>
        {steps.map((label, index) => (
          <Step key={index} title={label} />
        ))}
      </Steps>

      {activeStep === steps.length ? (
        <div style={{ marginTop: '20px' }}>
          <Typography.Title level={4}>Password reset successfully!</Typography.Title>
          <Button type="primary" href="/login" style={{ marginTop: '10px', backgroundColor: "#ff6b6b", borderColor: "#ff6b6b" }}>
            Go to Login
          </Button>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          {error && <Alert message={error} type="error" showIcon />}
          {activeStep === 0 && (
            <Form>
              <Form.Item label="Email">
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </Form.Item>
            </Form>
          )}
          {activeStep === 1 && (
            <Form>
              <Form.Item label="Enter OTP">
                <Input 
                  type="text" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  required 
                />
              </Form.Item>
            </Form>
          )}
          {activeStep === 2 && (
            <Form>
              <Form.Item label="New Password">
                <Input.Password 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required 
                />
              </Form.Item>
              <Form.Item label="Confirm Password">
                <Input.Password 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                />
              </Form.Item>
            </Form>
          )}
          <Row justify="space-between" style={{ marginTop: '20px' }}>
            <Col>
              <Button 
                type="default" 
                disabled={activeStep === 0} 
                onClick={handleBack}>
                Back
              </Button>
            </Col>
            <Col>
              <Button 
                type="primary" 
                onClick={handleNext} 
                style={{ backgroundColor: "#ff6b6b", borderColor: "#ff6b6b" }}>
                {activeStep === steps.length - 1 ? 'Reset Password' : 'Next'}
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
