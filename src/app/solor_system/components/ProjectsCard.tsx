import React, { useEffect, useRef, useState } from 'react';

interface ProjectsCardProps {
  onClose: () => void;
}

interface Project {
  title: string;
  description: string;
  link?: string;
}

// Add new projects here — they will render automatically
const PROJECTS: Project[] = [
  {
    title: 'EEG Epilepsy Prediction',
    description:
      'Deep-learning models (LSTM, ANN, LRU) predicting epilepsy risk from EEG signals with 97% accuracy, served through a Flask web app.',
    link: 'https://github.com/hellspit/Anomaly-Detection-in-EEG-Signals-for-Epilepsy-prediction',
  },
  {
    title: '3D House Exploration Website',
    description:
      'Interactive Three.js experience rendering GLTF house models at a smooth 60 fps with optimized asset pipelines and routing.',
    link: 'https://github.com/hellspit/Sunny1619.github.io',
  },
  {
    title: 'Quantum Circuit Simulator',
    description:
      'Full-stack quantum circuit simulator supporting 10 qubits, with drag-and-drop gates and real-time 3D Bloch sphere visualization built on Next.js, FastAPI, and NumPy.',
    link: 'https://github.com/hellspit/Quantum-Gate-Simulator',
  },
];

const TYPING_SPEED_MS = 30;

const ProjectsCard: React.FC<ProjectsCardProps> = ({ onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [typedTexts, setTypedTexts] = useState<string[]>(PROJECTS.map(() => ''));
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.opacity = '1';
      cardRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      setTimeout(() => setShowContent(true), 500);
    }
  }, []);

  // Type each project's description in sequence, like the Mercury card
  useEffect(() => {
    if (!showContent || activeIndex >= PROJECTS.length) return;

    const fullText = PROJECTS[activeIndex].description;
    if (typedTexts[activeIndex].length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedTexts((prev) =>
          prev.map((text, i) => (i === activeIndex ? fullText.slice(0, text.length + 1) : text))
        );
      }, TYPING_SPEED_MS);
      return () => clearTimeout(timeout);
    }
    setActiveIndex((prev) => prev + 1);
  }, [showContent, typedTexts, activeIndex]);

  const isSectionVisible = (index: number) => showContent && index <= activeIndex;
  const isTypingDone = (index: number) => typedTexts[index].length === PROJECTS[index].description.length;

  return (
    <div
      ref={cardRef}
      className="flash-message"
      style={{
        minWidth: '350px',
        maxWidth: '400px',
        maxHeight: '80vh',
        overflowY: 'auto',
        padding: '20px',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(0, 255, 255, 0.3) rgba(0, 0, 0, 0.1)',
        opacity: '0',
        transform: 'translate(-50%, -50%) scale(0.8)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transformOrigin: 'center',
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid transparent',
        boxShadow: `
          0 0 20px rgba(0, 255, 255, 0.2),
          0 0 40px rgba(0, 255, 255, 0.1),
          inset 0 0 20px rgba(0, 255, 255, 0.1)
        `,
        animation: 'pulse 2s infinite',
        zIndex: 1000
      }}
    >
      <style>
        {`
          .flash-message {
            position: relative;
          }

          .flash-message::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 16px;
            padding: 1px;
            background: linear-gradient(135deg,
              rgba(0, 255, 255, 0.5) 0%,
              rgba(0, 255, 255, 0.2) 50%,
              rgba(0, 255, 255, 0.5) 100%
            );
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
          }

          .flash-message::-webkit-scrollbar {
            width: 4px;
          }

          .flash-message::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 2px;
          }

          .flash-message::-webkit-scrollbar-thumb {
            background: rgba(0, 255, 255, 0.3);
            border-radius: 2px;
          }

          .flash-message::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 255, 255, 0.5);
          }

          @keyframes pulse {
            0% {
              box-shadow:
                0 0 20px rgba(0, 255, 255, 0.2),
                0 0 40px rgba(0, 255, 255, 0.1),
                inset 0 0 20px rgba(0, 255, 255, 0.1);
            }
            50% {
              box-shadow:
                0 0 30px rgba(0, 255, 255, 0.3),
                0 0 60px rgba(0, 255, 255, 0.2),
                inset 0 0 30px rgba(0, 255, 255, 0.2);
            }
            100% {
              box-shadow:
                0 0 20px rgba(0, 255, 255, 0.2),
                0 0 40px rgba(0, 255, 255, 0.1),
                inset 0 0 20px rgba(0, 255, 255, 0.1);
            }
          }

          .certificate-section {
            position: relative;
            overflow: hidden;
          }

          .certificate-section::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 12px;
            padding: 1px;
            background: linear-gradient(135deg,
              rgba(0, 255, 255, 0.3) 0%,
              rgba(0, 255, 255, 0.1) 50%,
              rgba(0, 255, 255, 0.3) 100%
            );
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
          }

          .typing-cursor {
            display: inline-block;
            width: 2px;
            height: 1em;
            background-color: #00ffff;
            margin-left: 2px;
            animation: blink 1s infinite;
          }

          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }

          @media (max-width: 768px) {
            .flash-message {
              min-width: 90vw;
              max-width: 90vw;
              padding: 15px;
            }
          }
        `}
      </style>
      <div className="flash-message-content" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h2 style={{
          fontSize: '24px',
          color: '#00f7ff',
          textAlign: 'center',
          marginBottom: '20px',
          textShadow: '0 0 10px rgba(0, 247, 255, 0.8)',
          opacity: 1,
          fontWeight: '600',
          letterSpacing: '1px'
        }}>
          Projects
        </h2>

        {PROJECTS.map((project, index) => (
          <div key={project.title} className="certificate-section" style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(0, 255, 255, 0.02) 100%)',
            borderRadius: '12px',
            padding: '15px',
            opacity: isSectionVisible(index) ? 1 : 0,
            transform: isSectionVisible(index) ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-out'
          }}>
            <h3 style={{
              color: '#00ffff',
              fontSize: '18px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ color: '#00ffff' }}>●</span>
              {project.title}
            </h3>
            <p style={{
              color: '#ffffff',
              fontSize: '14px',
              lineHeight: '1.5',
              marginBottom: '10px',
              minHeight: '3em'
            }}>
              {typedTexts[index]}
              {isSectionVisible(index) && !isTypingDone(index) && <span className="typing-cursor" />}
            </p>
            {project.link && (
              <a
                href={project.link}
                target='blank'
                style={{
                  color: '#00f7ff',
                  textDecoration: 'none',
                  fontSize: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  opacity: isTypingDone(index) ? 1 : 0,
                  transform: isTypingDone(index) ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.3s ease',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  background: 'rgba(0, 247, 255, 0.1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 247, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.textShadow = '0 0 10px rgba(0, 247, 255, 0.8)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 247, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                View Project →
              </a>
            )}
          </div>
        ))}
      </div>
      <button
        className="close-button"
        onClick={onClose}
        style={{
          width: '30px',
          height: '30px',
          fontSize: '20px',
          top: '10px',
          right: '10px',
          position: 'absolute',
          background: 'rgba(0, 255, 255, 0.1)',
          border: '1px solid #00ffff',
          color: '#00ffff',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          zIndex: 1001
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(0, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'rotate(90deg)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(0, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'rotate(0deg)';
        }}
      >
        ×
      </button>
    </div>
  );
};

export default ProjectsCard;
