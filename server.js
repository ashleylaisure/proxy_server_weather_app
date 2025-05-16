const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();


app.use(cors());

const API_KEY = process.env.API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'

app.get('/weather/:city', async (req, res) => {
    const {city} = req.params;
    const queryString = `q=${city}`;
    const apiRes = await fetch(BASE_URL + queryString + API_KEY)
    const data = await apiRes.json()
    res.json(data)
})

app.listen(3000, () => {
    console.log('listening on port 3000...')
})