import React, { Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Saturn: React.FC = () => {
  const gltf = useGLTF("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075201/saturn_qi2nxc.glb", true);

  
  gltf.scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      if (child.material instanceof THREE.MeshStandardMaterial) {
        
        child.material.emissive = new THREE.Color(0x222222);
        child.material.emissiveIntensity = 0.3;
      
        child.material.metalness = 0.2;
        child.material.roughness = 0.7;
      }
    }
  });

  return <primitive object={gltf.scene} scale={[0.006, 0.006, 0.006]} />;
};

// Preload the model
useGLTF.preload("https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075201/saturn_qi2nxc.glb");

export default Saturn;
