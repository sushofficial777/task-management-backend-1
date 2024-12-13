const express = require("express");

const router = express.Router();

router.get("/terms&Conditions", (req, res) => {
  return res.render("termAndConditions");
});

router.get("/privacyPolicy", (req, res) => {
  return res.render("privacyPolicy");
});

module.exports = router;
