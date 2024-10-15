const express = require('express');
const cors = require('cors');
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
    res.status(500).json({ error: 'Something went wrong, please try again later.' });
});

// Catch-all for 404 Not Found (if no routes matched)
app.use((req, res, next) => {
    res.status(404).json({ error: 'trigger happy pack heat but its blank ink cheetoh' });
});

// Server
const PORT = process.env.PORT || "3001";
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle uncaught exceptions and unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    // Optional: Exit process or restart using PM2
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Optional: Gracefully shut down or restart using PM2
});
