import React from 'react';
import { Html } from '@react-three/drei';
import { FloatingLabelProps } from '../types';

const FloatingLabel: React.FC<FloatingLabelProps> = ({ text, position }) => {
  return (
    <Html position={position} center>
      <div className="floating-label">{text}</div>
    </Html>
  );
};

export default FloatingLabel;
