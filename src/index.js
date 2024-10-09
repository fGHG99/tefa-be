const express = require('express');
const cors = require('cors');
const authcontroller = require('./controllers/authcontroller');
const scannerRoute = require('./routes/scannerRoute');
const favoriteRoute = require('./routes/favoriteRoute');
const cartRoute = require('../src/routes/cartRoute');
const orderRoute = require('./routes/orderRoute');
const historyRoute = require('./routes/historyRoute');

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent with requests
}));

app.use('/api/auth', authcontroller);

// Use the scanner routes
app.use('/scanner', scannerRoute);

app.use('/orders', orderRoute);

app.use('/favorites', favoriteRoute);

app.use('/cart', cartRoute);

app.use('/history', historyRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
