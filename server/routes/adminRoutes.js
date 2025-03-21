require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinary"); // Import the storage configuration from cloudinary.js
const Reservation = require("../models/reservation");
const Gallery = require("../models/gallery");
const cloudinary = require("cloudinary").v2; // Import Cloudinary
const nodemailer = require("nodemailer");

const router = express.Router();

// Multer configuration for file upload using Cloudinary storage
const upload = multer({ storage });

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Email from .env
    pass: process.env.EMAIL_PASS, // App password from .env
  },
});

// Endpoint to upload image to Cloudinary
router.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file uploaded" });
  }

  try {
    const imageUrl = req.file.path; // Cloudinary URL

    const newGalleryItem = new Gallery({
      image: imageUrl, // Save URL in DB
      likes: 0,
      comments: [],
    });

    await newGalleryItem.save();
    return res.json({ imageUrl });
  } catch (error) {
    console.error("Error saving image URL to DB:", error);
    res.status(500).json({ error: "Failed to save image" });
  }
});

// Endpoint to get all gallery items (images + comments)
router.get("/images", async (req, res) => {
  try {
    const galleryItems = await Gallery.find();
    res.json(galleryItems);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    res.status(500).json({ error: "Unable to fetch gallery items" });
  }
});

// Endpoint to delete an image and its data from Cloudinary and DB
router.delete("/images/:imageId", async (req, res) => {
  const { imageId } = req.params;

  try {
    console.log("Received request to delete image with ID:", imageId);

    const galleryItem = await Gallery.findById(imageId);

    if (!galleryItem) {
      console.error("Image not found in DB");
      return res.status(404).json({ error: "Image not found" });
    }

    const publicId = galleryItem.image.split("/").pop().split(".")[0];
    console.log("Extracted Cloudinary public ID:", publicId);

    const cloudinaryResult = await cloudinary.uploader.destroy(publicId);
    console.log("Cloudinary deletion result:", cloudinaryResult);

    // console.log('Public ID being sent to Cloudinary:', publicId)

    await Gallery.findByIdAndDelete(imageId);
    console.log("Successfully deleted image from DB:", imageId);

    res.json({ message: "Image and associated data deleted successfully" });
  } catch (error) {
    console.error("Error deleting image and data:", error);
    res.status(500).json({ error: "Failed to delete image and data" });
  }
});

// Endpoint to delete a comment from an image
router.delete("/images/:imageId/comments", async (req, res) => {
  const { imageId } = req.params;
  const { commentIndex } = req.body;

  try {
    const galleryItem = await Gallery.findById(imageId);

    if (!galleryItem) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Remove the comment at the specified index
    galleryItem.comments.splice(commentIndex, 1);
    await galleryItem.save();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

// Update reservation status (admin-only endpoint)
router.put("/update-reservation/:id", async (req, res) => {
  const { status } = req.body;

  try {
    // Find the reservation by ID
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // Update the reservation status
    reservation.status = status;
    const updatedReservation = await reservation.save();

    // Send email notification
    const mailOptions = {
      to: reservation.email, // Customer's email
      subject: "Reservation Status Update",
      html: `
        <div style="background: #ffffff; font-family: Arial, sans-serif; color: #333; line-height: 1.5; padding: 20px; border: 1px solid #ddd; border-radius: 5px; max-width: 600px; margin: auto;">
          <div style="text-align: right;">
            <img src="https://res.cloudinary.com/dgdkk60jf/image/upload/v1736726090/Oden_logo_onalqy.png" alt="Website Logo" style="max-height: 50px;" />
          </div>
          <h2 style="color: ${
            status === "Confirmed"
              ? "#4CAF50"
              : status === "Cancelled"
              ? "#f44336"
              : "#FF9800"
          }; text-align: center;">
            Reservation ${
              req.body.status.charAt(0).toUpperCase() + req.body.status.slice(1)
            }
          </h2>
          <p>Dear <strong>${reservation.fName}</strong>,</p>
          <p>We would like to inform you about the status of your reservation.</p>
          <p>
            <strong>Reservation Status:</strong> <span style="color: ${
              req.body.status === "confirmed"
                ? "#4CAF50"
                : req.body.status === "canceled"
                ? "#f44336"
                : "#FF9800"
            };">${
        req.body.status.charAt(0).toUpperCase() + req.body.status.slice(1)
      }</span>
          </p>
          <p>
            <strong>Reference Number:</strong> <span style="color: #4CAF50;">${
              reservation.referenceNumber
            }</span>
          </p>
          <p>
            <strong>Guests:</strong> ${reservation.guest}<br>
            <strong>Date:</strong> ${reservation.date}<br>
            <strong>Time:</strong> ${reservation.time}
          </p>
          <p>Thank you for choosing us! If you have any further questions, feel free to contact us.</p>
          <hr style="border: none; border-top: 1px solid #ddd;" />
          <p style="font-size: 0.9em; color: #888;">
            For any issues, you can reach us at <a href="mailto:admin@odenlounge.co.uk" style="color: #4CAF50;">admin@odenlounge.co.uk</a>.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Respond with the updated reservation
    res.json(updatedReservation);
  } catch (error) {
    console.error(
      "Error updating reservation and sending email:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Failed to update reservation and send email" });
  }
});

// Get all reservations (admin-only endpoint)
router.get("/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Unable to fetch reservations" });
  }
});

// Route to handle the query
router.get("/reservations/:referenceNumber", async (req, res) => {
  const { referenceNumber } = req.params; // Extract referenceNumber from URL params
  try {
    // Use an object to query the database
    const reservation = await Reservation.findOne({ referenceNumber });

    if (reservation) {
      res.json(reservation); // Return the reservation if found
    } else {
      res.status(404).json({ message: "Reservation not found" }); // Return 404 if not found
    }
  } catch (error) {
    console.error("Error querying reservation:", error.message);
    res.status(500).json({ message: "Server error" }); // Return 500 for server errors
  }
});

// Update reservation status (customer-facing route, for admin purposes)
// router.put('/:id/status', async (req, res) => {
//   const { status } = req.body;

//   if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
//     return res.status(400).json({ error: 'Invalid status value' });
//   }

//   try {
//     const reservation = await Reservation.findById(req.params.id);
//     if (!reservation) {
//       return res.status(404).json({ error: 'Reservation not found' });
//     }

//     reservation.status = status;
//     const updatedReservation = await reservation.save();

//     // Send email notification
//     const mailOptions = {
//       to: reservation.email,
//       subject: 'Reservation Status Update',
//       text: `Dear ${reservation.fName},\n\nYour reservation status has been updated to: ${status}.\nReference Number: ${reservation.referenceNumber}`,
//     };
//     await transporter.sendMail(mailOptions);

//     res.json(updatedReservation);
//   } catch (error) {
//     console.error('Error updating reservation status:', error.message);
//     res.status(500).json({ error: 'Failed to update reservation status' });
//   }
// });

module.exports = router;
