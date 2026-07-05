"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls, Preload } from "@react-three/drei";
import './style.css';
import React, { useRef, useState } from "react";
import dynamic from 'next/dynamic';
import * as THREE from "three";

// Import components
import FlashMessage from './components/FlashMessage';
import MercuryCard from './components/MercuryCard';
import ProjectsCard from './components/ProjectsCard';
import ExperienceCard from './components/ExperienceCard';
import SkillsCard from './components/SkillsCard';
import CameraFlyTo, { CameraFocus } from './components/CameraFlyTo';
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
  const [showProjectsCard, setShowProjectsCard] = useState(false);
  const [showExperienceCard, setShowExperienceCard] = useState(false);
  const [showSkillsCard, setShowSkillsCard] = useState(false);
  const [showNavGuide, setShowNavGuide] = useState(true);
  const planetRefs = useRef<Record<string, THREE.Group | null>>({});
  const [cameraFocus, setCameraFocus] = useState<CameraFocus | null>(null);

  // Fly the camera to a planet, lock onto it, then run onArrive (e.g. open its card)
  const flyToPlanet = (planetName: string, distance: number, onArrive: () => void) => {
    setShowNavGuide(false);
    setCameraFocus({
      getTarget: () => {
        const group = planetRefs.current[planetName];
        return group ? group.getWorldPosition(new THREE.Vector3()) : null;
      },
      distance,
      onArrive,
    });
  };

  // Close a card and fly the camera back to its default position
  const closeCard = (hideCard: () => void) => {
    hideCard();
    setCameraFocus(null);
    setShowNavGuide(true);
  };

  const focusSun = () => {
    setShowNavGuide(false);
    setCameraFocus({
      getTarget: () => new THREE.Vector3(0, 0, 0),
      distance: 14,
      onArrive: () => setShowSkillsCard(true),
    });
  };

  // Navigation Points panel: fly to card planets, open links directly
  const handleNavigate = (planetName: string) => {
    switch (planetName) {
      case 'Sun':
        focusSun();
        break;
      case 'Mercury':
        flyToPlanet('Mercury', 4, () => setShowMercuryCard(true));
        break;
      case 'Venus':
        flyToPlanet('Venus', 4, () => setShowProjectsCard(true));
        break;
      case 'Earth':
        flyToPlanet('Earth', 4, () => setShowFlashMessage(true));
        break;
      case 'Neptune':
        flyToPlanet('Neptune', 5, () => setShowExperienceCard(true));
        break;
      case 'Mars':
        window.open(PLANET_LINKS.MARS, '_blank');
        break;
      case 'Jupiter':
        window.open(PLANET_LINKS.JUPITER, '_blank');
        break;
      case 'Saturn':
        window.open(PLANET_LINKS.SATURN, '_blank');
        break;
      case 'Uranus':
        window.open(PLANET_LINKS.URANUS, '_blank');
        break;
    }
  };
  
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
        <NavigationGuide
          onClose={() => setShowNavGuide(false)}
          onNavigate={handleNavigate}
        />
      )}

      {/* 3D Canvas */}
      <Canvas camera={{ position: CAMERA_CONFIG.INITIAL_POSITION, fov: CAMERA_CONFIG.FOV }}>
        <OrbitControls ref={controlsRef} />
        <KeyboardControls controlsRef={controlsRef} />
        <CameraFlyTo
          focus={cameraFocus}
          controlsRef={controlsRef}
          homePosition={CAMERA_CONFIG.INITIAL_POSITION}
        />
        

          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <ShootingStars />

          {/* Sun */}
          <RotatingSun
            rotationSpeed={PLANET_CONFIG.SUN.rotationSpeed}
            onClick={focusSun}
          />

          {/* Planets */}
          <RotatingPlanet 
            rotationSpeed={PLANET_CONFIG.MERCURY.rotationSpeed}
            revolutionSpeed={PLANET_CONFIG.MERCURY.revolutionSpeed}
            orbitDistance={PLANET_CONFIG.MERCURY.orbitDistance}
            planetName="Mercury"
            registerRef={(group) => { planetRefs.current['Mercury'] = group; }}
          >
            <Mercury onClick={() => flyToPlanet('Mercury', 4, () => setShowMercuryCard(true))} />
          </RotatingPlanet>

          <RotatingPlanet 
            rotationSpeed={PLANET_CONFIG.VENUS.rotationSpeed}
            revolutionSpeed={PLANET_CONFIG.VENUS.revolutionSpeed}
            orbitDistance={PLANET_CONFIG.VENUS.orbitDistance}
            planetName="Venus"
            registerRef={(group) => { planetRefs.current['Venus'] = group; }}
          >
            <Venus onClick={() => flyToPlanet('Venus', 4, () => setShowProjectsCard(true))} />
          </RotatingPlanet>

          <RotatingPlanet 
            rotationSpeed={PLANET_CONFIG.EARTH.rotationSpeed}
            revolutionSpeed={PLANET_CONFIG.EARTH.revolutionSpeed}
            orbitDistance={PLANET_CONFIG.EARTH.orbitDistance}
            planetName="Earth"
            registerRef={(group) => { planetRefs.current['Earth'] = group; }}
          >
            <Earth onClick={() => flyToPlanet('Earth', 4, () => setShowFlashMessage(true))} />
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
            registerRef={(group) => { planetRefs.current['Neptune'] = group; }}
          >
            <Neptune onClick={() => flyToPlanet('Neptune', 5, () => setShowExperienceCard(true))} />
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
        <FlashMessage onClose={() => closeCard(() => setShowFlashMessage(false))} />
      )}

      {!showTutorial && showMercuryCard && (
        <MercuryCard onClose={() => closeCard(() => setShowMercuryCard(false))} />
      )}

      {!showTutorial && showProjectsCard && (
        <ProjectsCard onClose={() => closeCard(() => setShowProjectsCard(false))} />
      )}

      {!showTutorial && showExperienceCard && (
        <ExperienceCard onClose={() => closeCard(() => setShowExperienceCard(false))} />
      )}

      {!showTutorial && showSkillsCard && (
        <SkillsCard onClose={() => closeCard(() => setShowSkillsCard(false))} />
      )}
    </div>
  );
};

export default Home;



