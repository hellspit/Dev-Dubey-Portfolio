"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Stars,
  OrbitControls,
  Preload,
  Html,
  Line,
  Trail,
} from "@react-three/drei";
import './style.css';
import React, { useRef, useMemo, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import FlashMessage from './components/FlashMessage';
import MercuryCard from './components/MercuryCard';
import TutorialFlashcard from './components/TutorialFlashcard';

// Type declarations for dynamic imports
interface PlanetProps {
  onClick?: () => void;
}

// Error boundary component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return (
    <React.Suspense fallback={<Html center><div style={{ color: "white" }}>Loading...</div></Html>}>
      {children}
    </React.Suspense>
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
    <div className="fixed-bottom-left">
      <button
        onClick={recenterCamera}
        className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700"
        style={{ border: "none", cursor: "pointer", fontSize: "20px" }}
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

  const handleMenuToggle = () => {
    const newShowMenu = !showMenu;
    setShowMenu(newShowMenu);
    if (newShowMenu) {
      onNavClose();
    } else {
      onNavShow();
    }
  };

  return (
    <div className="fixed-bottom-left-80">
      {!showMenu && (
        <button
          onClick={handleMenuToggle}
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
        <div className="fixed-bottom-16-left-20 info-menu-container">
          {/* <style> blocks removed, now in style.css */}
          <div className="info-menu-content">
            <button
              onClick={handleMenuToggle}
              className="close-button"
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "transparent",
                border: "1px solid rgba(0, 247, 255, 0.4)",
                color: "#00f7ff",
                fontSize: "20px",
                width: "28px",
                height: "28px",
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
            <div className="flex items-center mb-4 info-menu-content-header">
              <div className="w-2 h-2 bg-[#00f7ff] rounded-full mr-2 animate-pulse"></div>
              <h3 className="info-menu-content-title">Space Explorer's Guide</h3>
            </div>

            <div className="space-y-4">
              <div className="menu-section menu-section-style">
                <h4 style={{ color: "#00f7ff", fontSize: "0.95rem", fontWeight: 500, marginBottom: "8px" }}>Mission Overview</h4>
                <p style={{ color: "#e5e7eb", lineHeight: "1.5", fontSize: "0.85rem" }}>
                  Welcome to my interactive solar system portfolio! Each celestial body represents a different aspect of my professional journey.
                  use headphones for better experience.
                </p>
              </div>

              <div className="menu-section menu-section-style">
                <h4 style={{ color: "#00f7ff", fontSize: "0.95rem", fontWeight: 500, marginBottom: "8px" }}>Navigation Points</h4>
                <div className="space-y-2">
                  <div className="menu-item menu-item-style">
                    <span style={{ color: "#00f7ff" }}>●</span>
                    <span style={{ color: "#e5e7eb" }}>Mercury - Certificates</span>
                  </div>
                  <div className="menu-item menu-item-style">
                    <span style={{ color: "#00aaff" }}>●</span>
                    <span style={{ color: "#e5e7eb" }}>Earth - Personal info</span>
                  </div>
                  <div className="menu-item menu-item-style">
                    <span style={{ color: "#ff4444" }}>●</span>
                    <span style={{ color: "#e5e7eb" }}>Mars - LinkedIn</span>
                  </div>
                  <div className="menu-item menu-item-style">
                    <span style={{ color: "#ffaa00" }}>●</span>
                    <span style={{ color: "#e5e7eb" }}>Jupiter - Resume</span>
                  </div>
                  <div className="menu-item menu-item-style">
                    <span style={{ color: "#ff8800" }}>●</span>
                    <span style={{ color: "#e5e7eb" }}>Saturn - GitHub Profile</span>
                  </div>
                  <div className="menu-item menu-item-style">
                    <span style={{ color: "#00ffaa" }}>●</span>
                    <span style={{ color: "#e5e7eb" }}>Uranus - Contact</span>
                  </div>
                </div>
              </div>

              <div className="menu-section menu-section-style">
                <h4 style={{ color: "#00f7ff", fontSize: "0.95rem", fontWeight: 500, marginBottom: "8px" }}>Mission Control</h4>
                <div className="space-y-2">
                  <p style={{ color: "#e5e7eb", fontSize: "0.85rem", marginBottom: "6px" }}>
                    Click on any planet to explore more about my professional journey.
                  </p>
                  <div style={{ color: "#00f7ff", fontWeight: 500, marginBottom: "6px", fontSize: "0.9rem" }}>
                    Navigation Controls:
                  </div>
                  <ul style={{ color: "#e5e7eb", fontSize: "0.85rem" }}>
                    <li className="menu-item menu-item-style-sm">
                      <span style={{ color: "#00f7ff", marginRight: "8px" }}>W A S D</span>
                      - Move camera
                    </li>
                    <li className="menu-item menu-item-style-sm">
                      <span style={{ color: "#00f7ff", marginRight: "8px" }}>Q/E</span>
                      - Move up/down
                    </li>
                    <li className="menu-item menu-item-style-sm">
                      <span style={{ color: "#00f7ff", marginRight: "8px" }}>Mouse Scroll</span>
                      - Zoom in/out
                    </li>
                    <li className="menu-item menu-item-style-sm">
                      <span style={{ color: "#00f7ff", marginRight: "8px" }}>Left Click + Drag</span>
                      - Rotate view
                    </li>
                  </ul>
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
      <div className="floating-label">{text}</div>
    </Html>
  );
};

// Rotating Planet Component
interface RotatingPlanetProps {
  children: React.ReactNode;
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
    <div className="fixed-top-left">
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
      {/* <style> blocks removed, now in style.css */}
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
          <span style={{ color: "#00f7ff" }}>●</span>
          <span>Mercury - Certificates</span>
        </div>
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
      </div>
    </div>
  );
};

// Home Component
const Home = () => {
  const controlsRef = useRef<any>(null);
  const [camera, setCamera] = useState<THREE.Camera | null>(null);
  const [showFlashMessage, setShowFlashMessage] = useState(false);
  const [showMercuryCard, setShowMercuryCard] = useState(false);
  const [showNavGuide, setShowNavGuide] = useState(true);
  // Tutorial state
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  // Tutorial content
  const tutorialCards = [
    {
      title: "👋 Welcome!",
      content: (
        <div style={{ textAlign: "center" }}>
          <h3 style={{ color: "#00f7ff", fontSize: "1.8rem", fontWeight: "700", margin: "0 0 16px 0", textShadow: "0 2px 12px #00f7ff22" }}>
            <span style={{ background: "linear-gradient(45deg, #00f7ff, #ff6b6b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", textShadow: "none" }}>Anuj Dubey</span> welcomes you to his space portfolio
          </h3>
        </div>
      ),
    },
    {
      title: "🚀 Welcome to My Space Portfolio!",
      content: (
        <div>
          <p style={{ color: "#e5e7eb", lineHeight: "1.7", fontSize: "1.05rem", marginBottom: "12px" }}>
            Welcome to my interactive solar system portfolio! Each planet represents a different aspect of my professional journey and skills.
          </p>
          <div style={{ background: "rgba(0, 247, 255, 0.1)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(0, 247, 255, 0.2)", marginBottom: "12px" }}>
            <p style={{ color: "#00f7ff", fontSize: "0.95rem", fontWeight: "600", margin: "0 0 8px 0" }}>🎧 Pro Tip:</p>
            <p style={{ color: "#e5e7eb", fontSize: "0.95rem", margin: "0", lineHeight: "1.5" }}>
              Use headphones for the best experience! The background music and interactive elements create an immersive space exploration feel.
            </p>
          </div>
          <p style={{ color: "#e5e7eb", lineHeight: "1.6", fontSize: "1rem" }}>
            Navigate through the solar system to discover my certifications, experience, projects, and contact information. Each celestial body holds unique insights about my professional journey.
          </p>
        </div>
      ),
    },
    {
      title: "🌍 Navigation Points & Destinations",
      content: (
        <div>
          <p style={{ color: "#e5e7eb", lineHeight: "1.6", fontSize: "1rem", marginBottom: "16px" }}>
            Each planet represents a key aspect of my professional profile. Click on any planet to explore:
          </p>
          <div style={{ display: "grid", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", borderRadius: "6px", background: "rgba(0, 247, 255, 0.05)" }}>
              <span style={{ color: "#00f7ff", fontSize: "1.2rem" }}>⚫</span>
              <div>
                <span style={{ color: "#00f7ff", fontWeight: "600" }}>Mercury</span>
                <span style={{ color: "#e5e7eb", fontSize: "0.9rem", display: "block" }}>Certificates & Achievements</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", borderRadius: "6px", background: "rgba(0, 170, 255, 0.05)" }}>
              <span style={{ color: "#00aaff", fontSize: "1.2rem" }}>🌍</span>
              <div>
                <span style={{ color: "#00aaff", fontWeight: "600" }}>Earth</span>
                <span style={{ color: "#e5e7eb", fontSize: "0.9rem", display: "block" }}>Personal Information & About Me</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", borderRadius: "6px", background: "rgba(255, 68, 68, 0.05)" }}>
              <span style={{ color: "#ff4444", fontSize: "1.2rem" }}>🔴</span>
              <div>
                <span style={{ color: "#ff4444", fontWeight: "600" }}>Mars</span>
                <span style={{ color: "#e5e7eb", fontSize: "0.9rem", display: "block" }}>LinkedIn Profile & Network</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", borderRadius: "6px", background: "rgba(255, 170, 0, 0.05)" }}>
              <span style={{ color: "#ffaa00", fontSize: "1.2rem" }}>🟠</span>
              <div>
                <span style={{ color: "#ffaa00", fontWeight: "600" }}>Jupiter</span>
                <span style={{ color: "#e5e7eb", fontSize: "0.9rem", display: "block" }}>Resume & Professional Experience</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", borderRadius: "6px", background: "rgba(255, 136, 0, 0.05)" }}>
              <span style={{ color: "#ff8800", fontSize: "1.2rem" }}>🪐</span>
              <div>
                <span style={{ color: "#ff8800", fontWeight: "600" }}>Saturn</span>
                <span style={{ color: "#e5e7eb", fontSize: "0.9rem", display: "block" }}>GitHub Profile & Code Projects</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", borderRadius: "6px", background: "rgba(0, 255, 170, 0.05)" }}>
              <span style={{ color: "#00ffaa", fontSize: "1.2rem" }}>🔵</span>
              <div>
                <span style={{ color: "#00ffaa", fontWeight: "600" }}>Uranus</span>
                <span style={{ color: "#e5e7eb", fontSize: "0.9rem", display: "block" }}>Contact Information & Email</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "🎮 Mission Control & Navigation",
      content: (
        <div>
          <p style={{ color: "#e5e7eb", lineHeight: "1.6", fontSize: "1rem", marginBottom: "16px" }}>
            Master the controls to navigate through my solar system portfolio with ease:
          </p>
          
          <div style={{ background: "rgba(0, 247, 255, 0.1)", padding: "16px", borderRadius: "10px", border: "1px solid rgba(0, 247, 255, 0.2)", marginBottom: "16px" }}>
            <h5 style={{ color: "#00f7ff", fontSize: "1rem", fontWeight: "600", margin: "0 0 12px 0" }}>🎯 Primary Controls:</h5>
            <div style={{ display: "grid", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#e5e7eb", fontSize: "0.95rem" }}>Mouse Scroll</span>
                <span style={{ color: "#00f7ff", fontWeight: "600", fontSize: "0.9rem" }}>Zoom In/Out</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#e5e7eb", fontSize: "0.95rem" }}>Left Click + Drag</span>
                <span style={{ color: "#00f7ff", fontWeight: "600", fontSize: "0.9rem" }}>Rotate View</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#e5e7eb", fontSize: "0.95rem" }}>Click the planets to see</span>
                <span style={{ color: "#00f7ff", fontWeight: "600", fontSize: "0.9rem" }}>Open Links/Info</span>
              </div>
            </div>
          </div>

          <div style={{ background: "rgba(255, 170, 0, 0.1)", padding: "16px", borderRadius: "10px", border: "1px solid rgba(255, 170, 0, 0.2)" }}>
            <h5 style={{ color: "#ffaa00", fontSize: "1rem", fontWeight: "600", margin: "0 0 12px 0" }}>⌨️ Advanced Navigation:</h5>
            <div style={{ display: "grid", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#e5e7eb", fontSize: "0.95rem" }}>W A S D Keys</span>
                <span style={{ color: "#ffaa00", fontWeight: "600", fontSize: "0.9rem" }}>Move Camera</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#e5e7eb", fontSize: "0.95rem" }}>Q / E Keys</span>
                <span style={{ color: "#ffaa00", fontWeight: "600", fontSize: "0.9rem" }}>Move Up/Down</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "16px", padding: "12px", background: "rgba(0, 255, 170, 0.1)", borderRadius: "8px", border: "1px solid rgba(0, 255, 170, 0.2)" }}>
            <p style={{ color: "#00ffaa", fontSize: "0.95rem", margin: "0", fontWeight: "600" }}>
              💡 Tip: Use the ! button (bottom left) to see the info about website!
            </p>
          </div>
        </div>
      ),
    },
  ];

  // Show tutorial only on first visit
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const completed = localStorage.getItem('tutorialCompleted');
      if (!completed) {
        // Add a small delay to ensure 3D scene is loaded
        const timer = setTimeout(() => {
          setShowTutorial(true);
        }, 1500); // 1.5 second delay
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleTutorialNext = () => {
    if (tutorialStep < tutorialCards.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      localStorage.setItem('tutorialCompleted', 'true');
      setShowTutorial(false);
    }
  };

  const handleTutorialSkip = () => {
    localStorage.setItem('tutorialCompleted', 'true');
    setShowTutorial(false);
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
      {showTutorial && (
        <TutorialFlashcard
          title={tutorialCards[tutorialStep].title}
          content={tutorialCards[tutorialStep].content}
          onNext={handleTutorialNext}
          onSkip={handleTutorialSkip}
          isLast={tutorialStep === tutorialCards.length - 1}
        />
      )}
      {!showTutorial && <BackgroundMusic />}
      {!showTutorial && showNavGuide && <NavigationGuide onClose={() => setShowNavGuide(false)} />}
      <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
        <OrbitControls ref={controlsRef} />
        <KeyboardControls controlsRef={controlsRef} />
        <ErrorBoundary>
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <ShootingStars />

          <RotatingSun rotationSpeed={0.2} />
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.5} orbitDistance={8} planetName="Mercury">
            <Mercury onClick={() => {
              setShowMercuryCard(true);
              setShowNavGuide(false);
            }} />
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
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.1} orbitDistance={34} planetName="Jupiter" Linkforopen="https://drive.google.com/file/d/1_wih6P07tn87BzcKl53o5uQ11Fw1tDWq/view">
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
      {!showTutorial && camera && <RecenterButton camera={camera} />}
      {!showTutorial && <InfoButton onNavClose={() => setShowNavGuide(false)} onNavShow={() => setShowNavGuide(true)} />}
      {!showTutorial && showFlashMessage && (
        <FlashMessage onClose={() => {
          setShowFlashMessage(false);
          setShowNavGuide(true);
        }} />
      )}
      {!showTutorial && showMercuryCard && (
        <MercuryCard onClose={() => {
          setShowMercuryCard(false);
          setShowNavGuide(true);
        }} />
      )}
    </div>
  );
};

export default Home;



