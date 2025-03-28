import React, { Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Neptune: React.FC = () => {
  const gltf = useGLTF("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075182/neptune_echzi0.glb", true);
  return (
    <primitive
      object={gltf.scene}
      scale={[0.18, 0.18, 0.18]}
    />
  );
};

// Preload the model
useGLTF.preload("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075182/neptune_echzi0.glb");

export default Neptune;
