const express = require('express');
const cors = require('cors');
const Authcontroller = require('./user/controllers/Authcontroller');
const UserController = require('./user/controllers/UserController');
const ScannerRoute = require('./user/routes/ScannerRoute');
const FavoriteRoute = require('./user/routes/FavoriteRoute');
const CartRoute = require('./user/routes/CartRoute');
const OrderRoute = require('./user/routes/OrderRoute');
const HistoryRoute = require('./user/routes/HistoryRoute');
const ProductRoute = require('./user/routes/ProductRoute');
const ConfigRoute = require('./user/routes/FeeRoute');
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



app.use('/auth', Authcontroller);

app.use('/scanner', ScannerRoute);

app.use('/orders', OrderRoute);

app.use('/favorites', FavoriteRoute);

app.use('/cart', CartRoute);

app.use('/history', HistoryRoute);

app.use('/product', ProductRoute);

app.use('/config', ConfigRoute);

app.use('/user', UserController);


const PORT = process.env.PORT || "3001";
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
