import React, { useEffect, useRef, useState } from 'react';

interface MercuryCardProps {
  onClose: () => void;
}

const MercuryCard: React.FC<MercuryCardProps> = ({ onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);
  
  // States for each certification's typing animation
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [typedText3, setTypedText3] = useState('');
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [currentIndex3, setCurrentIndex3] = useState(0);

  const fullText1 = "Specialized in creating interactive 3D web experiences with advanced rendering and camera controls.";
  const fullText2 = "Mastered integrating React with Three.js for building high-performance 3D user interfaces and interactive scenes.";
  const fullText3 = "Gained expertise in creating AI models for text and image generation.";

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.opacity = '1';
      cardRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      setTimeout(() => setShowContent(true), 500);
    }
  }, []);

  // First certification typing effect
  useEffect(() => {
    if (showContent && currentIndex1 < fullText1.length) {
      const timeout = setTimeout(() => {
        setTypedText1(prev => prev + fullText1[currentIndex1]);
        setCurrentIndex1(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [showContent, currentIndex1, fullText1]);

  // Second certification typing effect (starts after first is complete)
  useEffect(() => {
    if (currentIndex1 === fullText1.length && currentIndex2 < fullText2.length) {
      const timeout = setTimeout(() => {
        setTypedText2(prev => prev + fullText2[currentIndex2]);
        setCurrentIndex2(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex1, currentIndex2, fullText2]);

  // Third certification typing effect (starts after second is complete)
  useEffect(() => {
    if (currentIndex2 === fullText2.length && currentIndex3 < fullText3.length) {
      const timeout = setTimeout(() => {
        setTypedText3(prev => prev + fullText3[currentIndex3]);
        setCurrentIndex3(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex2, currentIndex3, fullText3]);

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
          Certifications
        </h2>
        
        <div className="certificate-section" style={{
          background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(0, 255, 255, 0.02) 100%)',
          borderRadius: '12px',
          
          padding: '15px',
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
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
            Three.js Certificate
          </h3>
          <p style={{ 
            color: '#ffffff',
            fontSize: '14px',
            lineHeight: '1.5',
            marginBottom: '10px',
            minHeight: '3em'
          }}>
            {typedText1}
            {currentIndex1 < fullText1.length && <span className="typing-cursor" />}
          </p>
          <a 
            href="https://udemy-certificate.s3.amazonaws.com/image/UC-00d27c4c-a25f-483d-8d08-0bfa17186413.jpg" 
            target='blank'
            style={{
              color: '#00f7ff',
              textDecoration: 'none',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              opacity: currentIndex1 === fullText1.length ? 1 : 0,
              transform: currentIndex1 === fullText1.length ? 'translateY(0)' : 'translateY(10px)',
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
            View Certificate →
          </a>
        </div>

        <div className="certificate-section" style={{
          background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(0, 255, 255, 0.02) 100%)',
          borderRadius: '12px',
          padding: '15px',
          opacity: currentIndex1 === fullText1.length ? 1 : 0,
          transform: currentIndex1 === fullText1.length ? 'translateY(0)' : 'translateY(20px)',
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
            React Three Fiber Certificate
          </h3>
          <p style={{ 
            color: '#ffffff',
            fontSize: '14px',
            lineHeight: '1.5',
            marginBottom: '10px',
            minHeight: '3em'
          }}>
            {typedText2}
            {currentIndex2 < fullText2.length && <span className="typing-cursor" />}
          </p>
          <a 
            href="https://udemy-certificate.s3.amazonaws.com/pdf/UC-80a9ae96-ff72-48ee-a3f3-f744255911e2.pdf" 
            target='blank'
            style={{
              color: '#00f7ff',
              textDecoration: 'none',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              opacity: currentIndex2 === fullText2.length ? 1 : 0,
              transform: currentIndex2 === fullText2.length ? 'translateY(0)' : 'translateY(10px)',
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
            View Certificate →
          </a>
        </div>

        <div className="certificate-section" style={{
          background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(0, 255, 255, 0.02) 100%)',
          borderRadius: '12px',
          padding: '15px',
          opacity: currentIndex2 === fullText2.length ? 1 : 0,
          transform: currentIndex2 === fullText2.length ? 'translateY(0)' : 'translateY(20px)',
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
            Generative AI Certificate
          </h3>
          <p style={{ 
            color: '#ffffff',
            fontSize: '14px',
            lineHeight: '1.5',
            marginBottom: '10px',
            minHeight: '3em'
          }}>
            {typedText3}
            {currentIndex3 < fullText3.length && <span className="typing-cursor" />}
          </p>
          <a 
            href="https://udemy-certificate.s3.amazonaws.com/pdf/UC-6453eb69-fb09-4d1f-aada-86d91b9df4d6.pdf" 
            target='blank'
            style={{
              color: '#00f7ff',
              textDecoration: 'none',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              opacity: currentIndex3 === fullText3.length ? 1 : 0,
              transform: currentIndex3 === fullText3.length ? 'translateY(0)' : 'translateY(10px)',
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
            View Certificate →
          </a>
        </div>
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

export default MercuryCard; 