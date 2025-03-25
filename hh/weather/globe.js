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

createGlobe();