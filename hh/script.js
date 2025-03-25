// app.js
//const apiKey = "04d0508e5f755e1deb3c5f6cfaff4b55"; // Replace with your OpenWeatherMap API key
// OpenWeatherMap API Key (Replace with your own)
const API_KEY = "04d0508e5f755e1deb3c5f6cfaff4b55";
const city = "Mumbai";  // Default city (India-based)

// Function to fetch weather data
async function fetchWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("location").textContent = data.name + ", " + data.sys.country;
    document.getElementById("temperature").textContent = Math.round(data.main.temp) + "°C";
    document.getElementById("condition").textContent = data.weather[0].description;
}

// Speech Recognition for voice control
const voiceBtn = document.getElementById("voiceBtn");
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

voiceBtn.addEventListener("click", () => {
    recognition.start();
});

recognition.onresult = async (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    document.getElementById("location").textContent = "Searching for " + command + "...";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${command}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
        document.getElementById("location").textContent = data.name + ", " + data.sys.country;
        document.getElementById("temperature").textContent = Math.round(data.main.temp) + "°C";
        document.getElementById("condition").textContent = data.weather[0].description;
    } else {
        document.getElementById("location").textContent = "City not found!";
    }
};

// 3D Holographic Globe with Three.js
function createGlobe() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("globeCanvas"), alpha: true });

    renderer.setSize(400, 400);
    
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const texture = new THREE.TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/6/69/Earth_texture_map.jpg");
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const globe = new THREE.Mesh(geometry, material);

    scene.add(globe);
    camera.position.z = 3;

    function animate() {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();
}

fetchWeather();
createGlobe();