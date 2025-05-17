const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, content) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Notification',
    text: content,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
