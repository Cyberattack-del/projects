import React, { useState } from 'react';
import { fetchWeather } from '../services/weatherService';
import WeatherGlobe from '../components/WeatherGlobe';
import VoiceControl from '../components/VoiceControl';
import GestureControl from '../components/GestureControl';
import HoloWeather from '../components/HoloWeather';

const Dashboard = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const getWeather = async () => {
        if (!city) return;
        const data = await fetchWeather(city);
        setWeather(data);
    };

    return (
        <div className="dashboard">
            <h1>Weather Dashboard</h1>
            <input 
                type="text" 
                placeholder="Enter city" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
            />
            <button onClick={getWeather}>Get Weather</button>

            {weather && (
                <div className="weather-info">
                    <h2>{weather.city}</h2>
                    <p>Temperature: {weather.temp}°C</p>
                    <p>Condition: {weather.condition}</p>
                </div>
            )}
            <HoloWeather/>
            <WeatherGlobe />
            <VoiceControl onCommand={setCity} />
            <GestureControl onGesture={getWeather} />
        </div>
    );
};

export default Dashboard;