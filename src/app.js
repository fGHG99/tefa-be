const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Auth = require('./user/routes/AuthRoute');
const UserController = require('./user/controllers/UserController');
const ScannerRoute = require('./user/routes/ScannerRoute');
const FavoriteRoute = require('./user/routes/FavoriteRoute');
const CartRoute = require('./user/routes/CartRoute');
const OrderRoute = require('./user/routes/OrderRoute');
const HistoryRoute = require('./user/routes/HistoryRoute');
const ProductRoute = require('./user/routes/ProductRoute');
const AdminRoutes = require('./admin/routes/AdminRoute');

const app = express();

// Set a timeout limit for all requests
const REQUEST_TIMEOUT = 15000; // 15 seconds
app.use((req, res, next) => {
    req.setTimeout(REQUEST_TIMEOUT, () => {
        // If the request exceeds the time limit, respond with an error
        res.status(408).json({ error: 'Request timed out. Please try again later.' });
    });
    next();
});

// CORS Configuration
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://mesan.curaweda.com",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
    ],
    optionsSuccessStatus: 200,
};

// Apply CORS middleware to all routes
app.use(cors(corsOptions));

// Apply the CORS middleware to handle preflight requests
app.options('*', cors(corsOptions));

// Parse JSON requests
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', Auth);
app.use('/scanner', ScannerRoute);
app.use('/orders', OrderRoute);
app.use('/favorites', FavoriteRoute);
app.use('/cart', CartRoute);
app.use('/history', HistoryRoute);
app.use('/product', ProductRoute);
app.use('/user', UserController);
app.use('/admin', AdminRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);  // Log the error details
    res.status(500).json({
        error: 'Something went wrong, please try again later.',
        message: err.message,
        stack: err.stack,  // Return stack trace for debugging
    });
});

// Catch-all for 404 Not Found (if no routes matched)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Cannot find the route' });
});

// Server
const PORT = process.env.PORT || "3001";
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle uncaught exceptions and unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    // You can optionally exit the process or restart using PM2
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // You can optionally gracefully shut down or restart using PM2
});
