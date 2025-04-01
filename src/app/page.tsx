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
  Trail,
} from "@react-three/drei";
import React, { Suspense, useRef, ReactNode, useMemo, useEffect, useState } from "react";
import type { NextPage } from "next";
import dynamic from 'next/dynamic';
import FlashMessage from './components/FlashMessage';

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
function RecenterButton({ camera }: { camera: THREE.Camera }) {
  const recenterCamera = () => {
    camera.position.set(0, 10, 20); // Reset camera position
    camera.lookAt(0, 0, 0);
  };

  return (
    <div
      className="fixed bottom-4 left-4 z-50"
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 1000,
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
  );
}

// Info Button Component
function InfoButton() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="fixed bottom-4 left-20 z-50"
      style={{
        position: "fixed",
        bottom: "20px",
        left: "80px",
        zIndex: 1000,
      }}
    >
      {!showMenu && (
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700"
          style={{
            border: "2px solid #007bff",
            cursor: "pointer",
            fontSize: "16px",
            fontStyle: "italic",
            boxShadow: "0 0 15px rgba(0, 123, 255, 0.7)",
            outline: "none",
            padding: "0",
            width: "32px",
            height: "32px",
            borderRadius: "100%",
            overflow: "hidden",
            transition: "transform 0.3s ease",
          }}
        >
          i
        </button>
      )}

      {showMenu && (
        <div
          className="fixed bottom-16 left-20 bg-black bg-opacity-90 text-white rounded-lg info-menu-container"
          style={{
            position: "fixed",
            bottom: "16px",
            left: "20px",
            transform: "scale(0)",
            transformOrigin: "bottom left",
            animation: "menuAppear 0.3s ease forwards",
            maxWidth: "300px",
            width: "90vw",
          }}
        >
          <button
            onClick={() => setShowMenu(false)}
            className="absolute top-3 right-3 text-white hover:text-[#00f7ff] transition-colors info-menu-close-button"
            style={{
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(90deg)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(0deg)"}
          >
            ×
          </button>
          <div className="mt-4 info-menu-content">
            <div className="flex items-center mb-6">
              <div className="w-2 h-2 bg-[#00f7ff] rounded-full mr-2 animate-pulse"></div>
              <h3 className="text-xl font-bold text-white info-menu-title">Space Explorer's Guide</h3>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700 info-menu-section" style={{ padding: "24px" }}>
                <h4 className="text-white font-semibold mb-3 pl-4">Mission Overview</h4>
                <p className="text-sm text-white pl-4">
                  Welcome to my interactive solar system portfolio! Each celestial body represents a different aspect of my professional journey.
                  use headphones for better experience.
                </p>
              </div>
              
              <div className="bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700 info-menu-section" style={{ padding: "24px" }}>
                <h4 className="text-white font-semibold mb-3 pl-4">Navigation Points</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-white">
                    <span className="text-red-500 mr-2">●</span>
                    <span>Mars - LinkedIn</span>
                  </div>
                  <div className="flex items-center text-sm text-white">
                    <span className="text-yellow-500 mr-2">●</span>
                    <span>Jupiter - Resume</span>
                  </div>
                  <div className="flex items-center text-sm text-white">
                    <span className="text-orange-500 mr-2">●</span>
                    <span>Saturn - GitHub Profile</span>
                  </div>
                  <div className="flex items-center text-sm text-white">
                    <span className="text-yellow-500 mr-2">●</span>
                    <span>Earth - Personal info</span>
                  </div>
                  <div className="flex items-center text-sm text-white">
                    <span className="text-yellow-500 mr-2">●</span>
                    <span>Uranus - Contact <menu></menu></span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700 info-menu-section" style={{ padding: "24px" }}>
                <h4 className="text-white font-semibold mb-3 pl-4">Mission Control</h4>
                <div className="space-y-3 text-sm text-white pl-4">
                  <p>Click on any planet to explore more about my professional journey.</p>
                  <div className="mt-4">
                    <p className="text-[#00f7ff] font-medium mb-2">Navigation Controls:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li>W A S D - Move camera</li>
                      <li>Q/E - Move up/down</li>
                      <li>Mouse Scroll - Zoom in/out</li>
                      <li>Left Click + Drag - Rotate view</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Floating Label Component
const FloatingLabel: React.FC<{ text: string; position: [number, number, number] }> = ({ text, position }) => {
  return (
    <Html position={position} center>
      <div style={{
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '4px 8px',
        borderRadius: '4px',
        color: 'white',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        whiteSpace: 'nowrap',
        pointerEvents: 'none'
      }}>
        {text}
      </div>
    </Html>
  );
};

// Rotating Planet Component
interface RotatingPlanetProps {
  children: ReactNode;
  rotationSpeed: number;
  revolutionSpeed: number;
  orbitDistance: number;
  Linkforopen?: string;
  planetName: string;
}

const RotatingPlanet: React.FC<RotatingPlanetProps> = ({
  children,
  rotationSpeed,
  revolutionSpeed,
  orbitDistance,
  Linkforopen,
  planetName,
}) => {
  const [hovered, setHovered] = useState(false);
  const revolutionRef = useRef<THREE.Group>(null);
  const rotationRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (rotationRef.current) rotationRef.current.rotation.y += rotationSpeed * delta;
    if (revolutionRef.current) revolutionRef.current.rotation.y += revolutionSpeed * delta;
    
    // Smooth scale animation
    if (meshRef.current) {
      const targetScale = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const linkopen = () => {
    if (Linkforopen) {
      window.open(Linkforopen, "_blank");
    }
  }

  return (
    <group ref={revolutionRef}>
      <Orbit radius={orbitDistance} />
      <group ref={rotationRef} position={[orbitDistance, 0, 0]}>
        <mesh 
          ref={meshRef}
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)} 
          onClick={linkopen}
        >
          {children}
        </mesh>
        {hovered && <FloatingLabel text={planetName} position={[0, 2, 0]} />}
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

// Add these new components after your existing imports
const ShootingStar = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const startPosition = useMemo(() => new THREE.Vector3(
    Math.random() * 100 - 50,
    Math.random() * 50 + 20,
    Math.random() * 100 - 50
  ), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.x -= delta * 30;
      meshRef.current.position.y -= delta * 20;
      
      // Reset position when star goes off screen
      if (meshRef.current.position.x < -50) {
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

const ShootingStars = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <ShootingStar key={i} />
      ))}
    </>
  );
};

// Add BackgroundMusic component
const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3; // Set volume to 30%
      audioRef.current.play().catch(error => {
        console.log("Audio playback failed:", error);
      });
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/intro.mp3"
      preload="auto"
      style={{ display: 'none' }}
    />
  );
};

