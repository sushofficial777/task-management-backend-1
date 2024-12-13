const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const config = require("../config/config");
var resetPassword = fs.readFileSync(
  path.join(__dirname, "../../views/resetPassword.hbs"),
  "utf8"
);
var resetPasswordTemplate = Handlebars.compile(resetPassword);
try {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.smtp.email,
      pass: config.smtp.password,
    },
  });

  function forgotPasswordEmail(email, token, userName) {
    return new Promise((resolve, reject) => {
      var info = {
        from: config.smtp.email,
        to: email,
        subject: "Reset Password",
        attachments: [
          {
            filename: "logo.png",
            path: __dirname + "/images/logo.png",
            cid: "logo",
          },
        ],
        html: resetPasswordTemplate({
          token,
          apiBaseUrl: config.frontendBaseUrl,
          title: "Forgot Password",
          userName,
        }),
      };

      transporter.sendMail(info, (error, accept) => {
        if (error) {
          reject(error);
        }
        resolve(accept, console.log("Mail Sended"));
      });
    });
  }
} catch (err) {
  throw err;
}

module.exports = {
  forgotPasswordEmail,
};
