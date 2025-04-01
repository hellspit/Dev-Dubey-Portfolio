import React, { Suspense } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";

interface MercuryProps {
  onClick?: () => void;
}

const Mercury: React.FC<MercuryProps> = ({ onClick }) => {
  const gltf = useGLTF("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075127/Mercury_r51foj.glb", true);
  
  const handleClick = (event: any) => {
    event.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <mesh onClick={handleClick} userData={{ clickable: true }}>
      <primitive object={gltf.scene} />
    </mesh>
  );
};

// Preload the model
useGLTF.preload("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075127/Mercury_r51foj.glb");

export default Mercury;