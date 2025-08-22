import React from 'react';
import { TutorialCard } from '../types';

export const TUTORIAL_CARDS: TutorialCard[] = [
  {
    title: "👋 Welcome!",
    content: (
      <div style={{ textAlign: "center" }}>
        <h3 style={{ color: "#00f7ff", fontSize: "1.8rem", fontWeight: "700", margin: "0 0 16px 0", textShadow: "0 2px 12px #00f7ff22" }}>
          <span style={{ background: "linear-gradient(45deg, #00f7ff, #ff6b6b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", textShadow: "none" }}>Anuj Dubey</span> welcomes you to his space portfolio
        </h3>
      </div>
    ),
  },
  {
    title: "🚀 Welcome to My Space Portfolio!",
    content: (
      <div>
        <p style={{ color: "#e5e7eb", lineHeight: "1.7", fontSize: "1.05rem", marginBottom: "12px" }}>
          Welcome to my interactive solar system portfolio! Each planet represents a different aspect of my professional journey and skills.
        </p>
        <div style={{ background: "rgba(0, 247, 255, 0.1)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(0, 247, 255, 0.2)", marginBottom: "12px" }}>
          <p style={{ color: "#00f7ff", fontSize: "0.95rem", fontWeight: "600", margin: "0 0 8px 0" }}>🎧 Pro Tip:</p>
          <p style={{ color: "#e5e7eb", fontSize: "0.95rem", margin: "0", lineHeight: "1.5" }}>
            Use headphones for the best experience! The background music and interactive elements create an immersive space exploration feel.
          </p>
        </div>
        <p style={{ color: "#e5e7eb", lineHeight: "1.6", fontSize: "1rem" }}>
          Navigate through the solar system to discover my certifications, experience, projects, and contact information. Each celestial body holds unique insights about my professional journey.
        </p>
      </div>
    ),
  },
  {
    title: "🌍 Navigation Points & Destinations",
    content: (
      <div>
        <p style={{ color: "#e5e7eb", lineHeight: "1.6", fontSize: "1rem", marginBottom: "16px" }}>
          Each planet represents a key aspect of my professional profile. Click on any planet to explore:
        </p>
        <div style={{ display: "grid", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", borderRadius: "6px", background: "rgba(0, 247, 255, 0.05)" }}>
            <span style={{ color: "#00f7ff", fontSize: "1.2rem" }}>⚫</span>
            <div>
              <span style={{ color: "#00f7ff", fontWeight: "600" }}>Mercury</span>
              <span style={{ color: "#e5e7eb", fontSize: "0.9rem", display: "block" }}>Certificates & Achievements</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", borderRadius: "6px", background: "rgba(0, 170, 255, 0.05)" }}>
            <span style={{ color: "#00aaff", fontSize: "1.2rem" }}>🌍</span>
            <div>
              <span style={{ color: "#00aaff", fontWeight: "600" }}>Earth</span>
              <span style={{ color: "#e5e7eb", fontSize: "0.9rem", display: "block" }}>Personal Information & About Me</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", borderRadius: "6px", background: "rgba(255, 68, 68, 0.05)" }}>
            <span style={{ color: "#ff4444", fontSize: "1.2rem" }}>🔴</span>
            <div>
              <span style={{ color: "#ff4444", fontWeight: "600" }}>Mars</span>
              <span style={{ color: "#e5e7eb", fontSize: "0.9rem", display: "block" }}>LinkedIn Profile & Network</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", borderRadius: "6px", background: "rgba(255, 170, 0, 0.05)" }}>
            <span style={{ color: "#ffaa00", fontSize: "1.2rem" }}>🟠</span>
            <div>
              <span style={{ color: "#ffaa00", fontWeight: "600" }}>Jupiter</span>
              <span style={{ color: "#e5e7eb", fontSize: "0.9rem", display: "block" }}>Resume & Professional Experience</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", borderRadius: "6px", background: "rgba(255, 136, 0, 0.05)" }}>
            <span style={{ color: "#ff8800", fontSize: "1.2rem" }}>🪐</span>
            <div>
              <span style={{ color: "#ff8800", fontWeight: "600" }}>Saturn</span>
              <span style={{ color: "#e5e7eb", fontSize: "0.9rem", display: "block" }}>GitHub Profile & Code Projects</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", borderRadius: "6px", background: "rgba(0, 255, 170, 0.05)" }}>
            <span style={{ color: "#00ffaa", fontSize: "1.2rem" }}>🔵</span>
            <div>
              <span style={{ color: "#00ffaa", fontWeight: "600" }}>Uranus</span>
              <span style={{ color: "#e5e7eb", fontSize: "0.9rem", display: "block" }}>Contact Information & Email</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "🎮 Mission Control & Navigation",
    content: (
      <div>
        <p style={{ color: "#e5e7eb", lineHeight: "1.6", fontSize: "1rem", marginBottom: "16px" }}>
          Master the controls to navigate through my solar system portfolio with ease:
        </p>
        
        <div style={{ background: "rgba(0, 247, 255, 0.1)", padding: "16px", borderRadius: "10px", border: "1px solid rgba(0, 247, 255, 0.2)", marginBottom: "16px" }}>
          <h5 style={{ color: "#00f7ff", fontSize: "1rem", fontWeight: "600", margin: "0 0 12px 0" }}>🎯 Primary Controls:</h5>
          <div style={{ display: "grid", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#e5e7eb", fontSize: "0.95rem" }}>Mouse Scroll</span>
              <span style={{ color: "#00f7ff", fontWeight: "600", fontSize: "0.9rem" }}>Zoom In/Out</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#e5e7eb", fontSize: "0.95rem" }}>Left Click + Drag</span>
              <span style={{ color: "#00f7ff", fontWeight: "600", fontSize: "0.9rem" }}>Rotate View</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#e5e7eb", fontSize: "0.95rem" }}>Click the planets to see</span>
              <span style={{ color: "#00f7ff", fontWeight: "600", fontSize: "0.9rem" }}>Open Links/Info</span>
            </div>
          </div>
        </div>

        <div style={{ background: "rgba(255, 170, 0, 0.1)", padding: "16px", borderRadius: "10px", border: "1px solid rgba(255, 170, 0, 0.2)" }}>
          <h5 style={{ color: "#ffaa00", fontSize: "1rem", fontWeight: "600", margin: "0 0 12px 0" }}>⌨️ Advanced Navigation:</h5>
          <div style={{ display: "grid", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#e5e7eb", fontSize: "0.95rem" }}>W A S D Keys</span>
              <span style={{ color: "#ffaa00", fontWeight: "600", fontSize: "0.9rem" }}>Move Camera</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#e5e7eb", fontSize: "0.95rem" }}>Q / E Keys</span>
              <span style={{ color: "#ffaa00", fontWeight: "600", fontSize: "0.9rem" }}>Move Up/Down</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "16px", padding: "12px", background: "rgba(0, 255, 170, 0.1)", borderRadius: "8px", border: "1px solid rgba(0, 255, 170, 0.2)" }}>
          <p style={{ color: "#00ffaa", fontSize: "0.95rem", margin: "0", fontWeight: "600" }}>
            💡 Tip: Use the ! button (bottom left) to see the info about website!
          </p>
        </div>
      </div>
    ),
  },
];
