import React, { useEffect, useRef, useState } from 'react';

interface SkillsCardProps {
  onClose: () => void;
}

interface SkillNode {
  label: string;
  x: number;
  y: number;
}

interface Cluster {
  name: string;
  color: string;
  labelPos: [number, number];
  nodes: SkillNode[];
  edges: [number, number][];
  hubNode: number; // index of the node that links back to the central star
}

// Add or move skills here — the constellation renders from this data
const CLUSTERS: Cluster[] = [
  {
    name: 'Languages',
    color: '#00f7ff',
    labelPos: [60, 52],
    nodes: [
      { label: 'Python', x: 130, y: 100 },
      { label: 'C++', x: 60, y: 165 },
      { label: 'TypeScript', x: 205, y: 150 },
      { label: 'JavaScript', x: 130, y: 218 },
      { label: 'C', x: 62, y: 248 },
    ],
    edges: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]],
    hubNode: 2,
  },
  {
    name: 'Web & 3D',
    color: '#ffaa00',
    labelPos: [468, 52],
    nodes: [
      { label: 'Next.js', x: 460, y: 95 },
      { label: 'React', x: 565, y: 132 },
      { label: 'Three.js', x: 415, y: 168 },
      { label: 'FastAPI', x: 512, y: 192 },
      { label: 'Express.js', x: 578, y: 232 },
    ],
    edges: [[0, 1], [0, 2], [2, 3], [1, 3], [3, 4]],
    hubNode: 2,
  },
  {
    name: 'AI & ML',
    color: '#ff6b6b',
    labelPos: [60, 352],
    nodes: [
      { label: 'TensorFlow', x: 115, y: 378 },
      { label: 'LangChain', x: 205, y: 402 },
      { label: 'Scikit-Learn', x: 70, y: 438 },
      { label: 'Multi-Agent AI', x: 145, y: 470 },
      { label: 'RAG', x: 225, y: 502 },
    ],
    edges: [[0, 1], [0, 2], [2, 3], [1, 3], [3, 4]],
    hubNode: 1,
  },
  {
    name: 'Cloud & Tools',
    color: '#00ffaa',
    labelPos: [468, 352],
    nodes: [
      { label: 'AWS', x: 470, y: 380 },
      { label: 'Docker', x: 560, y: 405 },
      { label: 'PostgreSQL', x: 432, y: 445 },
      { label: 'MongoDB', x: 522, y: 470 },
      { label: 'Git', x: 585, y: 505 },
    ],
    edges: [[0, 1], [0, 2], [2, 3], [1, 3], [3, 4]],
    hubNode: 0,
  },
];

const HUB: [number, number] = [320, 280];

// Decorative background stars
const BACKGROUND_STARS: [number, number][] = [
  [25, 35], [280, 30], [360, 60], [610, 40], [600, 280], [20, 300],
  [315, 160], [325, 400], [80, 540], [340, 540], [590, 545], [250, 290],
  [400, 285], [150, 305], [490, 290], [35, 400], [615, 420], [270, 460],
  [220, 70], [520, 25], [640, 150], [10, 130], [370, 350], [255, 210],
  [390, 210], [175, 155], [465, 155], [560, 330], [90, 330], [320, 90],
];

