import React, { useState } from 'react';
import { InfoButtonProps } from '../types';

const InfoButton: React.FC<InfoButtonProps> = ({ onNavClose, onNavShow }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    const newShowMenu = !showMenu;
    setShowMenu(newShowMenu);
    if (newShowMenu) {
      onNavClose();
    } else {
      onNavShow();
    }
  };

  return (
    <div className="fixed-bottom-left-80">
      {!showMenu && (
        <button
          onClick={handleMenuToggle}
          className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700"
          style={{
            border: "2px solid #007bff",
            cursor: "pointer",
            fontSize: "16px",
            fontStyle: "italic",
            boxShadow: "0 0 15px rgba(0, 123, 255, 0.7)",
            outline: "none",
            padding: "0",
            width: "32px",
            height: "32px",
            borderRadius: "100%",
            overflow: "hidden",
            transition: "transform 0.3s ease",
          }}
        >
          i
        </button>
      )}

      {showMenu && (
        <div className="fixed-bottom-16-left-20 info-menu-container">
          <div className="info-menu-content">
            <button
              onClick={handleMenuToggle}
              className="close-button"
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "transparent",
                border: "1px solid rgba(0, 247, 255, 0.4)",
                color: "#00f7ff",
                fontSize: "20px",
                width: "28px",
                height: "28px",
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
            <div className="flex items-center mb-4 info-menu-content-header">
              <div className="w-2 h-2 bg-[#00f7ff] rounded-full mr-2 animate-pulse"></div>
              <h3 className="info-menu-content-title">Space Explorer's Guide</h3>
            </div>

            <div className="space-y-4">
              <div className="menu-section menu-section-style">
                <h4 style={{ color: "#00f7ff", fontSize: "0.95rem", fontWeight: 500, marginBottom: "8px" }}>Mission Overview</h4>
                <p style={{ color: "#e5e7eb", lineHeight: "1.5", fontSize: "0.85rem" }}>
                  Welcome to my interactive solar system portfolio! Each celestial body represents a different aspect of my professional journey.
                  use headphones for better experience.
                </p>
              </div>

              <div className="menu-section menu-section-style">
                <h4 style={{ color: "#00f7ff", fontSize: "0.95rem", fontWeight: 500, marginBottom: "8px" }}>Navigation Points</h4>
                <div className="space-y-2">
                  <div className="menu-item menu-item-style">
                    <span style={{ color: "#00f7ff" }}>●</span>
                    <span style={{ color: "#e5e7eb" }}>Mercury - Certificates</span>
                  </div>
                  <div className="menu-item menu-item-style">
                    <span style={{ color: "#00aaff" }}>●</span>
                    <span style={{ color: "#e5e7eb" }}>Earth - Personal info</span>
                  </div>
                  <div className="menu-item menu-item-style">
                    <span style={{ color: "#ff4444" }}>●</span>
                    <span style={{ color: "#e5e7eb" }}>Mars - LinkedIn</span>
                  </div>
                  <div className="menu-item menu-item-style">
                    <span style={{ color: "#ffaa00" }}>●</span>
                    <span style={{ color: "#e5e7eb" }}>Jupiter - Resume</span>
                  </div>
                  <div className="menu-item menu-item-style">
                    <span style={{ color: "#ff8800" }}>●</span>
                    <span style={{ color: "#e5e7eb" }}>Saturn - GitHub Profile</span>
                  </div>
                  <div className="menu-item menu-item-style">
                    <span style={{ color: "#00ffaa" }}>●</span>
                    <span style={{ color: "#e5e7eb" }}>Uranus - Contact</span>
                  </div>
                </div>
              </div>

              <div className="menu-section menu-section-style">
                <h4 style={{ color: "#00f7ff", fontSize: "0.95rem", fontWeight: 500, marginBottom: "8px" }}>Mission Control</h4>
                <div className="space-y-2">
                  <p style={{ color: "#e5e7eb", fontSize: "0.85rem", marginBottom: "6px" }}>
                    Click on any planet to explore more about my professional journey.
                  </p>
                  <div style={{ color: "#00f7ff", fontWeight: 500, marginBottom: "6px", fontSize: "0.9rem" }}>
                    Navigation Controls:
                  </div>
                  <ul style={{ color: "#e5e7eb", fontSize: "0.85rem" }}>
                    <li className="menu-item menu-item-style-sm">
                      <span style={{ color: "#00f7ff", marginRight: "8px" }}>W A S D</span>
                      - Move camera
                    </li>
                    <li className="menu-item menu-item-style-sm">
                      <span style={{ color: "#00f7ff", marginRight: "8px" }}>Q/E</span>
                      - Move up/down
                    </li>
                    <li className="menu-item menu-item-style-sm">
                      <span style={{ color: "#00f7ff", marginRight: "8px" }}>Mouse Scroll</span>
                      - Zoom in/out
                    </li>
                    <li className="menu-item menu-item-style-sm">
                      <span style={{ color: "#00f7ff", marginRight: "8px" }}>Left Click + Drag</span>
                      - Rotate view
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoButton;
