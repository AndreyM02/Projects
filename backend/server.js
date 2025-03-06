// Import required modules
const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit'); // For rate limiting
const winston = require('winston'); // For logging (optional, but recommended)
require('dotenv').config({ path: '../.env' }); // Load environment variables

// Create an Express application
const app = express();

// Middleware Setup
// Enable CORS with specific origins for security
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*', // Example: 'http://localhost:3000,http://example.com'
}));

// Enable parsing of JSON payloads
app.use(express.json());

// Rate Limiting Middleware
// Prevent abuse by limiting requests from a single IP
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 100 requests per windowMs
}));

// Logger Setup (optional, but recommended for production)
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'server.log' })
    ],
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    logger.error('MONGO_URI not defined in .env file');
    throw new Error('MONGO_URI is required to connect to the database');
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.info('MongoDB connected successfully'))
    .catch((err) => {
        logger.error(`MongoDB connection error: ${err.message}`);
        process.exit(1); // Exit the process if DB connection fails
    });

// Import Routes
const productRoutes = require('./routes/productRoutes');

const authRoutes = require('./routes/authRoutes');

//ONLY FOR TESTING PURPOSES //NOT ANYMORE
const adminRoutes = require('./routes/adminRoutes');

const cartRoutes = require('./routes/cartRoutes');

const publicProductRoutes = require('./routes/publicProductRoutes');

const orderRoutes = require('./routes/orderRoutes');

const stripeRoutes = require('./routes/stripeRoutes');




// Mount Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/public/products', publicProductRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stripe', stripeRoutes);    

// Root Endpoint
// A simple test route to confirm API is running
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling Middleware
// Handles any unhandled errors from the routes
app.use((err, req, res, next) => {
    logger.error(`Unhandled Error: ${err.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Graceful Shutdown
// Ensure the app closes resources like DB connections properly
process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Shutting down gracefully...');
    mongoose.connection.close(() => {
        logger.info('MongoDB disconnected');
        process.exit(0);
    });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});



