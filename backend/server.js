const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5001;

app.use(cors());

// Route for Spotify token
app.get('/spotify-token', (req, res) => {
    res.json({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        accessToken: process.env.SPOTIFY_ACCESS_TOKEN,
    });
});

// Route for Weather API key
app.get('/weather-key', (req, res) => {
    res.json({
        apiKey: process.env.WEATHER_API_KEY,
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
