import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars, Trail } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useScroll, useTransform } from 'framer-motion';

function StarField(props: any) {
  const ref = useRef<any>();
  const [sphere] = useMemo(() => {
    // Generate random points in a sphere
    const data = random.inSphere(new Float32Array(5000), { radius: 1.5 }) as Float32Array;
    return [data];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#8b5cf6" // Violet accent
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingGeometry() {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 2;
    meshRef.current.rotation.y = Math.sin(t / 4) / 2;
    meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={[2, 0, -2]} scale={0.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
            color="#4f46e5" 
            wireframe 
            transparent 
            opacity={0.3} 
            roughness={0}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <StarField />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <FloatingGeometry />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />
    </>
  );
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
    </div>
  );
}