const SkillsCard: React.FC<SkillsCardProps> = ({ onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.opacity = '1';
      cardRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      setTimeout(() => setShowContent(true), 300);
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="flash-message"
      style={{
        width: 'min(92vw, 720px)',
        minWidth: '0',
        maxWidth: '720px',
        maxHeight: '88vh',
        overflowY: 'auto',
        padding: '24px',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(0, 255, 255, 0.3) rgba(0, 0, 0, 0.1)',
        opacity: '0',
        transform: 'translate(-50%, -50%) scale(0.8)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transformOrigin: 'center',
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 5, 15, 0.9) 100%)',
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

          .skill-star {
            animation: twinkle 3s ease-in-out infinite;
          }

          @keyframes twinkle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.45; }
          }

          .skill-node .skill-dot {
            transition: r 0.25s ease;
          }

          .skill-node:hover .skill-dot {
            r: 7;
          }

          .skill-node .skill-halo {
            transition: opacity 0.25s ease;
          }

          .skill-node:hover .skill-halo {
            opacity: 0.4;
          }

          .skill-node text {
            transition: fill 0.25s ease;
          }

          .skill-node:hover text {
            fill: #ffffff;
          }

          .hub-star {
            animation: hubGlow 2.5s ease-in-out infinite;
          }

          @keyframes hubGlow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.65; }
          }

          .hub-ring {
            animation: hubSpin 14s linear infinite;
            transform-origin: ${HUB[0]}px ${HUB[1]}px;
          }

          @keyframes hubSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @media (max-width: 768px) {
            .flash-message {
              padding: 15px;
            }
          }
        `}
      </style>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        opacity: showContent ? 1 : 0,
        transition: 'opacity 0.6s ease-out'
      }}>
        <h2 style={{
          fontSize: '26px',
          color: '#00f7ff',
          textAlign: 'center',
          marginBottom: '2px',
          textShadow: '0 0 10px rgba(0, 247, 255, 0.8)',
          fontWeight: '600',
          letterSpacing: '2px'
        }}>
          Skills Constellation
        </h2>

        <svg
          viewBox="0 0 640 560"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img"
          aria-label="Constellation map of technical skills"
        >
          <defs>
            <filter id="starGlow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="hubGlowFilter" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background stars */}
          {BACKGROUND_STARS.map(([x, y], i) => (
            <circle
              key={`bg-${i}`}
              cx={x}
              cy={y}
              r={i % 3 === 0 ? 1.4 : 1}
              fill="#ffffff"
              opacity={0.35}
              className="skill-star"
              style={{ animationDelay: `${(i % 7) * 0.45}s` }}
            />
          ))}

          {/* Lines from the hub star to each constellation */}
          {CLUSTERS.map((cluster) => {
            const node = cluster.nodes[cluster.hubNode];
            return (
              <line
                key={`hub-${cluster.name}`}
                x1={HUB[0]}
                y1={HUB[1]}
                x2={node.x}
                y2={node.y}
                stroke="rgba(0, 247, 255, 0.2)"
                strokeWidth={1.2}
                strokeDasharray="4 5"
              />
            );
          })}

          {/* Constellations */}
          {CLUSTERS.map((cluster, ci) => (
            <g key={cluster.name}>
              {cluster.edges.map(([a, b], ei) => (
                <line
                  key={`edge-${ei}`}
                  x1={cluster.nodes[a].x}
                  y1={cluster.nodes[a].y}
                  x2={cluster.nodes[b].x}
                  y2={cluster.nodes[b].y}
                  stroke={cluster.color}
                  strokeOpacity={0.35}
                  strokeWidth={1.2}
                />
              ))}
              {cluster.nodes.map((node, ni) => (
                <g key={node.label} className="skill-node">
                  <circle
                    className="skill-halo"
                    cx={node.x}
                    cy={node.y}
                    r={11}
                    fill={cluster.color}
                    opacity={0.14}
                  />
                  <circle
                    className="skill-dot skill-star"
                    cx={node.x}
                    cy={node.y}
                    r={4}
                    fill={cluster.color}
                    filter="url(#starGlow)"
                    style={{ animationDelay: `${(ci * 5 + ni) * 0.3}s` }}
                  />
                  <text
                    x={node.x}
                    y={node.y + 20}
                    textAnchor="middle"
                    fill="#e5e7eb"
                    fontSize={13}
                    style={{ fontFamily: 'inherit' }}
                  >
                    {node.label}
                  </text>
                </g>
              ))}
              <text
                x={cluster.labelPos[0]}
                y={cluster.labelPos[1]}
                fill={cluster.color}
                fontSize={14}
                fontWeight={700}
                letterSpacing={2}
                opacity={0.95}
                filter="url(#starGlow)"
              >
                {cluster.name.toUpperCase()}
              </text>
            </g>
          ))}

          {/* Central hub star */}
          <circle
            className="hub-ring"
            cx={HUB[0]}
            cy={HUB[1]}
            r={22}
            fill="none"
            stroke="rgba(0, 247, 255, 0.35)"
            strokeWidth={1}
            strokeDasharray="6 8"
          />
          <circle cx={HUB[0]} cy={HUB[1]} r={14} fill="#00f7ff" opacity={0.12} />
          <path
            className="hub-star"
            d={`M ${HUB[0]} ${HUB[1] - 11}
                L ${HUB[0] + 3} ${HUB[1] - 3}
                L ${HUB[0] + 11} ${HUB[1]}
                L ${HUB[0] + 3} ${HUB[1] + 3}
                L ${HUB[0]} ${HUB[1] + 11}
                L ${HUB[0] - 3} ${HUB[1] + 3}
                L ${HUB[0] - 11} ${HUB[1]}
                L ${HUB[0] - 3} ${HUB[1] - 3}
                Z`}
            fill="#ffffff"
            filter="url(#hubGlowFilter)"
          />
        </svg>

        <p style={{
          color: '#e5e7eb',
          fontSize: '13px',
          textAlign: 'center',
          opacity: 0.6,
          margin: 0
        }}>
          Every constellation orbits the same star.
        </p>
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

export default SkillsCard;
