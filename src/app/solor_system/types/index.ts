import * as THREE from "three";

// Planet component props
export interface PlanetProps {
  onClick?: () => void;
}

// Error boundary props
export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

// Recenter button props - camera now comes from useThree hook
export interface RecenterButtonProps {
  // No props needed - camera comes from Three.js context
}

// Info button props
export interface InfoButtonProps {
  onNavClose: () => void;
  onNavShow: () => void;
}

// Floating label props
export interface FloatingLabelProps {
  text: string;
  position: [number, number, number];
}

// Rotating planet props
export interface RotatingPlanetProps {
  children: React.ReactNode;
  rotationSpeed: number;
  revolutionSpeed: number;
  orbitDistance: number;
  Linkforopen?: string;
  planetName: string;
  onClick?: () => void;
}

// Orbit props
export interface OrbitProps {
  radius: number;
  segments?: number;
  color?: string;
}

// Rotating sun props
export interface RotatingSunProps {
  rotationSpeed: number;
}

// Keyboard controls props
export interface KeyboardControlsProps {
  controlsRef: React.RefObject<any>;
}

// Shooting star props
export interface ShootingStarProps {
  startPosition: THREE.Vector3;
}

// Navigation guide props
export interface NavigationGuideProps {
  onClose: () => void;
}

// Tutorial card interface
export interface TutorialCard {
  title: string;
  content: React.ReactNode;
}
