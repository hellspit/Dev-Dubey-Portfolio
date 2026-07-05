import React from 'react';
import { NavigationGuideProps } from '../types';

const NAV_ITEMS: { name: string; label: string; color: string }[] = [
  { name: 'Sun', label: 'Sun - Skills', color: '#ffdd44' },
  { name: 'Mercury', label: 'Mercury - Certificates', color: '#00f7ff' },
  { name: 'Venus', label: 'Venus - Projects', color: '#ffcc66' },
  { name: 'Earth', label: 'Earth - Personal info', color: '#00aaff' },
  { name: 'Mars', label: 'Mars - LinkedIn', color: '#ff4444' },
  { name: 'Jupiter', label: 'Jupiter - Resume', color: '#ffaa00' },
  { name: 'Saturn', label: 'Saturn - GitHub', color: '#ff8800' },
  { name: 'Uranus', label: 'Uranus - Contact', color: '#00ffaa' },
  { name: 'Neptune', label: 'Neptune - Experience', color: '#4477ff' },
];

const NavigationGuide: React.FC<NavigationGuideProps> = ({ onClose, onNavigate }) => {
  return (
    <div className="fixed-top-left">
      <button
        onClick={onClose}
        className="close-button"
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "transparent",
          border: "1px solid rgba(0, 247, 255, 0.4)",
          color: "#00f7ff",
          fontSize: "18px",
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 0 10px rgba(0, 247, 255, 0.2)",
          zIndex: 10,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "rotate(90deg) scale(1.1)";
          e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 247, 255, 0.4)";
          e.currentTarget.style.border = "1px solid rgba(0, 247, 255, 0.8)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "rotate(0deg) scale(1)";
          e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 247, 255, 0.2)";
          e.currentTarget.style.border = "1px solid rgba(0, 247, 255, 0.4)";
        }}
      >
        ×
      </button>
      <div style={{
        borderBottom: "1px solid rgba(0, 247, 255, 0.2)",
        paddingBottom: "8px",
        marginBottom: "10px"
      }}>
        <h3 style={{
          color: "#00f7ff",
          fontSize: "1rem",
          fontWeight: "600",
          letterSpacing: "0.5px",
          textShadow: "0 0 10px rgba(0, 247, 255, 0.3)"
        }}>Navigation Points</h3>
      </div>
      <div className="nav-section">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.name}
            className="nav-item"
            onClick={() => onNavigate?.(item.name)}
            style={{
              cursor: onNavigate ? 'pointer' : 'default',
              borderRadius: '6px',
              padding: '3px 6px',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(0, 247, 255, 0.12)';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span style={{ color: item.color }}>●</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationGuide;
