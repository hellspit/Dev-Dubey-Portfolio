'use client';
import './style.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [showButton, setShowButton] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setShowButton(true);
          return 100;
        }
        return prev + 1;
      });
    }, 40); // 40ms * 100 = 4000ms (4 seconds)

    return () => clearInterval(progressInterval);
  }, []);

  const handleClick = () => {
    router.push('/solor_system');
  };

  return (
    <main className="min-h-screen w-full">
      <div className="loading-container">
        <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
          <div className="wheel"></div>
          <div className="hamster">
            <div className="hamster__body">
              <div className="hamster__head">
                <div className="hamster__ear"></div>
                <div className="hamster__eye"></div>
                <div className="hamster__nose"></div>
              </div>
              <div className="hamster__limb hamster__limb--fr"></div>
              <div className="hamster__limb hamster__limb--fl"></div>
              <div className="hamster__limb hamster__limb--br"></div>
              <div className="hamster__limb hamster__limb--bl"></div>
              <div className="hamster__tail"></div>
            </div>
          </div>
          <div className="spoke"></div>
        </div>
        {!showButton ? (
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-text">{progress}%</div>
          </div>
        ) : (
          <button 
            onClick={handleClick}
            className="enter-button"
          >
            We Are Ready!
          </button>
        )}
      </div>
    </main>
  );
}
