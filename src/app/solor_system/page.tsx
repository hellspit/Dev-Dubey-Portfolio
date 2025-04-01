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

// Type declarations for dynamic imports
interface PlanetProps {
  onClick?: () => void;
}

// Error boundary component
interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return (
    <Suspense fallback={<Html center><div style={{ color: "white" }}>Loading...</div></Html>}>
      {children}
    </Suspense>
  );
};

// Dynamic imports with proper typing
const Sun = dynamic<PlanetProps>(() => import("./components/sun"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Sun...</div></Html>
});
const Mercury = dynamic<PlanetProps>(() => import("./components/mercury"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Mercury...</div></Html>
});
const Venus = dynamic<PlanetProps>(() => import("./components/venus"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Venus...</div></Html>
});
const Earth = dynamic<PlanetProps>(() => import("./components/earth"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Earth...</div></Html>
});
const Mars = dynamic<PlanetProps>(() => import("./components/mars"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Mars...</div></Html>
});
const Jupiter = dynamic<PlanetProps>(() => import("./components/jupiter"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Jupiter...</div></Html>
});
const Saturn = dynamic<PlanetProps>(() => import("./components/saturn"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Saturn...</div></Html>
});
const Uranus = dynamic<PlanetProps>(() => import("./components/uranus"), { 
  ssr: false,
  loading: () => <Html center><div style={{ color: "white" }}>Loading Uranus...</div></Html>
});
const Neptune = dynamic<PlanetProps>(() => import("./components/neptune"), { 
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
interface RecenterButtonProps {
  camera: THREE.Camera;
}

const RecenterButton: React.FC<RecenterButtonProps> = ({ camera }) => {
  const recenterCamera = () => {
    camera.position.set(0, 10, 20); 
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
};

// Info Button Component
interface InfoButtonProps {
  onNavClose: () => void;
  onNavShow: () => void;
}

function InfoButton({ onNavClose, onNavShow }: InfoButtonProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(!showMenu);
    onNavClose();
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
    onNavShow();
  };

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
          onClick={handleClick}
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
            onClick={handleCloseMenu}
            className="close-button"
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "transparent",
              border: "1px solid rgba(0, 247, 255, 0.4)",
              color: "#00f7ff",
              fontSize: "18px",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 0 10px rgba(0, 247, 255, 0.2)",
              zIndex: 10,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "rotate(90deg) scale(1.1)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 247, 255, 0.4)";
              e.currentTarget.style.border = "1px solid rgba(0, 247, 255, 0.8)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "rotate(0deg) scale(1)";
              e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 247, 255, 0.2)";
              e.currentTarget.style.border = "1px solid rgba(0, 247, 255, 0.4)";
            }}
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
                    <span>Uranus - Contact menu</span>
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
interface FloatingLabelProps {
  text: string;
  position: [number, number, number];
}

const FloatingLabel: React.FC<FloatingLabelProps> = ({ text, position }) => {
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
  onClick?: () => void;
}

