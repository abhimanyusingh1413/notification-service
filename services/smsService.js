
const sendSMS = async (phoneNumber, content) => {
  console.log(`Sending SMS to ${phoneNumber}: ${content}`);

  return true;
};

module.exports = { sendSMS };
