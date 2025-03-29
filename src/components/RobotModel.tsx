
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, Euler } from 'three';
import { useGLTF } from '@react-three/drei';

interface RobotModelProps {
  position?: [number, number, number];
  mousePosition: { x: number, y: number };
}

const RobotModel: React.FC<RobotModelProps> = ({ position = [0, 0, 0], mousePosition }) => {
  const robotRef = useRef<THREE.Group>(null);
  const [rotationTarget, setRotationTarget] = useState(new Euler(0, 0, 0));
  
  // Update rotation target based on mouse position
  useEffect(() => {
    if (mousePosition) {
      const rotX = (mousePosition.y * 0.1) - 0.2; // Limit vertical rotation
      const rotY = mousePosition.x * 0.2;
      setRotationTarget(new Euler(rotX, rotY, 0));
    }
  }, [mousePosition]);

  // Animation frame - smoothly interpolate toward target rotation
  useFrame((_, delta) => {
    if (robotRef.current) {
      // Smoothly interpolate current rotation to target rotation
      robotRef.current.rotation.x += (rotationTarget.x - robotRef.current.rotation.x) * 2 * delta;
      robotRef.current.rotation.y += (rotationTarget.y - robotRef.current.rotation.y) * 2 * delta;
      
      // Add a subtle floating animation
      const time = Date.now() * 0.001;
      robotRef.current.position.y = position[1] + Math.sin(time) * 0.1;
    }
  });

  return (
    <group ref={robotRef} position={new Vector3(...position)}>
      {/* Head */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial attach="material" color="#9b87f5" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.15, 0.8, 0.4]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial attach="material" color="#ffffff" />
      </mesh>
      
      <mesh position={[-0.15, 0.8, 0.4]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial attach="material" color="#ffffff" />
      </mesh>
      
      {/* Pupils */}
      <mesh position={[0.15, 0.8, 0.48]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial attach="material" color="#1A1F2C" />
      </mesh>
      
      <mesh position={[-0.15, 0.8, 0.48]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial attach="material" color="#1A1F2C" />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial 
          attach="material"
          color="#D946EF" 
          emissive="#D946EF"
          emissiveIntensity={0.5} 
        />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 0.8, 32]} />
        <meshStandardMaterial attach="material" color="#7E69AB" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[0.6, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 32]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial attach="material" color="#6E59A5" />
      </mesh>
      
      <mesh position={[-0.6, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 32]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial attach="material" color="#6E59A5" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[0.2, -0.6, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.4, 32]} />
        <meshStandardMaterial attach="material" color="#6E59A5" />
      </mesh>
      
      <mesh position={[-0.2, -0.6, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.4, 32]} />
        <meshStandardMaterial attach="material" color="#6E59A5" />
      </mesh>
    </group>
  );
};

export default RobotModel;
