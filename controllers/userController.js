const Notification = require('../models/Notification');

const getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.id;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUserNotifications };
