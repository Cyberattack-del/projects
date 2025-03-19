import axios from "axios";

const API_KEY = "04d0508e5f755e1deb3c5f6cfaff4b55"; // Replace with your weather API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export const fetchWeather = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
};