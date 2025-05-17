const Notification = require('../models/Notification');
const { getChannel } = require('../config/rabbitmq');

const QUEUE_NAME = 'notifications';

const sendNotification = async (req, res) => {
  try {
    const { userId, type, content } = req.body;

    if (!userId || !type || !content) {
      return res.status(400).json({ error: 'userId, type and content are required' });
    }

   
    const notification = new Notification({ userId, type, content });
    await notification.save();

  
    const channel = getChannel();
    channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.sendToQueue(
      QUEUE_NAME,
      Buffer.from(JSON.stringify({ notificationId: notification._id })),
      { persistent: true }
    );

    res.status(201).json({ message: 'Notification queued for sending', notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendNotification };
