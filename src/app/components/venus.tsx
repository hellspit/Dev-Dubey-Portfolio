import React, { Suspense } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";

const Venus: React.FC = () => {

  const gltf = useGLTF("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075152/venus_xk1kof.glb", true);
  return <primitive object={gltf.scene} scale={[0.09,0.09,0.09]}/>;
};

// Preload the model
useGLTF.preload("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075152/venus_xk1kof.glb");

export default Venus