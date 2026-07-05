import React from "react";
import { useGLTF } from "@react-three/drei";

interface VenusProps {
  onClick?: () => void;
}

const Venus: React.FC<VenusProps> = ({ onClick }) => {
  const gltf = useGLTF("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075152/venus_xk1kof.glb", true);

  const handleClick = (event: any) => {
    event.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <mesh onClick={handleClick} userData={{ clickable: true }}>
      <primitive object={gltf.scene} scale={[0.09,0.09,0.09]}/>
    </mesh>
  );
};

// Preload the model
useGLTF.preload("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075152/venus_xk1kof.glb");

export default Venus;
