const express = require('express');
const cors = require('cors');
const authcontroller = require('./user/controllers/authController');
const userController = require('./user/controllers/userController');
const scannerRoute = require('./user/routes/scannerRoute');
const favoriteRoute = require('./user/routes/favoriteRoute');
const cartRoute = require('./user/routes/cartRoute');
const orderRoute = require('./user/routes/orderRoute');
const historyRoute = require('./user/routes/historyRoute');
const productRoute = require('./user/routes/productRoute');
const configRoute = require('./user/routes/feeRoute');
const path = require('path');

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: ['http://localhost:5173', 'https://mesan.curaweda.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
}));
  

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', authcontroller);

app.use('/scanner', scannerRoute);

app.use('/orders', orderRoute);

app.use('/favorites', favoriteRoute);

app.use('/cart', cartRoute);

app.use('/history', historyRoute);

app.use('/product', productRoute);

app.use('/config', configRoute);

app.use('/user', userController);


const PORT = process.env.PORT || "3001";
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
