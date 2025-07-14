import React from 'react';

interface TutorialFlashcardProps {
  title: string;
  content: React.ReactNode;
  onNext: () => void;
  onSkip: () => void;
  isLast: boolean;
}

const TutorialFlashcard: React.FC<TutorialFlashcardProps> = ({ title, content, onNext, onSkip, isLast }) => {
  return (
    <div className="tutorial-overlay">
      <div className="tutorial-flashcard">
        <h4 className="tutorial-title">{title}</h4>
        <div className="tutorial-content">{content}</div>
        <div className="tutorial-actions">
          <button className="tutorial-skip-btn" onClick={onSkip}>Skip</button>
          <button className="tutorial-next-btn" onClick={onNext}>{isLast ? 'Finish' : 'Next'}</button>
        </div>
      </div>
      <style jsx>{`
        .tutorial-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10, 14, 24, 0.85);
          padding: 20px;
        }
        .tutorial-flashcard {
          background: #23283b;
          border-radius: 20px;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25), 0 1.5px 8px 0 #00f7ff33;
          border: 1.5px solid #2e3650;
          min-width: 340px;
          max-width: 92vw;
          width: 100%;
          padding: 36px 32px 28px 32px;
          color: #f3f6fa;
          position: relative;
          animation: tutorial-pop 0.45s cubic-bezier(.68,-0.55,.27,1.55);
          font-size: 1.05rem;
          letter-spacing: 0.01em;
        }
        @keyframes tutorial-pop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .tutorial-title {
          color: #00f7ff;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 16px;
          letter-spacing: 0.02em;
          text-shadow: 0 2px 12px #00f7ff22;
        }
        .tutorial-content {
          margin-bottom: 28px;
          color: #e5e7eb;
          line-height: 1.7;
          font-size: 1.05rem;
        }
        .tutorial-actions {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
        }
        .tutorial-next-btn, .tutorial-skip-btn {
          padding: 10px 26px;
          border-radius: 9px;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, box-shadow 0.18s;
          outline: none;
        }
        .tutorial-next-btn {
          background: linear-gradient(90deg, #00f7ff 0%, #00c7d7 100%);
          color: #23283b;
          border: none;
          box-shadow: 0 2px 8px #00f7ff33;
        }
        .tutorial-next-btn:hover {
          background: linear-gradient(90deg, #00c7d7 0%, #00f7ff 100%);
          color: #181c24;
        }
        .tutorial-skip-btn {
          background: #23283b;
          color: #00f7ff;
          border: 1.5px solid #00f7ff;
        }
        .tutorial-skip-btn:hover {
          background: #00f7ff22;
          color: #00f7ff;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .tutorial-overlay {
            padding: 16px;
          }
          .tutorial-flashcard {
            min-width: unset;
            max-width: 100%;
            padding: 24px 20px 20px 20px;
            font-size: 0.95rem;
            border-radius: 16px;
          }
          .tutorial-title {
            font-size: 1.1rem;
            margin-bottom: 12px;
          }
          .tutorial-content {
            margin-bottom: 20px;
            font-size: 0.95rem;
            line-height: 1.6;
          }
          .tutorial-actions {
            gap: 12px;
          }
          .tutorial-next-btn, .tutorial-skip-btn {
            padding: 8px 20px;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .tutorial-overlay {
            padding: 12px;
          }
          .tutorial-flashcard {
            padding: 20px 16px 16px 16px;
            font-size: 0.9rem;
            border-radius: 14px;
          }
          .tutorial-title {
            font-size: 1rem;
            margin-bottom: 10px;
          }
          .tutorial-content {
            margin-bottom: 16px;
            font-size: 0.9rem;
            line-height: 1.5;
          }
          .tutorial-actions {
            gap: 10px;
          }
          .tutorial-next-btn, .tutorial-skip-btn {
            padding: 7px 16px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TutorialFlashcard; 