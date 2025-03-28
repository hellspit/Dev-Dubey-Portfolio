"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Stars,
  OrbitControls,
  Preload,
  useProgress,
  Html,
  Line,
} from "@react-three/drei";
import { Suspense, useRef, ReactNode, useMemo, useEffect, useState } from "react";
import type { NextPage } from "next";
import dynamic from 'next/dynamic';

// Error boundary component
const ErrorBoundary = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<Html center><div style={{ color: "white" }}>Loading...</div></Html>}>
      {children}
    </Suspense>
  );
};

// Dynamically import planet components with no SSR and error handling
const Sun = dynamic(() => import("./components/sun"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Sun...</div></Html>
});
const Mercury = dynamic(() => import("./components/mercury"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Mercury...</div></Html>
});
const Venus = dynamic(() => import("./components/venus"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Venus...</div></Html>
});
const Earth = dynamic(() => import("./components/earth"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Earth...</div></Html>
});
const Mars = dynamic(() => import("./components/mars"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Mars...</div></Html>
});
const Jupiter = dynamic(() => import("./components/jupiter"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Jupiter...</div></Html>
});
const Saturn = dynamic(() => import("./components/saturn"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Saturn...</div></Html>
});
const Uranus = dynamic(() => import("./components/uranus"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Uranus...</div></Html>
});
const Neptune = dynamic(() => import("./components/neptune"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Neptune...</div></Html>
});

// Loader Component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "white" }}>{progress.toFixed(2)}% loaded</div>
    </Html>
  );
}

// Recenter Button Component
function RecenterButton() {
  const { camera } = useThree();

  const recenterCamera = () => {
    camera.position.set(0, 10, 20); // Reset camera position
    camera.lookAt(0, 0, 0);
  };

  return (
    <Html position={[0, 0, 0]}>
      <div
        className="fixed bottom-4 left-4 z-50"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 1000, // Ensure it's above the canvas
        }}
      >
        <button
          onClick={recenterCamera}
          className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700"
          style={{
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          ⟳
        </button>
      </div>
    </Html>
  );
}
// Rotating Planet Component
interface RotatingPlanetProps {
  children: ReactNode;
  rotationSpeed: number;
  revolutionSpeed: number;
  orbitDistance: number;
  Linkforopen?: string;
}

const RotatingPlanet: React.FC<RotatingPlanetProps> = ({
  children,
  rotationSpeed,
  revolutionSpeed,
  orbitDistance,
  Linkforopen,
}) => {
  const [hovered, setHovered] = useState(false);
  const revolutionRef = useRef<THREE.Group>(null);
  const rotationRef = useRef<THREE.Group>(null);
  const linkopen = () => {
    if (Linkforopen) {
      window.open(Linkforopen, "_blank");
    }
  }

  useFrame((state, delta) => {
    if (rotationRef.current) rotationRef.current.rotation.y += rotationSpeed * delta;
    if (revolutionRef.current) revolutionRef.current.rotation.y += revolutionSpeed * delta;
  });

  return (
    <group ref={revolutionRef}>
      <Orbit radius={orbitDistance} />
      <group ref={rotationRef} position={[orbitDistance, 0, 0]}>
        <mesh scale={hovered ? 1.5 : 1} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false) } onClick={linkopen}>
          {children}
        </mesh>
      </group>
    </group>
  );
};

// Orbit Ring Component
interface OrbitProps {
  radius: number;
  segments?: number;
  color?: string;
}

const Orbit: React.FC<OrbitProps> = ({ radius, segments = 64, color = "gray" }) => {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(radius * Math.cos(theta), 0, radius * Math.sin(theta)));
    }
    return pts;
  }, [radius, segments]);

  return <Line points={points} color={color} lineWidth={1} dashed={false} />;
};

// Rotating Sun Component
interface RotatingSunProps {
  rotationSpeed: number;
}

const RotatingSun: React.FC<RotatingSunProps> = ({ rotationSpeed }) => {
  const sunRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (sunRef.current) sunRef.current.rotation.y += rotationSpeed * delta;
  });

  return (
    <group ref={sunRef}>
      <Sun />
    </group>
  );
};

// Keyboard Controls Component
interface KeyboardControlsProps {
  controlsRef: React.RefObject<any>;
}

const KeyboardControls: React.FC<KeyboardControlsProps> = ({ controlsRef }) => {
  const { camera } = useThree();
  const keys = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => (keys.current[e.key.toLowerCase()] = true);
    const handleKeyUp = (e: KeyboardEvent) => (keys.current[e.key.toLowerCase()] = false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    const panSpeed = 5;
    const move = new THREE.Vector3();

    const right = new THREE.Vector3();
    right.setFromMatrixColumn(camera.matrix, 0).normalize();
    if (keys.current["a"]) move.addScaledVector(right, -panSpeed * delta);
    if (keys.current["d"]) move.addScaledVector(right, panSpeed * delta);

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.normalize();
    if (keys.current["w"]) move.addScaledVector(forward, panSpeed * delta);
    if (keys.current["s"]) move.addScaledVector(forward, -panSpeed * delta);

    const up = new THREE.Vector3();
    up.setFromMatrixColumn(camera.matrix, 1).normalize();
    if (keys.current["q"]) move.addScaledVector(up, panSpeed * delta);
    if (keys.current["e"]) move.addScaledVector(up, -panSpeed * delta);

    if (move.lengthSq() > 0) {
      camera.position.add(move);
      if (controlsRef.current) {
        controlsRef.current.target.add(move);
        controlsRef.current.update();
      }
    }
  });

  return null;
};

// Home Component
const Home: NextPage = () => {
  const controlsRef = useRef<any>(null);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "black",
      }}
    >
      <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
        <OrbitControls ref={controlsRef} />
        <KeyboardControls controlsRef={controlsRef} />
        <ErrorBoundary>
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <RotatingSun rotationSpeed={0.2} />
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.5} orbitDistance={8}>
            <Mercury />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.4} orbitDistance={12}>
            <Venus />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.3} orbitDistance={18}>
            <group position={[0,2,0]}>
              <Earth />
            </group>
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.2} orbitDistance={25}>
            <Mars />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.1} orbitDistance={34} Linkforopen="https://drive.google.com/file/d/18OW9TKWUkQKdsj52suIrKz43tfO2LtQA/view">
            <Jupiter />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.08} orbitDistance={48} Linkforopen="https://github.com/hellspit">
            <group rotation={[0,100,50]}>
            <Saturn />
          </group>
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.06} orbitDistance={58}>
            <Uranus />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.05} orbitDistance={64}>
            <Neptune />
          </RotatingPlanet>

          <Stars />
          <Preload all />
        </ErrorBoundary>
      </Canvas>
    </div>
  );
};

export default Home;




