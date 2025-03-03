const express = require("express");
const {
  submitContactForm,
  getContacts,
} = require("../controllers/contactController");

const router = express.Router();

// Contact Form Submission Route
router.post("/send-email", submitContactForm);
router.get("/get-contacts", getContacts);

module.exports = router;
