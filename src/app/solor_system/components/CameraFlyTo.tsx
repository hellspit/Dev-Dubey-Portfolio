import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export interface CameraFocus {
  // Returns the live world position of the destination each frame,
  // so the camera keeps tracking planets that are still revolving.
  getTarget: () => THREE.Vector3 | null;
  distance: number;
  onArrive: () => void;
}

interface CameraFlyToProps {
  focus: CameraFocus | null;
  controlsRef: React.RefObject<any>;
  homePosition: [number, number, number];
}

const ARRIVE_THRESHOLD = 0.8;
const MAX_FLIGHT_SECONDS = 3;
const HOME_TARGET = new THREE.Vector3(0, 0, 0);

// idle: user has control. fly: approaching a planet. follow: locked to the
// planet while its card is open. return: flying back home after close.
type Phase = 'idle' | 'fly' | 'follow' | 'return';

const CameraFlyTo: React.FC<CameraFlyToProps> = ({ focus, controlsRef, homePosition }) => {
  const { camera } = useThree();
  const phaseRef = useRef<Phase>('idle');
  const elapsedRef = useRef(0);
  const offsetRef = useRef(new THREE.Vector3());
  const focusRef = useRef<CameraFocus | null>(null);

  useEffect(() => {
    const previousFocus = focusRef.current;
    focusRef.current = focus;
    elapsedRef.current = 0;
    const controls = controlsRef.current;

    if (focus) {
      phaseRef.current = 'fly';
      if (controls) controls.enabled = false;
    } else if (previousFocus || phaseRef.current !== 'idle') {
      phaseRef.current = 'return';
      if (controls) controls.enabled = false;
    }
  }, [focus, controlsRef]);

  useFrame((_, delta) => {
    const phase = phaseRef.current;
    if (phase === 'idle') return;

    const controls = controlsRef.current;
    // Frame-rate independent smoothing
    const t = 1 - Math.pow(0.005, delta);

    if (phase === 'fly' || phase === 'follow') {
      const currentFocus = focusRef.current;
      const target = currentFocus ? currentFocus.getTarget() : null;
      if (!currentFocus || !target) {
        elapsedRef.current = 0;
        phaseRef.current = 'return';
        return;
      }

      if (phase === 'fly') {
        elapsedRef.current += delta;

        // Approach point: keep the current viewing direction, stop `distance` away
        const direction = camera.position.clone().sub(target).normalize();
        const desired = target.clone().add(direction.multiplyScalar(currentFocus.distance));
        camera.position.lerp(desired, t);
        if (controls) {
          controls.target.lerp(target, t);
          controls.update();
        }

        if (
          camera.position.distanceTo(desired) < ARRIVE_THRESHOLD ||
          elapsedRef.current > MAX_FLIGHT_SECONDS
        ) {
          // Lock on: remember the offset and ride along with the planet
          offsetRef.current.copy(camera.position).sub(target);
          phaseRef.current = 'follow';
          currentFocus.onArrive();
        }
      } else {
        // Locked: move rigidly with the planet as it revolves
        camera.position.copy(target).add(offsetRef.current);
        if (controls) {
          controls.target.copy(target);
          controls.update();
        }
      }
    } else if (phase === 'return') {
      elapsedRef.current += delta;

      const home = new THREE.Vector3(...homePosition);
      camera.position.lerp(home, t);
      if (controls) {
        controls.target.lerp(HOME_TARGET, t);
        controls.update();
      }

      if (
        camera.position.distanceTo(home) < ARRIVE_THRESHOLD ||
        elapsedRef.current > MAX_FLIGHT_SECONDS
      ) {
        phaseRef.current = 'idle';
        if (controls) controls.enabled = true;
      }
    }
  });

  return null;
};

export default CameraFlyTo;
