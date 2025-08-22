"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls, Preload } from "@react-three/drei";
import './style.css';
import React, { useRef, useState } from "react";
import dynamic from 'next/dynamic';

// Import components
import FlashMessage from './components/FlashMessage';
import MercuryCard from './components/MercuryCard';
import TutorialFlashcard from './components/TutorialFlashcard';

import RecenterButton from './components/RecenterButton';
import InfoButton from './components/InfoButton';
import RotatingSun from './components/RotatingSun';
import RotatingPlanet from './components/RotatingPlanet';
import KeyboardControls from './components/KeyboardControls';
import ShootingStars from './components/ShootingStars';
import BackgroundMusic from './components/BackgroundMusic';
import NavigationGuide from './components/NavigationGuide';

// Import types, constants, and hooks
import { PlanetProps } from './types';
import { PLANET_CONFIG, PLANET_LINKS, CAMERA_CONFIG } from './constants';
import { TUTORIAL_CARDS } from './data/tutorialData';
import { useTutorial } from './hooks/useTutorial';

// Dynamic imports for planet components
const Sun = dynamic<PlanetProps>(() => import("./components/sun"), { 
  ssr: false
});
const Mercury = dynamic<PlanetProps>(() => import("./components/mercury"), { 
  ssr: false
});
const Venus = dynamic<PlanetProps>(() => import("./components/venus"), { 
  ssr: false
});
const Earth = dynamic<PlanetProps>(() => import("./components/earth"), { 
  ssr: false
});
const Mars = dynamic<PlanetProps>(() => import("./components/mars"), { 
  ssr: false
});
const Jupiter = dynamic<PlanetProps>(() => import("./components/jupiter"), { 
  ssr: false
});
const Saturn = dynamic<PlanetProps>(() => import("./components/saturn"), { 
  ssr: false
});
const Uranus = dynamic<PlanetProps>(() => import("./components/uranus"), { 
  ssr: false
});
const Neptune = dynamic<PlanetProps>(() => import("./components/neptune"), { 
  ssr: false
});

// Main Home Component
const Home = () => {
  const controlsRef = useRef<any>(null);
  const [showFlashMessage, setShowFlashMessage] = useState(false);
  const [showMercuryCard, setShowMercuryCard] = useState(false);
  const [showNavGuide, setShowNavGuide] = useState(true);
  
  // Use custom tutorial hook
  const { showTutorial, tutorialStep, handleTutorialNext, handleTutorialSkip } = useTutorial();

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
      {/* Tutorial Overlay */}
      {showTutorial && (
        <TutorialFlashcard
          title={TUTORIAL_CARDS[tutorialStep].title}
          content={TUTORIAL_CARDS[tutorialStep].content}
          onNext={handleTutorialNext}
          onSkip={handleTutorialSkip}
          isLast={tutorialStep === TUTORIAL_CARDS.length - 1}
        />
      )}

      {/* Background Music */}
      <BackgroundMusic />

      {/* Navigation Guide */}
      {!showTutorial && showNavGuide && (
        <NavigationGuide onClose={() => setShowNavGuide(false)} />
      )}

      {/* 3D Canvas */}
      <Canvas camera={{ position: CAMERA_CONFIG.INITIAL_POSITION, fov: CAMERA_CONFIG.FOV }}>
        <OrbitControls ref={controlsRef} />
        <KeyboardControls controlsRef={controlsRef} />
        

          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <ShootingStars />

          {/* Sun */}
          <RotatingSun rotationSpeed={PLANET_CONFIG.SUN.rotationSpeed} />

          {/* Planets */}
          <RotatingPlanet 
            rotationSpeed={PLANET_CONFIG.MERCURY.rotationSpeed}
            revolutionSpeed={PLANET_CONFIG.MERCURY.revolutionSpeed}
            orbitDistance={PLANET_CONFIG.MERCURY.orbitDistance}
            planetName="Mercury"
          >
            <Mercury onClick={() => {
              setShowMercuryCard(true);
              setShowNavGuide(false);
            }} />
          </RotatingPlanet>

          <RotatingPlanet 
            rotationSpeed={PLANET_CONFIG.VENUS.rotationSpeed}
            revolutionSpeed={PLANET_CONFIG.VENUS.revolutionSpeed}
            orbitDistance={PLANET_CONFIG.VENUS.orbitDistance}
            planetName="Venus"
          >
            <Venus />
          </RotatingPlanet>

          <RotatingPlanet 
            rotationSpeed={PLANET_CONFIG.EARTH.rotationSpeed}
            revolutionSpeed={PLANET_CONFIG.EARTH.revolutionSpeed}
            orbitDistance={PLANET_CONFIG.EARTH.orbitDistance}
            planetName="Earth"
          >
            <Earth onClick={() => {
              setShowFlashMessage(true);
              setShowNavGuide(false);
            }} />
          </RotatingPlanet>

          <RotatingPlanet 
            rotationSpeed={PLANET_CONFIG.MARS.rotationSpeed}
            revolutionSpeed={PLANET_CONFIG.MARS.revolutionSpeed}
            orbitDistance={PLANET_CONFIG.MARS.orbitDistance}
            planetName="Mars"
            Linkforopen={PLANET_LINKS.MARS}
          >
            <Mars />
          </RotatingPlanet>

          <RotatingPlanet 
            rotationSpeed={PLANET_CONFIG.JUPITER.rotationSpeed}
            revolutionSpeed={PLANET_CONFIG.JUPITER.revolutionSpeed}
            orbitDistance={PLANET_CONFIG.JUPITER.orbitDistance}
            planetName="Jupiter"
            Linkforopen={PLANET_LINKS.JUPITER}
          >
            <Jupiter />
          </RotatingPlanet>

          <RotatingPlanet 
            rotationSpeed={PLANET_CONFIG.SATURN.rotationSpeed}
            revolutionSpeed={PLANET_CONFIG.SATURN.revolutionSpeed}
            orbitDistance={PLANET_CONFIG.SATURN.orbitDistance}
            planetName="Saturn"
            Linkforopen={PLANET_LINKS.SATURN}
          >
            <group rotation={[0, 100, 50]}>
              <Saturn />
            </group>
          </RotatingPlanet>

          <RotatingPlanet 
            rotationSpeed={PLANET_CONFIG.URANUS.rotationSpeed}
            revolutionSpeed={PLANET_CONFIG.URANUS.revolutionSpeed}
            orbitDistance={PLANET_CONFIG.URANUS.orbitDistance}
            planetName="Uranus"
            Linkforopen={PLANET_LINKS.URANUS}
          >
            <Uranus />
          </RotatingPlanet>

          <RotatingPlanet 
            rotationSpeed={PLANET_CONFIG.NEPTUNE.rotationSpeed}
            revolutionSpeed={PLANET_CONFIG.NEPTUNE.revolutionSpeed}
            orbitDistance={PLANET_CONFIG.NEPTUNE.orbitDistance}
            planetName="Neptune"
          >
            <Neptune />
          </RotatingPlanet>

                  <Stars />
        <Preload all />
      </Canvas>

      {/* UI Components */}
      {!showTutorial && <RecenterButton />}

      {/* UI Components */}
      {!showTutorial && (
        <InfoButton 
          onNavClose={() => setShowNavGuide(false)} 
          onNavShow={() => setShowNavGuide(true)} 
        />
      )}
      
      {/* Modal Components */}
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



