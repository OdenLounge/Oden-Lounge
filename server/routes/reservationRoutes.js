// reservationRoutes.js

// Load environment variables from .env file
require('dotenv').config()

const express = require('express')
const router = express.Router()
const Reservation = require('../models/reservation')
const nodemailer = require('nodemailer')

// Configure email transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Email from .env
    pass: process.env.EMAIL_PASS, // App password from .env
  },
})

// Create a reservation (public route)
router.post('/', async (req, res) => {
  try {
    const referenceNumber = Math.random()
      .toString(36)
      .substring(2, 15)
      .toUpperCase()
    const newReservation = new Reservation({ ...req.body, referenceNumber })

    // Save reservation to the database
    const savedReservation = await newReservation.save()

    // Send email to admin and customer
    const mailOptions = [
      {
        to: req.body.email, // Customer's email
        subject: 'Reservation Confirmation',
        html: `
          <div style="background: #ffffff; font-family: Arial, sans-serif; color: #333; line-height: 1.5; padding: 20px; border: 1px solid #ddd; border-radius: 5px; max-width: 600px; margin: auto;">
            <div style="text-align: right;">
              <img src="https://res.cloudinary.com/dgdkk60jf/image/upload/v1736726090/Oden_logo_onalqy.png" alt="Website Logo" style="max-height: 50px;" />
            </div>
            <h2 style="color: #4CAF50; text-align: center;">Reservation Confirmation</h2>
            <p>Dear <strong>${req.body.fName}</strong>,</p>
            <p>
              Your reservation for <strong>${req.body.guest}</strong> guest(s) on 
              <strong>${req.body.date}</strong> at <strong>${req.body.time}</strong> 
              is confirmed.
            </p>
            <p>
              <strong>Reference Number:</strong> <span style="color: #4CAF50;">${referenceNumber}</span>
            </p>
            <p>Thank you for choosing us!</p>
            <hr style="border: none; border-top: 1px solid #ddd;" />
            <p style="font-size: 0.9em; color: #888;">
              If you have any questions, feel free to contact us at <a href="mailto:support@example.com" style="color: #4CAF50;">support@example.com</a>.
            </p>
          </div>
        `,
      },
      {
        to: process.env.ADMIN_EMAIL, // Admin's email
        subject: 'New Reservation Received',
        html: `
          <div style="background: #ffffff; font-family: Arial, sans-serif; color: #333; line-height: 1.5; padding: 20px; border: 1px solid #ddd; border-radius: 5px; max-width: 600px; margin: auto;">
            <div style="text-align: right;">
              <img src="https://res.cloudinary.com/dgdkk60jf/image/upload/v1736726090/Oden_logo_onalqy.png" alt="Website Logo" style="max-height: 50px;" />
            </div>
            <h2 style="color: #2196F3; text-align: center;">New Reservation Received</h2>
            <p>A new reservation has been made. Here are the details:</p>
            <ul>
              <li><strong>Name:</strong> ${req.body.fName} ${req.body.lName}</li>
              <li><strong>Guests:</strong> ${req.body.guest}</li>
              <li><strong>Date:</strong> ${req.body.date}</li>
              <li><strong>Time:</strong> ${req.body.time}</li>
              <li><strong>Reference Number:</strong> <span style="color: #2196F3;">${referenceNumber}</span></li>
            </ul>
            <hr style="border: none; border-top: 1px solid #ddd;" />
            <p style="font-size: 0.9em; color: #888;">
              Please log in to the admin panel to view or manage this reservation.
            </p>
          </div>
        `,
      },
    ]

    // Send emails
    await Promise.all(
      mailOptions.map((options) => transporter.sendMail(options))
    )

    res.status(201).json(savedReservation)
  } catch (error) {
    console.error('Error creating reservation:', error.message)
    res.status(500).json({ error: 'Failed to create reservation' })
  }
})

module.exports = router
