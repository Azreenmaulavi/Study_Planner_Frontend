import { useState,useEffect } from "react";
import api from "../services/Api";
import {
  Card,
  Col,
  Row,
  Typography,
  // Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  List,
  Badge,
  Space
  // Radio,
} from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  BulbOutlined,
  ToTopOutlined,
  HourglassOutlined 
} from "@ant-design/icons";
import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";

function Home() {
  const { Title, Text, Paragraph } = Typography;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
// State for modal
// const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState(0); // State for weekly progress
  const [studyTime, setStudyTime] = useState(0);  // To store the total study time
  const [startTime, setStartTime] = useState(null); // To store the start time of the session
  const [intervalId, setIntervalId] = useState(null); // To store the interval ID for updating timer


// const handleStartTimer = () => {
//   message.success("Focus timer started!");
// };


// const handleFeedbackSubmit = () => {
//   setIsFeedbackModalVisible(false);
//   message.success("Feedback submitted successfully!");
// };



useEffect(() => {
  const getCurrentWeekOfMonth = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const days = today.getDate(); // Day of the month
    const week = Math.ceil(days / 7); // Calculate the week number
    setCurrentWeek(week);
    console.log("Current Week of Month:", week);
  };

  getCurrentWeekOfMonth();
}, []);



useEffect(() => {
  if (currentWeek > 0) { // Only fetch if currentWeek is valid
    const fetchWeeklyProgress = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await api.get(`${userId}/weeklyProgress/${currentWeek}`);
        setWeeklyProgress(response.data.progress);
      } catch (error) {
        setWeeklyProgress(0);
      }
    };
    fetchWeeklyProgress();
  }
}, [currentWeek]);

