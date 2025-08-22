import React from 'react';
import { Html } from '@react-three/drei';
import { ErrorBoundaryProps } from '../types';

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return (
    <React.Suspense fallback={
      <Html center>
        <div style={{ color: "white" }}>Loading...</div>
      </Html>
    }>
      {children}
    </React.Suspense>
  );
};

export default ErrorBoundary;
