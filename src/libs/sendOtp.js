const axios = require("axios");
const config = require("../config/config");

const sendOtp = async (phoneNumber, OTP) => {
  const client = require("twilio")(config.twilio.sid, config.twilio.token);
  client.messages
    .create({
      body: `Use ${OTP} as sportEx account security code`,
      from: "+16592764582",
      to: phoneNumber.includes("+") ? phoneNumber : `+${phoneNumber}`,
    })
    .then((message) => {
      console.log("OTP sended");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  sendOtp,
};
