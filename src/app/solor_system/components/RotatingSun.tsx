import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RotatingSunProps } from '../types';
import Sun from './sun';

const RotatingSun: React.FC<RotatingSunProps> = ({ rotationSpeed, onClick }) => {
  const sunRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (sunRef.current) sunRef.current.rotation.y += rotationSpeed * delta;
  });

  return (
    <group
      ref={sunRef}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
    >
      <Sun />
    </group>
  );
};

export default RotatingSun;
