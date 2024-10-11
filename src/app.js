const express = require('express');
const cors = require('cors');
const authcontroller = require('./user/controllers/AuthController');
const userController = require('./user/controllers/UserController');
const scannerRoute = require('./user/routes/ScannerRoute');
const favoriteRoute = require('./user/routes/FavoriteRoute');
const cartRoute = require('./user/routes/CartRoute');
const orderRoute = require('./user/routes/OrderRoute');
const historyRoute = require('./user/routes/HistoryRoute');
const productRoute = require('./user/routes/ProductRoute');
const configRoute = require('./user/routes/FeeRoute');
const path = require('path');

const app = express();
app.use(express.json());

// Enable CORS

const corsOptions = {
    origin: 'https://mesan.curaweda.com', // Ganti dengan origin frontend Anda
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Perhatikan bahwa 'OPTIONS' seharusnya ditulis dengan benar
    credentials: true, // Jika Anda ingin mengizinkan pengiriman cookie
};

app.use(cors(corsOptions));

  

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
