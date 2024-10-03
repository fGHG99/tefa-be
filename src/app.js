const express = require('express');
const cors = require('cors');
const authcontroller = require('./controllers/authcontroller');
const scannerRoute = require('./routes/scannerRoute');
const favoriteRoute = require('./routes/favoriteRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');
const historyRoute = require('./routes/historyRoute');
const productRoute = require('./routes/productRoute');
const configRoute = require('./routes/feeRoute');

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
}));    

app.use('/auth', authcontroller);

app.use('/scanner', scannerRoute);

app.use('/orders', orderRoute);

app.use('/favorites', favoriteRoute);

app.use('/cart', cartRoute);

app.use('/history', historyRoute);

app.use('/product', productRoute);

app.use('/config', configRoute);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
