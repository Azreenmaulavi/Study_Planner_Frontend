import React, { useEffect, useState } from "react";
import api from "../services/Api";

const UserNotifications = ({ setNotificationCount}) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve userId from localStorage
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("User ID not found in localStorage. Please log in again.");
      return;
    }

   

   const fetchNotifications = async () => {
      try {
        const response = await api.get(`/user/${userId}`);
        const allNotifications = response.data;

        // Filter unread notifications
        const unreadNotifications = allNotifications.filter((n) => !n.isRead);
        console.log("Unread Noti",unreadNotifications.length);
        setNotifications(allNotifications);
        setNotificationCount(unreadNotifications.length); // Badge count based on unread
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to fetch notifications.");
      }
    };

    fetchNotifications();
  }, [setNotificationCount]);
// Mark all notifications as read
const markAllAsRead = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await api.put(`/markAllAsRead/${userId}`);

    setNotificationCount(response.data.unreadCount); // Reset count to 0
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  } catch (err) {
    console.error("Error marking notifications as read:", err);
    setError("Failed to mark notifications as read.");
  }
};
  return (
    <div>
      <h2>Your Notifications</h2>
      <button onClick={markAllAsRead}>Mark All as Read</button>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>
              <strong>{notification.title}</strong>: {notification.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserNotifications;
