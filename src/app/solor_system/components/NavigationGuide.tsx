import React from 'react';
import { NavigationGuideProps } from '../types';

const NavigationGuide: React.FC<NavigationGuideProps> = ({ onClose }) => {
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
        <div className="nav-item">
          <span style={{ color: "#00f7ff" }}>●</span>
          <span>Mercury - Certificates</span>
        </div>
        <div className="nav-item">
          <span style={{ color: "#00aaff" }}>●</span>
          <span>Earth - Personal info</span>
        </div>
        <div className="nav-item">
          <span style={{ color: "#ff4444" }}>●</span>
          <span>Mars - LinkedIn</span>
        </div>
        <div className="nav-item">
          <span style={{ color: "#ffaa00" }}>●</span>
          <span>Jupiter - Resume</span>
        </div>
        <div className="nav-item">
          <span style={{ color: "#ff8800" }}>●</span>
          <span>Saturn - GitHub</span>
        </div>
        <div className="nav-item">
          <span style={{ color: "#00ffaa" }}>●</span>
          <span>Uranus - Contact</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationGuide;
