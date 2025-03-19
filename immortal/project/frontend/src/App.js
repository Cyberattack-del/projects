import React, { useState } from "react";
import axios from "axios";
import HoloWeather from "./components/HoloWeather";

function App() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeather = async () => {
        const response = await axios.post("http://localhost:5000/getWeather", { city });
        setWeatherData(response.data);
    };

    return (
        <div>
            <h1>Holographic Weather Dashboard</h1>
            <input type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
            <button onClick={fetchWeather}>Get Weather</button>

            {weatherData && (
                <div>
                    <h2>{weatherData.location.name}</h2>
                    <p>{weatherData.current.condition.text}</p>
                    <p>Temperature: {weatherData.current.temp_c}°C</p>
                </div>
            )}

            <HoloWeather />
        </div>
    );
}

export default App;