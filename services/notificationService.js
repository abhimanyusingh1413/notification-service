const { sendEmail } = require('./emailService');
const { sendSMS } = require('./smsService');


const dispatchNotification = async (notification) => {
  const { type, userId, content } = notification;

  if (type === 'email') {
    await sendEmail(userId, content);
  } else if (type === 'sms') {
    await sendSMS(userId, content);
  } else if (type === 'in-app') {
   
    console.log('In-app notification saved to DB.');
  } else {
    throw new Error(`Unknown notification type: ${type}`);
  }
};

module.exports = { dispatchNotification };
