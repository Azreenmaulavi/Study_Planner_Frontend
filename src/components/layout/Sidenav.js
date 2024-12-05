
// import { useState } from "react";
import { Menu, Button } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/favicon.png";
import { FileTextOutlined, CalendarOutlined, BulbOutlined, FileDoneOutlined, TableOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const tables = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const assignments = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 2H6C4.89543 2 4 2.89543 4 4V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V4C16 2.89543 15.1046 2 14 2ZM14 16H6V4H14V16ZM10 7H7V9H10V7ZM10 11H7V13H10V11ZM13 7H11V9H13V7ZM13 11H11V13H13V11Z"
        fill={color}
      ></path>
    </svg>,
  ];
  

  const calendar = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 2H14V4H6V2H4C2.89543 2 2 2.89543 2 4V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V4C18 2.89543 17.1046 2 16 2ZM16 16H4V6H16V16Z"
        fill={color}
      ></path>
    </svg>,
  ];
  

  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const signin = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const progressTracker = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 2H17C17.5523 2 18 2.44772 18 3V17C18 17.5523 17.5523 18 17 18H3C2.44772 18 2 17.5523 2 17V3C2 2.44772 2.44772 2 3 2ZM3 17H17V3H3V17ZM7 11H9V9H7V11ZM11 7H13V9H11V7ZM13 11H15V13H13V11Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const notes = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 2H6C4.89543 2 4 2.89543 4 4V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V4C16 2.89543 15.1046 2 14 2ZM14 16H6V4H14V16ZM10 7H7V9H10V7ZM10 11H7V13H10V11ZM13 7H11V9H13V7ZM13 11H11V13H13V11Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const timetable = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 2C2.89543 2 2 2.89543 2 4V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V4C18 2.89543 17.1046 2 16 2H4ZM16 16H4V4H16V16ZM6 7H8V9H6V7ZM10 7H12V9H10V7ZM6 11H8V13H6V11ZM10 11H12V13H10V11Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const settings = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 15.5C13.3137 15.5 16 12.8137 16 9.5C16 6.18629 13.3137 3.5 10 3.5C6.68629 3.5 4 6.18629 4 9.5C4 12.8137 6.68629 15.5 10 15.5ZM10 14C7.79086 14 6 12.2091 6 9.5C6 6.79086 7.79086 5 10 5C12.2091 5 14 6.79086 14 9.5C14 12.2091 12.2091 14 10 14ZM11 7H9V9H11V7Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const logout = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 2C3.44772 2 3 2.44772 3 3V17C3 17.5523 3.44772 18 4 18H10C10.5523 18 11 17.5523 11 17V14H13V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V8C17 7.44772 16.5523 7 16 7H14C13.4477 7 13 7.44772 13 8V10H11V7C11 6.44772 10.5523 6 10 6H4C3.44772 6 3 6.44772 3 7V13H5V3C5 2.44772 4.55228 2 4 2Z"
        fill={color}
      ></path>
    </svg>,
  ];
 
  const navigate =useNavigate()
  const handleLogout = () => {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
  
    // Clear local storage/session storage based on Remember Me
    if (!rememberMe) {
      // Clear all user-related data if not remembered
      localStorage.clear();
    } else {
      // Keep "rememberMe" flag but remove sensitive data
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
    }
  
    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Study Master</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === "dashboard" ? color : "",
              }}
            >
              {dashboard}
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/tables">
            <span
              className="icon"
              style={{
                background: page === "tables" ? color : "",
              }}
            >
              {tables}
            </span>
            <span className="label">Study Plans</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/assignments" icon={<FileTextOutlined />}>
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              {assignments}
             
            </span>
            <span className="label">Assignments</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/calendar">
            <span
              className="icon"
              style={{
                background: page === "rtl" ? color : "",
              }}
            >
              {calendar}
            </span>
            <span className="label">Calendar</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="5">
          <NavLink to="/progress-tracker">
            <span
              className="icon"
              style={{
                background: page === "rtl" ? color : "",
              }}
            >
              {progressTracker}
            </span>
            <span className="label">Progress Tracker</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/notes">
            <span
              className="icon"
              style={{
                background: page === "rtl" ? color : "",
              }}
            >
              {notes}
            </span>
            <span className="label">Notes</span>
          </NavLink>
        </Menu.Item>
       
        <Menu.Item className="menu-item-header" key="7">
          Account Pages
        </Menu.Item>
        <Menu.Item key="8">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="9" onClick={handleLogout}>
          <NavLink to="/sign-in">
            <span className="icon">{logout}</span>
            <span className="label">Logout</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="10">
          <NavLink to="/settings">
            <span className="icon">{settings}</span>
            <span className="label">Settings</span>
          </NavLink>
        </Menu.Item>
      </Menu>
     
    </>
  );
}

export default Sidenav;
