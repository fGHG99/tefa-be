const express = require('express');
const cors = require('cors');
const authController = require('./user/controllers/authController');
const userController = require('./user/controllers/userController');
const scannerRoute = require('./user/routes/scannerRoute');
const favoriteRoute = require('./user/routes/favoriteRoute');
const cartRoute = require('./user/routes/cartRoute');
const orderRoute = require('./user/routes/orderRoute');
const historyRoute = require('./user/routes/historyRoute');
const productRoute = require('./user/routes/productRoute');
const configRoute = require('./user/routes/feeRoute');
const sellerRoute = require('./seller/routes/sellerRoute');  
const deliveryRoute = require('./routes/deliveryRoute'); // Tambahkan route delivery

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Define routes
app.use('/auth', authController);

app.use('/scanner', scannerRoute);

app.use('/orders', orderRoute);

app.use('/favorites', favoriteRoute);

app.use('/cart', cartRoute);

app.use('/history', historyRoute);

app.use('/product', productRoute);

app.use('/config', configRoute);

app.use('/user', userController);

app.use('/seller', sellerRoute);

app.use('/deliveries', deliveryRoute); // Tambahkan route delivery

// Start server
const PORT = process.env.PORT || "3001";
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
