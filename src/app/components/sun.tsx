import { useGLTF, OrbitControls } from "@react-three/drei";
import type { NextPage } from "next";
import React, { Suspense, useEffect } from "react";
import * as THREE from "three"; 

const Sun: React.FC = () => {
    const gltf = useGLTF('https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075171/sun_ho5pjo.glb', true, undefined, (error) => {
      console.error('Error loading model:', error);
    });

    useEffect(() => {
      try {
        // Traverse the scene and update material properties for a reddish tone
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.color.set('#a8a232'); // reddish-orange
              child.material.emissive.set("#a8a232");
              child.material.emissiveIntensity = 1;
            } else {
              // For other material types, update the color if possible
              child.material.color = new THREE.Color(0xff4500);
            }
          }
        });
      } catch (error) {
        console.error('Error updating materials:', error);
      }
    }, [gltf.scene]);
  
    return (
      <Suspense fallback={null}>
        <primitive object={gltf.scene} scale={[0.51, 0.51, 0.51]} />
      </Suspense>
    );
  };

// Preload the model
useGLTF.preload('https://res.cloudinary.com/dm1yujy8h/image/upload/v1743075171/sun_ho5pjo.glb');

export default Sun;