import React from 'react';
import { RecenterButtonProps } from '../types';

const RecenterButton: React.FC<RecenterButtonProps> = () => {
  const recenterCamera = () => {
    // This will be handled by the parent component
    // For now, we'll use a simple approach
    window.location.reload();
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      zIndex: 1000
    }}>
      <button
        onClick={recenterCamera}
        className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700"
        style={{ border: "none", cursor: "pointer", fontSize: "20px" }}
      >
        ⟳
      </button>
    </div>
  );
};

export default RecenterButton;