useEffect(() => {
  // Fetch upcoming tasks from the API when the component mounts
  const fetchUpcomingTasks = async () => {
    try {
      const userId=localStorage.getItem("userId")
      const response = await api.get(`${userId}/upcoming/tasks`); // Endpoint for fetching tasks
      setTasks(response.data.tasks); // Update state with fetched tasks
    } catch (error) {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  fetchUpcomingTasks();
}, [currentWeek]);
 // Pastel Card Styles
 const pastelStyles = {
  white: { backgroundColor: "#fef8e4" }, // Light pastel yellow
  green: { backgroundColor: "#d1f7d1" }, // Light pastel green
  pink: { backgroundColor: "#f7e0f0" }, // Light pastel pink
  blue: { backgroundColor: "#e0f0f7" }, // Light pastel blue
  yellow: { backgroundColor: "#fef4e4" }, // Light pastel yellow
};

useEffect(() => {
  const userId = localStorage.getItem("userId");
 // Get total study time from the server or localStorage
 const fetchStudyTime = async () => {
  try {
    const response = await api.get(`/auth/studyTime/${userId}`);
    setStudyTime(response.data.totalStudyTime);
  } catch (error) {
    console.error("Error fetching study time:", error);
    setStudyTime(0); // Fallback to 0 if no data
  }
};

fetchStudyTime();

// Start time tracking when the component mounts
const start = Date.now();
setStartTime(start);

// Start the interval to update study time every second
const interval = setInterval(() => {
  const elapsedTime = Math.floor((Date.now() - start) / 1000); // time in seconds
  setStudyTime(elapsedTime);
}, 1000);

setIntervalId(interval); // Store the interval ID

// Cleanup function to calculate total time when user leaves the page
return () => {
  clearInterval(intervalId);  // Clear the interval to stop updating the timer
  const endTime = Date.now();
  const timeSpent = Math.floor((endTime - start) / 1000); // time in seconds
  updateStudyTime(timeSpent);  // Send the final time to the server when leaving
};
}, [],3000);  
// 2️⃣ Update the study time on the server
const updateStudyTime = async (timeSpent) => {
try {
  const userId = localStorage.getItem("userId");
  const response = await api.post(`/auth/updateStudyTime/${userId}`, { timeSpent });
  setStudyTime(response.data.totalStudyTime);
} catch (error) {
  console.error("Error updating study time:", error);
}
};

// 3️⃣ Format time as HH:MM:SS
const formatTime = (totalSeconds) => {
const hours = Math.floor(totalSeconds / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = totalSeconds % 60;
return `${hours}h ${minutes}m ${seconds}s`;
};



const userName=localStorage.getItem("userName")
  return (
    <div>
        <Title level={3}>Welcome, {userName}!</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        
         {/* Weekly Goals */}
         <Col xs={24} sm={12} md={8}>
       
          <Card style={pastelStyles.white}>
            <Title level={5}>Weekly Goals Progress</Title>
            <Progress type="circle" percent={weeklyProgress} />
            <Paragraph style={{ marginTop: "10px" }}>
              {weeklyProgress >= 75
                ? "You're on track! Keep it up!"
                : "Keep going, you can do it!"}
            </Paragraph>
          </Card>
        </Col>

        {/* Total Study Time */}
        <Col xs={24} sm={12} md={8}>
      <Card style={{ ...pastelStyles.green, padding: '20px' }}>
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <HourglassOutlined  style={{ fontSize: '40px', color: '#52c41a' }} /> {/* Icon for the timer */}
          <Title level={4}>Total Study Time</Title>
          <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {formatTime(studyTime)} {/* Displaying formatted time */}
          </Text>
          <Paragraph style={{ marginTop: '10px', textAlign: 'center' }} type="secondary">
            "Small steps every day lead to big success."
          </Paragraph>
        </Space>
      </Card>
    </Col>

          {/* Upcoming Tasks */}
          <Col xs={24} sm={12} md={8}>
          <Card style={pastelStyles.yellow}>
            <Title level={5}>Upcoming Tasks</Title>
            <Timeline>
              {loading ? (
                <Timeline.Item>Loading...</Timeline.Item>
              ) : tasks.length === 0 ? (
                <Timeline.Item>No upcoming tasks</Timeline.Item>
              ) : (
                tasks.map((task, index) => (
                  <Timeline.Item
                    key={index}
                    color={task.isCompleted === true ? "green" : "blue"}
                  >
                    {task.isCompleted === false && (
                      <ClockCircleOutlined style={{ fontSize: '16px', color: '#08c', marginRight: '8px' }} />
                    )}
                    {task.isCompleted === false && (
                      <ClockCircleOutlined style={{ fontSize: '16px', color: 'orange', marginRight: '8px' }} />
                    )}
                    {task.isCompleted === true && (
                      <CheckCircleOutlined style={{ fontSize: '16px', color: 'green', marginRight: '8px' }} />
                    )}
                    {task.title} - {new Date(task.dueDate).toLocaleDateString()}
                  </Timeline.Item>
                ))
              )}
            </Timeline>
          </Card>
        </Col>

  {/* Today's Study Plan */}
  <Col xs={24} sm={12} md={8}>
          <Card style={pastelStyles.pink}>
            <Title level={5}>Today's Study Plan</Title>
            <List
              dataSource={tasks}
              renderItem={(task) => (
                <List.Item>
                  <Text>{task.title} - {task.dueDate}</Text>
                  <Progress
                    percent={task.isCompleted === true ? 100 : 50}
                    status={task.isCompleted === true ? "success" : "active"}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

         {/* Quick Links */}
         <Col xs={24} sm={12} md={8}>
          <Card style={pastelStyles.blue}>
            <Title level={5}>Quick Links</Title>
            <Button type="link" href="/schedule">Schedule</Button>
            <Button type="link" href="/notes">Notes</Button>
            <Button type="link" href="/exams">Exams</Button>
            <Button type="link" href="/resources">Resources</Button>
          </Card>
        </Col>

        {/* Recent Activity */}
        <Col xs={24} sm={12} md={8}>
          <Card style={pastelStyles.white}>
            <Title level={5}>Recent Activity</Title>
            <Timeline>
              <Timeline.Item>Completed Math Quiz</Timeline.Item>
              <Timeline.Item>Uploaded Science Notes</Timeline.Item>
              <Timeline.Item>Started New History Project</Timeline.Item>
            </Timeline>
          </Card>
        </Col>

      </Row>
       {/* Badges Section */}
       <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
       <Col xs={24} sm={12} md={8}>
          <Card style={pastelStyles.pink}>
            <Title level={5}>Badges</Title>
            <Badge.Ribbon text="Completed Task" color="green">
              <Card style={{ marginBottom: "16px" }}>
                <Title level={5}>Task Completion</Title>
                <Text>You have completed 10 tasks this week!</Text>
              </Card>
            </Badge.Ribbon>
            <Badge.Ribbon text="Top Performer" color="gold">
              <Card>
                <Title level={5}>Top Performer</Title>
                <Text>Achieved the highest score in exams!</Text>
              </Card>
            </Badge.Ribbon>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Title level={5}>Mental Wellness</Title>
            <Text>Remember to take a short break, meditate, and stay hydrated!</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Title level={5}>How was your experience today?</Title>
            <Button>Give Feedback</Button>
          </Card>
        </Col>


      </Row>

       {/* Motivational Section */}
       <Row gutter={[16, 16]}>
       <Col xs={24} sm={12} md={8}>
          <Card>
            <Title level={5}>Motivational Quote</Title>
            <BulbOutlined style={{ fontSize: "24px", color: "#FFD700" }} />
            <Paragraph style={{ marginTop: "10px" }}>
              "The future depends on what you do today." – Mahatma Gandhi
            </Paragraph>
          </Card>
        </Col>

        {/* Study Materials Upload */}
       <Col xs={24} sm={12} md={8}>
          <Card>
            <Title level={5}>Upload Study Materials</Title>
            <Upload
              name="file"
              beforeUpload={(file) => {
                message.success(`${file.name} uploaded successfully.`);
                return false;
              }}
            >
              <Button icon={<ToTopOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}>Click to Upload</Button>
            </Upload>
          </Card>
        </Col>

        {/* Study Break Suggestions */}
       <Col xs={24} sm={12} md={8} className="mb-24">
          <Card>
            <Title level={5}>Need a Break?</Title>
            <Text>
              Suggestion: Take a 5-minute walk or grab a glass of water!
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row
        gutter={[24, 0]}
        style={{ marginBottom: "20px", justifyContent: "center" }}
      >
       <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
          <Card
            style={{ minHeight: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
          >
            <Title level={5}>Time Spent by Subject</Title>
            <Echart />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
          <Card
            style={{ minHeight: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
          >
            <Title level={5}>Performance Trends</Title>
            <LineChart />
          </Card>
        </Col>
      </Row>

    </div>
  );
}

export default Home;