import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const HolographicGlobe = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.6);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: "cyan",
      transparent: true,
      opacity: 0.5,
      wireframe: true,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    const light = new THREE.PointLight("white", 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default HolographicGlobe;