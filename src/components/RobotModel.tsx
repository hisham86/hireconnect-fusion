
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
        <meshStandardMaterial>
          <color attach="color" args={[hover ? "#9b87f5" : "#8B5CF6"]} />
        </meshStandardMaterial>
      </mesh>
      
      {/* Head */}
      <mesh ref={headRef} position={[0, 2.3, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial>
          <color attach="color" args={["#7E69AB"]} />
        </meshStandardMaterial>
        
        {/* Eyes */}
        <mesh position={[0.3, 0.1, 0.51]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial>
            <color attach="color" args={["#E5DEFF"]} />
          </meshStandardMaterial>
        </mesh>
        
        <mesh position={[-0.3, 0.1, 0.51]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial>
            <color attach="color" args={["#E5DEFF"]} />
          </meshStandardMaterial>
        </mesh>
        
        {/* Antenna */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
          <meshStandardMaterial>
            <color attach="color" args={["#D946EF"]} />
          </meshStandardMaterial>
        </mesh>
        
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial emissiveIntensity={0.5}>
            <color attach="color" args={["#F97316"]} />
            <color attach="emissive" args={["#F97316"]} />
          </meshStandardMaterial>
        </mesh>
      </mesh>
      
      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-1, 0.8, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshStandardMaterial>
          <color attach="color" args={["#6E59A5"]} />
        </meshStandardMaterial>
      </mesh>
      
      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[1, 0.8, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshStandardMaterial>
          <color attach="color" args={["#6E59A5"]} />
        </meshStandardMaterial>
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.5, -0.8, 0]}>
        <boxGeometry args={[0.5, 1.6, 0.5]} />
        <meshStandardMaterial>
          <color attach="color" args={["#1A1F2C"]} />
        </meshStandardMaterial>
      </mesh>
      
      <mesh position={[0.5, -0.8, 0]}>
        <boxGeometry args={[0.5, 1.6, 0.5]} />
        <meshStandardMaterial>
          <color attach="color" args={["#1A1F2C"]} />
        </meshStandardMaterial>
      </mesh>
    </group>
  );
};

export default RobotModel;
