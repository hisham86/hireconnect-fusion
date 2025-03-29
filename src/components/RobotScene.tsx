
import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RobotModel from './RobotModel';

const RobotScene: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      
      // Normalized mouse position between -1 and 1
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      setMousePosition({ x, y });
    }
  };

  // For mobile/touch devices
  const handleTouchMove = (event: React.TouchEvent) => {
    if (containerRef.current && event.touches[0]) {
      const rect = containerRef.current.getBoundingClientRect();
      const touch = event.touches[0];
      
      // Normalized touch position between -1 and 1
      const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
      
      setMousePosition({ x, y });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <RobotModel position={[0, 0, 0]} mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default RobotScene;
