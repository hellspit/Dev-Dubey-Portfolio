import React from "react";
import { useGLTF } from "@react-three/drei";

interface NeptuneProps {
  onClick?: () => void;
}

const Neptune: React.FC<NeptuneProps> = ({ onClick }) => {
  const gltf = useGLTF("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075182/neptune_echzi0.glb", true);

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
        scale={[0.18, 0.18, 0.18]}
      />
    </mesh>
  );
};

// Preload the model
useGLTF.preload("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075182/neptune_echzi0.glb");

export default Neptune;
