import * as THREE from 'three';
import { useEffect } from 'react';

const WeatherGlobe = () => {
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(5, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load('/assets/earth_texture.jpg'),
            transparent: true,
            opacity: 0.8
        });

        const earth = new THREE.Mesh(geometry, material);
        scene.add(earth);

        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(10, 10, 10);
        scene.add(light);

        camera.position.z = 10;

        const animate = () => {
            requestAnimationFrame(animate);
            earth.rotation.y += 0.002;
            renderer.render(scene, camera);
        };

        animate();
    }, []);

    return null;
};

export default WeatherGlobe;