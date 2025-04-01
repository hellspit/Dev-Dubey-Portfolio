import React, { Suspense } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";

const Jupiter: React.FC = () => {

  const gltf = useGLTF("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075125/Jupiter1_qcnooe.glb", true);
  return <primitive object={gltf.scene} 
     scale={[0.0089,0.0089,0.0089]}
  />;
};

// Preload the model
useGLTF.preload("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075125/Jupiter1_qcnooe.glb");

export default Jupiter;