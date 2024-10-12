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
const path = require('path');

const app = express();
app.use(express.json());

// Enable CORS
//? CORS SECTION START
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000", //backend
    "https://mesan.curaweda.com", //pos
    "https://api-mesan.curaweda.com", //api
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow requests without origin (e.g., Postman)
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin); // Log the blocked origin for debugging
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Corrected "OPTIONS"
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ]
  };
  
  //? CORS SECTION END

app.use(cors(corsOptions));
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
