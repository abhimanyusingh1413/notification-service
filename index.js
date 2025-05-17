require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { connectRabbitMQ } = require('./config/rabbitmq');

const notificationRoutes = require('./routes/notificationRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/notifications', notificationRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
