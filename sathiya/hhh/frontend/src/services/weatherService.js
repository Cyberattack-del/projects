export const fetchWeather = async (city) => {
    const API_KEY = process.env.REACT_APP_API_KEY;  
    console.log("API Key:", API_KEY);  // Debugging

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (response.status !== 200) {
            throw new Error(data.message);
        }

        return {
            city: data.name,
            temp: data.main.temp,
            condition: data.weather[0].description,
        };
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
};