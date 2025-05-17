const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();

// --- Recommended Detailed CORS Configuration ---
const allowedOrigins = [
    "https://local-weather-ap.netlify.app", 'http://localhost:5173', 'http://localhost:3000',
    // Add local dev URL if needed: 'http://localhost:3000',
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.warn(`CORS blocked origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Explicitly allow methods including OPTIONS
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization', // Allow common headers + Authorization
    credentials: true, // Allow credentials (cookies/auth headers)
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions)); // Apply detailed CORS options


const API_KEY = process.env.API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'

app.get('/weather/:city', async (req, res) => {
    const {city} = req.params;

    if (!isNaN(city) && !isNaN(parseFloat(city))) {
        const queryString = `zip=${city}`
        const apiRes = await fetch(BASE_URL + queryString + API_KEY)
        const data = await apiRes.json()
        res.json(data)
        
    } else {
        const queryString = `q=${city}`;
        const apiRes = await fetch(BASE_URL + queryString + API_KEY)
        const data = await apiRes.json()
        res.json(data)
    }

    
})

app.listen(3000, () => {
    console.log('listening on port 3000...')
})