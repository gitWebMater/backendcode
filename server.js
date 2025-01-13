const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Nodemailer transport configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'demingshouse@gmail.com',
    pass: 'gcja ajpf jrxp jots',
  },
  debug: true, // Enable debug output
  logger: true  // Log information in console
});

// API route to send contact
app.post('/send-email', (req, res) => {
  const { name, email, contactNumber, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'demingshouse@gmail.com', // Your destination email
    subject: subject,
    text: `Name: ${name}\nContact Number: ${contactNumber}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ error: 'Failed to send email' });
    }
    res.send({ success: 'Email sent successfully!' });
  });
});

// API route to send reach
app.post('/send-reach', (req, res) => {
  const { name, email, contactNumber } = req.body;

  const mailOptions = {
    from: email,
    to: 'demingshouse@gmail.com', // Your destination email
    subject: "reach out to us",
    text: `Name: ${name}\nContact Number: ${contactNumber}\nMessage: ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ error: 'Failed to send email' });
    }
    res.send({ success: 'Email sent successfully!' });
  });
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
