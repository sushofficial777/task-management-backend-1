//const FCM = require("fcm-node");
const admin = require("firebase-admin");
const { DEVICE_TYPE } = require("../config/appConstants");
const config = require("../config/config");
//const fcm = new FCM(config.fcmToken);
const serviceAccount = require("../../googleKeys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/*
 ==============================================
 Send the notification
 =============================================
 */



function sendPushNotification(
  title,
  message,
  type,
  deviceToken,
  user,
  deviceType,
  image = ""
) {
  console.log(deviceToken, deviceType);
  return new Promise(async (res, rej) => {
    try {
      const batchSize = 500; // FCM limit of 500 tokens per request
      const chunks = [];
      for (let i = 0; i < deviceToken.length; i += batchSize) {
        chunks.push(deviceToken.slice(i, i + batchSize));
      }
      let messages = {};
      if (deviceType == DEVICE_TYPE.ANDROID) {
        messages = {
          data: {
            title: title,
            body: message,
            push_type: String(type),
            user: JSON.stringify(user),
          },

          android: {
            priority: "high",
          },
        };
      } else {
        messages = {
          data: {
            title: title,
            body: message,
            push_type: String(type),
            user: JSON.stringify(user),
          },

          notification: {
            title: title,
            body: message,
            // push_type: String(type),
            //user: JSON.stringify(user),
            // click_action: "AcceptOrReject",
            // sound: "default",
          },
          apns: {
            payload: {
              aps: {
                sound: "default",
              },
            },
          },
        };
      }

      if (image) {
        messages.data.image = image;
        messages.notification ? (messages.notification.image = image) : "";
        messages["mutable_content"] = 1;
        // messages.notification
        //   ? (messages.notification["mutable-content"] = "1")
        //   : "";
      }

      const promises = chunks.map(async (chunk) => {
        const message = {
          tokens: chunk, // Set the chunk of tokens
          ...messages, // Spread the payload (notification and data)
        };
        try {
          const response = await admin
            .messaging()
            .sendEachForMulticast(message);
          // console.log(
          //   `Successfully sent to ${chunk.length} devices:`,
          //   response
          // );
          response.responses.forEach((result, idx) => {
            if (result.error) {
              console.error("Failure sending to", result.error);
            }
          });
        } catch (error) {
          console.error("Error sending batch:", error);
        }
      });
      await Promise.all(promises);

      console.log(
        "===================================notification completed======================="
      );
    } catch (err) {
      console.log("err", err);
    }
  });
}

module.exports = {
  sendPushNotification,
};
