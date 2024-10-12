const express = require('express');
const cors = require('cors');
const Authcontroller = require('./user/controllers/AuthController');
const UserController = require('./user/controllers/UserController');
const ScannerRoute = require('./user/routes/ScannerRoute');
const FavoriteRoute = require('./user/routes/FavoriteRoute');
const CartRoute = require('./user/routes/CartrRoute');
const OrderRoute = require('./user/routes/OrderRoute');
const HistoryRoute = require('./user/routes/HistoryRoute');
const ProductRoute = require('./user/routes/ProductRoute');
const ConfigRoute = require('./user/routes/FeeRoute');

const app = express();
app.use(express.json());

// Enable CORS
//? CORS SECTION START
const corsOptions = {
    origin: ["*"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: [
         "Content-Type",
               "Authorization",
                "X-Requested-With",
                "Origin",
                 "Accept"
             ],
             preflightContinue: true, // Ensure preflight requests are forwarded
             optionsSuccessStatus: 200, // For legacy browsers
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Allow preflight requests for all routes

//? CORS SECTION END

// Routes
app.use('/auth', Authcontroller);
app.use('/scanner', ScannerRoute);
app.use('/orders', OrderRoute);
app.use('/favorites', FavoriteRoute);
app.use('/cart', CartRoute);
app.use('/history', HistoryRoute);
app.use('/product', ProductRoute);
app.use('/config', ConfigRoute);
app.use('/user', UserController);

// Server
const PORT = process.env.PORT || "3001";
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
