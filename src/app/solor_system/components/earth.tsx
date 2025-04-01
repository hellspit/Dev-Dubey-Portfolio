import React, { Suspense } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface EarthProps {
  onClick?: () => void;
}

const Earth: React.FC<EarthProps> = ({ onClick }) => {
  const gltf = useGLTF("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743531766/earth_qudvwl.glb", true);

  const handleClick = (event: any) => {
    event.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <mesh onClick={handleClick} userData={{ clickable: true }}>
      <primitive 
        object={gltf.scene} 
        scale={[0.2,0.2,0.2]}
      />
    </mesh>
  );
};

// Preload the model
useGLTF.preload("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743531766/earth_qudvwl.glb");

export default Earth;