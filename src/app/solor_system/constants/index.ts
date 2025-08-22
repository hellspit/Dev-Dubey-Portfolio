import { TutorialCard } from '../types';

// Planet configuration
export const PLANET_CONFIG = {
  MERCURY: { rotationSpeed: 1, revolutionSpeed: 0.5, orbitDistance: 8 },
  VENUS: { rotationSpeed: -1, revolutionSpeed: 0.4, orbitDistance: 12 },
  EARTH: { rotationSpeed: 1, revolutionSpeed: 0.3, orbitDistance: 18 },
  MARS: { rotationSpeed: 1, revolutionSpeed: 0.2, orbitDistance: 25 },
  JUPITER: { rotationSpeed: 1, revolutionSpeed: 0.1, orbitDistance: 34 },
  SATURN: { rotationSpeed: 1, revolutionSpeed: 0.08, orbitDistance: 48 },
  URANUS: { rotationSpeed: -1, revolutionSpeed: 0.06, orbitDistance: 58 },
  NEPTUNE: { rotationSpeed: 1, revolutionSpeed: 0.05, orbitDistance: 64 },
  SUN: { rotationSpeed: 0.2 }
};

// Planet links
export const PLANET_LINKS = {
  MARS: "https://www.linkedin.com/in/anuj-dubey-dev/",
  JUPITER: "https://drive.google.com/file/d/1_wih6P07tn87BzcKl53o5uQ11Fw1tDWq/view",
  SATURN: "https://github.com/hellspit",
  URANUS: "mailto:anuj.dubey.dev@gmail.com"
};

// Camera settings
export const CAMERA_CONFIG = {
  INITIAL_POSITION: [0, 10, 20] as [number, number, number],
  FOV: 60,
  PAN_SPEED: 5
};

// Shooting stars configuration
export const SHOOTING_STARS_CONFIG = {
  COUNT: 10,
  SPEED: 30,
  VERTICAL_SPEED: 20,
  RESET_THRESHOLD: -50
};

// Tutorial content - moved to separate file to avoid JSX in constants
export const TUTORIAL_CARDS: TutorialCard[] = [];
