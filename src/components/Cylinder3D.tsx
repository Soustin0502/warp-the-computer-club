
import React from 'react';

interface Cylinder3DProps {
  text: string;
}

const Cylinder3D: React.FC<Cylinder3DProps> = ({ text }) => {
  return (
    <div className="absolute bottom-8 right-8 w-32 h-48 perspective-1000">
      <div className="cylinder-container relative w-full h-full transform-style-preserve-3d animate-spin-slow">
        {/* Cylinder faces with text */}
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="cylinder-face absolute w-full h-full flex items-center justify-center"
            style={{
              transform: `rotateY(${index * 30}deg) translateZ(64px)`,
              background: 'linear-gradient(135deg, rgba(255, 51, 204, 0.1), rgba(0, 204, 255, 0.1))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 51, 204, 0.3)',
            }}
          >
            <span 
              className="text-primary font-orbitron font-bold text-sm vertical-text"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              {text}
            </span>
          </div>
        ))}
        
        {/* Top and bottom caps */}
        <div
          className="cylinder-cap absolute w-full"
          style={{
            height: '8px',
            top: '-4px',
            background: 'radial-gradient(ellipse, rgba(255, 51, 204, 0.3), transparent)',
            borderRadius: '50%',
            transform: 'rotateX(90deg)',
          }}
        />
        <div
          className="cylinder-cap absolute w-full"
          style={{
            height: '8px',
            bottom: '-4px',
            background: 'radial-gradient(ellipse, rgba(255, 51, 204, 0.3), transparent)',
            borderRadius: '50%',
            transform: 'rotateX(90deg)',
          }}
        />
      </div>
    </div>
  );
};

export default Cylinder3D;
