
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color } from 'three';

const RobotModel = () => {
  const robotRef = useRef<Mesh>(null);
  const headRef = useRef<Mesh>(null);
  const leftArmRef = useRef<Mesh>(null);
  const rightArmRef = useRef<Mesh>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hover ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hover]);

  useFrame((state, delta) => {
    if (robotRef.current) {
      robotRef.current.rotation.y += delta * 0.3;
    }
    
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
    
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
    
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2 + Math.PI) * 0.2;
    }
  });

  return (
    <group
      ref={robotRef}
      position={[0, -1, 0]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.5, 2, 1]} />
        <meshStandardMaterial attach="material" color={hover ? "#9b87f5" : "#8B5CF6"} />
      </mesh>
      
      {/* Head */}
      <mesh ref={headRef} position={[0, 2.3, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color="#7E69AB" />
        
        {/* Eyes */}
        <mesh position={[0.3, 0.1, 0.51]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial attach="material" color="#E5DEFF" />
        </mesh>
        
        <mesh position={[-0.3, 0.1, 0.51]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial attach="material" color="#E5DEFF" />
        </mesh>
        
        {/* Antenna */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
          <meshStandardMaterial attach="material" color="#D946EF" />
        </mesh>
        
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            attach="material" 
            color="#F97316" 
            emissive="#F97316" 
            emissiveIntensity={0.5} 
          />
        </mesh>
      </mesh>
      
      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-1, 0.8, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshStandardMaterial attach="material" color="#6E59A5" />
      </mesh>
      
      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[1, 0.8, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshStandardMaterial attach="material" color="#6E59A5" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.5, -0.8, 0]}>
        <boxGeometry args={[0.5, 1.6, 0.5]} />
        <meshStandardMaterial attach="material" color="#1A1F2C" />
      </mesh>
      
      <mesh position={[0.5, -0.8, 0]}>
        <boxGeometry args={[0.5, 1.6, 0.5]} />
        <meshStandardMaterial attach="material" color="#1A1F2C" />
      </mesh>
    </group>
  );
};

export default RobotModel;
