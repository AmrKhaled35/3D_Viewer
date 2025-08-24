export interface ModelViewerProps {
  modelUrl: string | null;
  onModelChange: (url: string | null) => void;
}

export interface EnvironmentSettings {
  preset: string;
  background: boolean;
  blur: number;
}

export interface CameraSettings {
  position: [number, number, number];
  fov: number;
}

export interface ControlSettings {
  autoRotate: boolean;
  autoRotateSpeed: number;
  enableZoom: boolean;
  enablePan: boolean;
}