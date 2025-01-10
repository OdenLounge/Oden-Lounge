require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const galleryRoutes = require('./routes/galleryRoutes')
const adminRoutes = require('./routes/adminRoutes')
const contactRoutes = require('./routes/contactRoutes')
const reservationRoutes = require('./routes/reservationRoutes')
const menuRoutes = require('./routes/menuRoutes')

const multer = require('multer')
const cloudinary = require('./config/cloudinary') // Import Cloudinary configuration
const { v4: uuidv4 } = require('uuid') // To generate unique filenames

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Environment variables
const PORT = process.env.PORT || 5000
const DB_URI = process.env.DB_URI

// Connect to MongoDB
mongoose
  .connect(DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Multer storage configuration (memory storage)
const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/
    const extname = allowedTypes.test(file.originalname.toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    if (extname && mimetype) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  },
})

// Route to upload an image to Cloudinary
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded')
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'oden-lounge', public_id: uuidv4() },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error)
          return res.status(500).send('Error uploading to Cloudinary')
        }
        res.json({ imageUrl: result.secure_url })
      }
    )

    // Pipe the file buffer into Cloudinary upload stream
    uploadStream.end(req.file.buffer)
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).send('Internal server error')
  }
})

// Routes
app.use('/api/gallery', galleryRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/reservations', reservationRoutes)
app.use('/api/menu', menuRoutes)

// Serverless export for Vercel
// module.exports = app

app.listen(process.env.PORT, () => {
  try {
    console.log(`server is running on port ${process.env.PORT}`)
  } catch (error) {
    console.log(error)
  }
})
