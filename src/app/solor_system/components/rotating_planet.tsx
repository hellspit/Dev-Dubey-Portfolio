import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface RotatingPlanetProps {
  modelPath: string;
  rotationSpeed: number;
  orbitRadius: number;
  orbitSpeed: number;
  scale?: number;
  onClick?: () => void;
}

const RotatingPlanet: React.FC<RotatingPlanetProps> = ({
  modelPath,
  rotationSpeed,
  orbitRadius,
  orbitSpeed,
  scale = 1,
  onClick,
}) => {
  const planetRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(modelPath, true);

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.rotation.x = Math.PI / 2;
    }
  }, []);

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed * delta;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.y += orbitSpeed * delta;
    }
  });

  const handleClick = (event: any) => {
    event.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <group ref={orbitRef}>
      <group
        ref={planetRef}
        position={[orbitRadius, 0, 0]}
        scale={[scale, scale, scale]}
        onClick={handleClick}
        userData={{ clickable: true }}
      >
        <primitive object={gltf.scene} />
      </group>
    </group>
  );
};

export default RotatingPlanet; 