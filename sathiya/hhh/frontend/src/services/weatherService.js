export const fetchWeather = async (city = null) => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    console.log("API Key:", API_KEY);  // Debugging

    try {
        let url;
        
        if (city) {
            // Fetch weather by city name
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        } else {
            // Fetch weather by geolocation
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

                    const response = await fetch(url);
                    const data = await response.json();

                    if (response.status !== 200) {
                        reject(new Error(data.message));
                    }

                    resolve({
                        city: data.name,
                        temp: data.main.temp,
                        condition: data.weather[0].description,
                    });
                }, (error) => {
                    reject(new Error("Location access denied"));
                });
            });
        }

        // If fetching by city name
        const response = await fetch(url);
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