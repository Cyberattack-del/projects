const axios = require("axios");

exports.getWeather = async (req, res) => {
    const { location } = req.query;

    if (!location) {
        return res.status(400).json({ error: "Location is required" });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API}&units=metric`
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
};