// Home Component
const Home: NextPage = () => {
  const controlsRef = useRef<any>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [camera, setCamera] = useState<THREE.Camera | null>(null);
  const [showFlashMessage, setShowFlashMessage] = useState(false);

  const handleNext = () => {
    setShowIntro(false);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "black",
        position: "relative",
      }}
    >
      <BackgroundMusic />
      <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
        <OrbitControls ref={controlsRef} />
        <KeyboardControls controlsRef={controlsRef} />
        <ErrorBoundary>
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          {/* Add new visual elements */}
          <ShootingStars />

          <RotatingSun rotationSpeed={0.2} />
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.5} orbitDistance={8} planetName="Mercury">
            <Mercury />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={-1} revolutionSpeed={0.4} orbitDistance={12} planetName="Venus">
            <Venus />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.3} orbitDistance={18} planetName="Earth">
            <group position={[0,0,0]} rotation={[0,0,0]}>
              <Earth onClick={() => setShowFlashMessage(true)} />
            </group>
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.2} orbitDistance={25} planetName="Mars" Linkforopen="https://www.linkedin.com/in/anuj-dubey-dev/">
            <Mars />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.1} orbitDistance={34} planetName="Jupiter" Linkforopen="https://drive.google.com/file/d/18OW9TKWUkQKdsj52suIrKz43tfO2LtQA/view">
            <Jupiter />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.08} orbitDistance={48} planetName="Saturn" Linkforopen="https://github.com/hellspit">
            <group rotation={[0,100,50]}>
              <Saturn />0
            </group>
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={-1} revolutionSpeed={0.06} orbitDistance={58} planetName="Uranus" Linkforopen="mailto:anuj.dubey.dev@gmail.com">
            <Uranus />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.05} orbitDistance={64} planetName="Neptune">
            <Neptune />
          </RotatingPlanet>

          <Stars />
          <Preload all />
        </ErrorBoundary>
      </Canvas>
      {camera && <RecenterButton camera={camera} />}
      <InfoButton />
      {showFlashMessage && (
        <FlashMessage onClose={() => setShowFlashMessage(false)} />
      )}
    </div>
  );
};

export default Home;



