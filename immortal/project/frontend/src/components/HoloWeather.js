import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function HoloWeather() {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Example animation
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <HoloWeather />
    </Canvas>
  );
}