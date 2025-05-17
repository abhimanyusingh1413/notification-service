
const amqp = require('amqplib');
const mongoose = require('mongoose');
const Notification = require('./models/notification.model');
const { dispatchNotification } = require('./services/notificationService');
const { connectDB } = require('./config/db');

const QUEUE_NAME = 'notifications';

connectDB();

async function startWorker() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log(' Notification Worker started. Waiting for messages...');

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());

        const notification = await Notification.findById(data.notificationId);
        if (!notification) {
          console.error(' Notification not found!');
          return channel.ack(msg);
        }

        await processNotification(notification);

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error(' Worker error:', error.message);
  }
}

const processNotification = async (notification) => {
  try {
    if (notification.status === 'sent') return;

    await dispatchNotification(notification); 

    notification.status = 'sent';
    notification.retries = 0;
    await notification.save();
  } catch (error) {
    console.error(' Error processing notification:', error.message);

    notification.retries += 1;
    if (notification.retries >= 3) {
      notification.status = 'failed';
    }
    await notification.save();
  }
};

startWorker();
