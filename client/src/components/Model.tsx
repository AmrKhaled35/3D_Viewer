import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  url: string;
  scale?: number;
}

export function Model({ url, scale = 1 }: ModelProps) {
  const { scene, animations } = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);
  const { actions, mixer } = useAnimations(animations, meshRef);

  useEffect(() => {
    if (animations.length > 0) {
      const firstAnim = animations[0].name;
      actions[firstAnim]?.play();
    }

    if (meshRef.current) {
      const box = new THREE.Box3().setFromObject(meshRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      meshRef.current.position.sub(center);
      const maxAxis = Math.max(size.x, size.y, size.z);
      const scaleFactor = 5 / maxAxis;
      meshRef.current.scale.setScalar(scaleFactor * scale);
    }

    return () => {
      mixer?.stopAllAction();
    };
  }, [scene, actions, animations, mixer, scale]);

  return (
    <group ref={meshRef} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}
