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
          <div className="info-section">
            <h3>Education</h3>
            <p className="college-name">Indian Institute of Information Technology Kalyani</p>
            <p className="year">Pre Final Year</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashMessage; 