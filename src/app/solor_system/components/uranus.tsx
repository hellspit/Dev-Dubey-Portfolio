import React, { Suspense } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";

const Uranus: React.FC = () => {

  const gltf = useGLTF("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075145/Uranus_ybybju.glb", true);
  return <primitive object={gltf.scene} 
    scale={[0.004,0.004,0.004]}
  />;
};

// Preload the model
useGLTF.preload("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075145/Uranus_ybybju.glb");

export default Uranus;