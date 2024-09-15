const express = require('express');
const cors = require('cors');
const authcontroller = require('./controllers/authcontroller');
const favoriteRoute = require('./routes/favoriteRoute');

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent with requests
}));

app.use('/api/auth', authcontroller);

app.use('/favorites', favoriteRoute);
// A protected route example

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
