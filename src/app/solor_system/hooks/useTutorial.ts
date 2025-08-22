import { useState, useEffect } from 'react';

export const useTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

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
    if (tutorialStep < 3) { // Assuming 4 tutorial cards (0-3)
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

  return {
    showTutorial,
    tutorialStep,
    handleTutorialNext,
    handleTutorialSkip
  };
};
