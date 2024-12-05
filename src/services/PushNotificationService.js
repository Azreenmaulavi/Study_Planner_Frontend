// src/services/PushNotificationService.js
// Purpose: Service to handle push notification subscription.
import api from './Api'; // Adjust the path to your Api.js
import {getPushKeys,urlBase64ToUint8Array} from '../utils/pushUtils';

// const publicKey = 'BD8PjxHMX7yFdtY7GLD8eC_aPxgtddQvU1T3I4jg7X_-Vi_mC9Pkud3ePOJ1-3ITenE9cKOR6Nmyksl_njg3ydY'; // Replace with your backend's public VAPID key
const publicKey = process.env.REACT_APP_VAPID_PUBLIC_KEY;
async function subscribeUser() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;

      // Subscribe for push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      // Use the getPushKeys utility to generate p256dh and auth
      const { p256dh, auth } = await getPushKeys();  // You have this method in pushUtils.js

      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in localStorage.');
        return;
      }


      // Prepare the subscription data for your backend
      const subscriptionData = {
        userId, // Replace with actual user ID
        subscription: {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: p256dh, // Use the keys obtained from getPushKeys
            auth: auth,
          },
        },
      };

      console.log('Subscription Data:', subscriptionData);

      // Send to your backend
      await api.post('/notification/subscribe', subscriptionData);
    } catch (error) {
      console.error('Push subscription failed:', error);
    }
  } else {
    console.error('Push notifications are not supported in this browser.');
  }
}

async function sendPushNotification(userId, title, message) {

  try {
    const payload = {
      userId,         // User ID to whom you want to send the push notification
      notification: {
        title,        // The notification title
        message,      // The notification message
        icon: '/icons/notification-icon.png',  // Example icon URL
        // You can add other fields like body, badge, etc.
      },
    };

    // Send the notification request to your backend
    const response = await api.post('/notification/send', payload);

    if (response.status === 200) {
      console.log('Notification sent successfully!');
    } else {
      console.error('Failed to send notification');
    }
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
}

export { subscribeUser, sendPushNotification };