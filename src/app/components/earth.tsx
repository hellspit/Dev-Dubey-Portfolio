import React, { Suspense } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";

interface EarthProps {
  onClick: () => void;
}

const Earth: React.FC<EarthProps> = ({ onClick }) => {
  const gltf = useGLTF("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075137/earth2_vapxo9.glb", true);

  return (
    <primitive 
      object={gltf.scene} 
      scale={[0.2,0.2,0.2]}
      onClick={onClick}
    />
  );
};

// Preload the model
useGLTF.preload("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075137/earth2_vapxo9.glb");

export default Earth;