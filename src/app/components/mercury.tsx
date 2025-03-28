import React, { Suspense } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";

const Mercury: React.FC = () => {
  const gltf = useGLTF("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075127/Mercury_r51foj.glb", true);
  return <primitive object={gltf.scene} />;
};

// Preload the model
useGLTF.preload("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075127/Mercury_r51foj.glb");

export default Mercury;