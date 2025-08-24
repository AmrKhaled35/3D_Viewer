import { Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  PresentationControls,
  Stage,
  Html,
  useProgress,
} from '@react-three/drei';
import { Model } from './Model';
import type { EnvironmentSettings, ControlSettings } from '../types';

interface SceneProps {
  modelUrl: string | null;
  environment: EnvironmentSettings;
  controls: ControlSettings;
  modelScale: number;
}

function Loader() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-8 bg-black/95 backdrop-blur-sm rounded-2xl shadow-xl">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <div className="text-slate-700 font-medium">Loading model...</div>
        <div className="text-sm text-slate-500 mt-2">{progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
}

export function Scene({ modelUrl, environment, controls, modelScale }: SceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 50 }}
      className="bg-gradient-to-br from-slate-50 to-slate-100"
    >
      {environment.preset === "white" ? (
        <color attach="background" args={['#808080']} />
      ) : (
        <Environment 
          preset={environment.preset as any}
          background={environment.background}
        />
      )}
      
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        castShadow 
        intensity={0.8}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Suspense fallback={<Loader />}>
        <Stage
          contactShadow={{ opacity: 0.2, blur: 3 }}
          environment={environment.preset as any}
          adjustCamera={false}
          intensity={0.5}
        >
          {modelUrl && (
            <PresentationControls enabled cursor>
              <Model url={modelUrl} scale={modelScale} />
            </PresentationControls>
          )}
        </Stage>
      </Suspense>

      <OrbitControls
        autoRotate={controls.autoRotate}
        autoRotateSpeed={controls.autoRotateSpeed}
        enableZoom={controls.enableZoom}
        enablePan={controls.enablePan}
        minDistance={2}
        maxDistance={20}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.75}
      />

      <ContactShadows
        position={[0, -1, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={4.5}
      />
    </Canvas>
  );
}
