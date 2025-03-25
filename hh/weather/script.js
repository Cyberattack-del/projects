const API_KEY = "04d0508e5f755e1deb3c5f6cfaff4b55";

// 🟢 Fetch Weather Data
async function fetchWeather(city = "Mumbai") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("condition").textContent = data.weather[0].description;
}

// 🔎 Search Weather
function searchWeather() {
    const city = document.getElementById("searchBar").value;
    if (city) fetchWeather(city);
}

// 🎙 Voice Command for Weather Search
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

document.getElementById("voiceBtn").addEventListener("click", () => recognition.start());

recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase().split(" ")[0]; // First word
    document.getElementById("location").textContent = "Searching for " + command + "...";
    fetchWeather(command);
};

// 🛰 3D Rotating Satellite with Three.js
let scene, camera, renderer, satellite;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight * 0.5);
    document.getElementById("satellite-container").appendChild(renderer.domElement);

    // 🌍 Load Earth Sphere
    const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
    const earthMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("earth_texture.jpg") });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // 🛰 Load Satellite Model (GLTF)
    const loader = new THREE.GLTFLoader();
    loader.load("satellite.glb", function (gltf) {
        satellite = gltf.scene;
        satellite.scale.set(0.3, 0.3, 0.3);
        satellite.position.set(2, 0, 0);
        scene.add(satellite);
    });

    animate();
}

// 🔄 Animate Satellite Rotation
function animate() {
    requestAnimationFrame(animate);

    if (satellite) {
        satellite.rotation.y += 0.01; 
        satellite.position.x = Math.cos(Date.now() * 0.001) * 2;
        satellite.position.z = Math.sin(Date.now() * 0.001) * 2;
    }

    renderer.render(scene, camera);
}

// 📌 Resize Event Listener
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight * 0.5);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

init();
fetchWeather();