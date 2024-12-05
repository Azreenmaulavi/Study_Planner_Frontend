// Purpose: Service Worker for handling push notifications.
// src/sw.js

// src/sw.js
self.addEventListener('push', (event) => {
    const data = event.data ? JSON.parse(event.data.text()) : {};

    const title = data.title || 'Notification';
    const options = {
        body: data.message || 'You have a new notification!',
    };

    // Logging received data from the push message
    console.log('Push received:', { title, options });

    // Endpoint, auth, and p256dh should be part of the subscription object from client-side
    const endpoint = data.endpoint || null;
    const auth = data.auth || null;
    const p256dh = data.p256dh || null;

    console.log('Push notification details:', { endpoint, auth, p256dh });

    // Display the push notification
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});


self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/') // Change this URL as needed
    );
});

