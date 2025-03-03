const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

exports.submitContactForm = async (req, res) => {
  const { name, email, phone, category, message } = req.body;

  try {
    const newContact = new Contact({ name, email, phone, category, message });
    await newContact.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: "mesutmahad@gmail.com",
      subject: "New Contact Form Submission",
      text: `New contact form submission:
      - Name: ${name}
      - Email: ${email}
      - Phone: ${phone}
      - Category: ${category}
      - Message: ${message}`,
    });

    res
      .status(200)
      .json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Sort by latest
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
