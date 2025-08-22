import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';
import { ShootingStarProps } from '../types';
import { SHOOTING_STARS_CONFIG } from '../constants';

const ShootingStar: React.FC<ShootingStarProps> = ({ startPosition }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.x -= delta * SHOOTING_STARS_CONFIG.SPEED;
      meshRef.current.position.y -= delta * SHOOTING_STARS_CONFIG.VERTICAL_SPEED;
      
      if (meshRef.current.position.x < SHOOTING_STARS_CONFIG.RESET_THRESHOLD) {
        meshRef.current.position.copy(startPosition);
      }
    }
  });

  return (
    <mesh ref={meshRef} position={startPosition}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" />
      <Trail
        width={0.5}
        length={5}
        color={new THREE.Color(0x4444ff)}
        attenuation={(t) => t * t}
      />
    </mesh>
  );
};

const ShootingStars: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: SHOOTING_STARS_CONFIG.COUNT }).map(() => new THREE.Vector3(
      Math.random() * 100 - 50,
      Math.random() * 50 + 20,
      Math.random() * 100 - 50
    ));
  }, []);

  return (
    <>
      {stars.map((position, i) => (
        <ShootingStar key={i} startPosition={position} />
      ))}
    </>
  );
};

export default ShootingStars;