const RotatingPlanet: React.FC<RotatingPlanetProps> = ({
  children,
  rotationSpeed,
  revolutionSpeed,
  orbitDistance,
  Linkforopen,
  planetName,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const revolutionRef = useRef<THREE.Group>(null);
  const rotationRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (rotationRef.current) rotationRef.current.rotation.y += rotationSpeed * delta;
    if (revolutionRef.current) revolutionRef.current.rotation.y += revolutionSpeed * delta;
    
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
          onClick={onClick || linkopen}
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
interface ShootingStarProps {
  startPosition: THREE.Vector3;
}

const ShootingStar: React.FC<ShootingStarProps> = ({ startPosition }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.x -= delta * 30;
      meshRef.current.position.y -= delta * 20;
      
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

const ShootingStars: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 10 }).map(() => new THREE.Vector3(
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

// Add BackgroundMusic component
const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
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

// Navigation Guide Component
interface NavigationGuideProps {
  onClose: () => void;
}

const NavigationGuide: React.FC<NavigationGuideProps> = ({ onClose }) => {
  return (
    <div
      className="fixed top-4 left-4 z-50"
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        zIndex: 1000,
        background: "rgba(8, 12, 16, 0.95)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0, 247, 255, 0.8)",
        boxShadow: `
          0 0 20px rgba(0, 247, 255, 0.3),
          0 0 40px rgba(0, 247, 255, 0.2),
          0 0 60px rgba(0, 247, 255, 0.1),
          inset 0 0 30px rgba(0, 247, 255, 0.05),
          0 0 5px rgba(0, 247, 255, 1)
        `,
        borderRadius: "12px",
        padding: "12px",
        width: "240px",
        color: "#e5e7eb",
        animation: "fadeIn 0.5s ease-out"
      }}
    >
      <button
        onClick={onClose}
        className="close-button"
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "transparent",
          border: "1px solid rgba(0, 247, 255, 0.4)",
          color: "#00f7ff",
          fontSize: "18px",
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 0 10px rgba(0, 247, 255, 0.2)",
          zIndex: 10,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "rotate(90deg) scale(1.1)";
          e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 247, 255, 0.4)";
          e.currentTarget.style.border = "1px solid rgba(0, 247, 255, 0.8)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "rotate(0deg) scale(1)";
          e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 247, 255, 0.2)";
          e.currentTarget.style.border = "1px solid rgba(0, 247, 255, 0.4)";
        }}
      >
        ×
      </button>
      <style>
        {`
          .close-button:hover {
            text-shadow: 0 0 8px rgba(0, 247, 255, 0.8);
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes neonPulse {
            0% {
              box-shadow: 
                0 0 20px rgba(0, 247, 255, 0.3),
                0 0 40px rgba(0, 247, 255, 0.2),
                0 0 60px rgba(0, 247, 255, 0.1);
              border-color: rgba(0, 247, 255, 0.6);
            }
            50% {
              box-shadow: 
                0 0 25px rgba(0, 247, 255, 0.4),
                0 0 50px rgba(0, 247, 255, 0.3),
                0 0 75px rgba(0, 247, 255, 0.2);
              border-color: rgba(0, 247, 255, 0.8);
            }
            100% {
              box-shadow: 
                0 0 20px rgba(0, 247, 255, 0.3),
                0 0 40px rgba(0, 247, 255, 0.2),
                0 0 60px rgba(0, 247, 255, 0.1);
              border-color: rgba(0, 247, 255, 0.6);
            }
          }

          .nav-section {
            animation: neonPulse 3s infinite;
            background: rgba(0, 247, 255, 0.03) !important;
            border: 1px solid rgba(0, 247, 255, 0.3) !important;
            box-shadow: 
              0 0 15px rgba(0, 247, 255, 0.2),
              0 0 30px rgba(0, 247, 255, 0.1),
              inset 0 0 20px rgba(0, 247, 255, 0.05);
          }

          .nav-item {
            transition: all 0.2s ease;
            border: 1px solid transparent;
            padding: 4px 8px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.85rem;
            cursor: pointer;
          }

          .nav-item:hover {
            background: rgba(0, 247, 255, 0.08);
            border: 1px solid rgba(0, 247, 255, 0.4);
            transform: translateX(5px);
            box-shadow: 
              0 0 15px rgba(0, 247, 255, 0.2),
              0 0 30px rgba(0, 247, 255, 0.1);
          }
        `}
      </style>

      <div style={{
        borderBottom: "1px solid rgba(0, 247, 255, 0.2)",
        paddingBottom: "8px",
        marginBottom: "10px"
      }}>
        <h3 style={{
          color: "#00f7ff",
          fontSize: "1rem",
          fontWeight: "600",
          letterSpacing: "0.5px",
          textShadow: "0 0 10px rgba(0, 247, 255, 0.3)"
        }}>Navigation Points</h3>
      </div>

      <div className="nav-section">
        <div className="nav-item">
          <span style={{ color: "#00aaff" }}>●</span>
          <span>Earth - Personal info</span>
        </div>
        <div className="nav-item">
          <span style={{ color: "#ff4444" }}>●</span>
          <span>Mars - LinkedIn</span>
        </div>
        <div className="nav-item">
          <span style={{ color: "#ffaa00" }}>●</span>
          <span>Jupiter - Resume</span>
        </div>
        <div className="nav-item">
          <span style={{ color: "#ff8800" }}>●</span>
          <span>Saturn - GitHub</span>
        </div>
        <div className="nav-item">
          <span style={{ color: "#00ffaa" }}>●</span>
          <span>Uranus - Contact</span>
        </div>
        <div className="nav-item">
          <span style={{ color: "#00f7ff" }}>●</span>
          <span>i - More Info</span>
        </div>
      </div>
    </div>
  );
};

// Home Component
const Home: NextPage = () => {
  const controlsRef = useRef<any>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [camera, setCamera] = useState<THREE.Camera | null>(null);
  const [showFlashMessage, setShowFlashMessage] = useState(false);
  const [showNavGuide, setShowNavGuide] = useState(true);

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
      {showNavGuide && <NavigationGuide onClose={() => setShowNavGuide(false)} />}
      <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
        <OrbitControls ref={controlsRef} />
        <KeyboardControls controlsRef={controlsRef} />
        <ErrorBoundary>
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <ShootingStars />

          <RotatingSun rotationSpeed={0.2} />
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.5} orbitDistance={8} planetName="Mercury">
            <Mercury />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={-1} revolutionSpeed={0.4} orbitDistance={12} planetName="Venus">
            <Venus />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.3} orbitDistance={18} planetName="Earth">
            <Earth onClick={() => {
              setShowFlashMessage(true);
              setShowNavGuide(false);
            }} />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.2} orbitDistance={25} planetName="Mars" Linkforopen="https://www.linkedin.com/in/anuj-dubey-dev/">
            <Mars />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.1} orbitDistance={34} planetName="Jupiter" Linkforopen="https://drive.google.com/file/d/18OW9TKWUkQKdsj52suIrKz43tfO2LtQA/view">
            <Jupiter />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.08} orbitDistance={48} planetName="Saturn" Linkforopen="https://github.com/hellspit">
            <group rotation={[0,100,50]}>
              <Saturn />
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
      <InfoButton onNavClose={() => setShowNavGuide(false)} onNavShow={() => setShowNavGuide(true)} />
      {showFlashMessage && (
        <FlashMessage onClose={() => setShowFlashMessage(false)} />
      )}
    </div>
  );
};

export default Home;



