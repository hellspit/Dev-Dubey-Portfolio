import React, { Suspense } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";

const Mars: React.FC = () => {

  const gltf = useGLTF("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075309/Mars2_mkx5qr.glb", true);
  return <primitive object={gltf.scene} 
    scale={[0.0038,0.0038,0.0038]}
  />;
};

// Preload the model
useGLTF.preload("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075309/Mars2_mkx5qr.glb");

export default Mars;