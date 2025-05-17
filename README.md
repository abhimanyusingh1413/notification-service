#🚀 Notification Service

##🎯  Objective
Build a system to send notifications to users with support for Email, SMS, and In-App notifications. The service uses RabbitMQ queue for processing notifications asynchronously and implements retry logic for failed deliveries.

---

## ✨ Features

- REST API endpoints:
  - **POST /notifications** - Send a new notification.
  - **GET /users/{id}/notifications** - Retrieve all notifications for a user.
- Supports 3 types of notifications:
  - Email
  - SMS
  - In-App
- Uses RabbitMQ for queuing notifications.
- Retry mechanism for failed notifications (up to 3 retries with delay).
- MongoDB used for storing notifications and their statuses.

---

##🧰 Tech Stack

- Node.js with Express.js
- MongoDB (NoSQL database)
- RabbitMQ (Message Queue)
- Mongoose (MongoDB ORM)
- dotenv (Environment variable management)

---

## 🧑‍💻Prerequisites

- Node.js (v14+ recommended)
- MongoDB installed and running
- RabbitMQ installed and running

---

##⚙️ Setup Instructions

1. **Clone the repository**

    ```bash
    git clone https://github.com/abhimanyusingh1413/notification-service
    cd notification-service
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Configure environment variables**

    ```bash
    MONGODB_URI=mongodb://localhost:27017/notificationDB
    RABBITMQ_URL=amqp://localhost
    PORT=3000
    ```
4. **Start MongoDB and RabbitMQ**

    - Make sure MongoDB service is running (e.g.,       mongod).

    - Start RabbitMQ server.

5. **Run the API server**

    ```base
    node index.js
    ```
    - You should see:
    - MongoDB connected
    - Connected to RabbitMQ
    - Server running on port 3000

6. **Run the notification worker in a new terminal**

    ```bash
       node notificationWorker.js
    ```

    - you should see:

    - Connected to RabbitMQ
    - Waiting for messages in queue: notificationQueue

---
##📡 API Usage

- Send Notification
    - Endpoint: POST /notifications

**Body (JSON):**
```bash
{
  "userId": "user123",
  "type": "email",  // "email", "sms" or "in-app"
  "content": "Your notification message here"
}
```

**Response:**
```bash
{
  "message": "Notification queued",
  "notification": {
    "_id": "60e9f2c5f0c5e827f0abc123",
    "userId": "user123",
    "type": "email",
    "content": "Your notification message here",
    "status": "queued",
    "createdAt": "2025-05-17T12:00:00.000Z"
  }
}
```

**Get User Notifications**
- Endpoint: GET /users/:id/notifications

- Example: /users/user123/notifications

**Response:json**
```bash
[
  {
    "_id": "60e9f2c5f0c5e827f0abc123",
    "userId": "user123",
    "type": "email",
    "content": "Your notification message here",
    "status": "sent",
    "createdAt": "2025-05-17T12:00:00.000Z",
    "sentAt": "2025-05-17T12:05:00.000Z"
  },
  ...
]
```


**Testing**
- Use Postman or curl to test API endpoints.

- Check logs in notificationWorker.js for - - - processing and retry information.

- MongoDB stores notification statuses to  track progress.

**License**
- This project is for internship assignment purposes.

##🪪 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤Author

**Abhimanyu Kumar**  
Intern - Backend Development  
📫 Email: abhimanyukr1413@gmail.com 
🔗 [LinkedIn](https://www.linkedin.com/in/abhimanyu1314/)  
🗂️ GitHub: [your-github](https://github.com/abhimanyusingh1413)



