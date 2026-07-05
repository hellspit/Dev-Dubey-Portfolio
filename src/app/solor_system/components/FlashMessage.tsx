import React, { useState } from 'react';


interface FlashMessageProps {
  onClose: () => void;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div 
      className={`flash-message ${isClosing ? 'animate-spaceDisappear' : ''}`}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 99999,
        pointerEvents: 'auto',
      }}
    >
      <button 
        className="close-button" 
        onClick={handleClose} 
        aria-label="Close"
        disabled={isClosing}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 100000,
        }}
      />
      <div className="flash-message-content">
        <div className="flash-message-left">
          <img src="/me.jpeg" alt="Anuj Dubey" />
        </div>
        <div className="flash-message-right">
          <h2>Anuj Dubey</h2>
          <p style={{
            color: '#00f7ff',
            fontSize: '15px',
            fontWeight: 600,
            margin: '0 0 12px 0',
            letterSpacing: '0.5px'
          }}>
            SDE 1 @ Ixana
          </p>
          <p style={{
            color: '#e5e7eb',
            fontSize: '14px',
            lineHeight: '1.6',
            margin: '0 0 4px 0'
          }}>
            I build multi-agent AI systems and full-stack web experiences — from
            quantum circuit simulators to interactive 3D worlds like this one.
          </p>
          <div className="info-section">
            <h3>Education</h3>
            <p className="college-name">Indian Institute of Information Technology Kalyani</p>
            <p className="year">B.Tech, Class of 2026</p>
          </div>
          <div className="info-section">
            <h3>Skills</h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginTop: '8px'
            }}>
              {['Python', 'TypeScript', 'Next.js', 'React', 'FastAPI', 'Three.js', 'TensorFlow', 'AWS', 'Docker', 'LangChain'].map((skill) => (
                <span key={skill} style={{
                  color: '#00f7ff',
                  fontSize: '12px',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  background: 'rgba(0, 247, 255, 0.1)',
                  border: '1px solid rgba(0, 247, 255, 0.25)'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashMessage; 