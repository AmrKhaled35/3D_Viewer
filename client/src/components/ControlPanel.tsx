import { useState } from 'react';
import { 
  Settings, 
  RotateCw, 
  ZoomIn, 
  Palette, 
  Sun, 
  Moon,
  Mountain,
  Building,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import type { EnvironmentSettings, ControlSettings } from '../types';

interface ControlPanelProps {
  environment: EnvironmentSettings;
  controls: ControlSettings;
  modelScale: number;
  onEnvironmentChange: (env: EnvironmentSettings) => void;
  onControlsChange: (controls: ControlSettings) => void;
  onScaleChange: (scale: number) => void;
}

const environments = [
  { name: 'city', label: 'City', icon: Building },
  { name: 'sunset', label: 'Sunset', icon: Sun },
  { name: 'dawn', label: 'Dawn', icon: Moon },
  { name: 'forest', label: 'Forest', icon: Mountain },
  { name: 'studio', label: 'Studio', icon: Palette },
];

export function ControlPanel({ 
  environment, 
  controls, 
  modelScale,
  onEnvironmentChange, 
  onControlsChange,
  onScaleChange
}: ControlPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-900 rounded-2xl shadow-xl p-6 space-y-6 text-gray-200">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-gray-300" />
          <h3 className="font-semibold text-white">Display Settings</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-300" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-300" />
        )}
      </div>

      {isExpanded && (
        <div className="space-y-6 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-3">
            <h4 className="font-medium text-white flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Environment & Background
            </h4>
            
            <div className="grid grid-cols-2 gap-2">
              {environments.map((env) => {
                const IconComponent = env.icon;
                return (
                  <button
                    key={env.name}
                    onClick={() => onEnvironmentChange({ ...environment, preset: env.name })}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      environment.preset === env.name
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {env.label}
                  </button>
                );
              })}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={environment.background}
                  onChange={(e) => onEnvironmentChange({ ...environment, background: e.target.checked })}
                  className="rounded border-gray-600 text-blue-500 focus:ring-blue-400"
                />
                <span className="text-sm">Show background</span>
              </label>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-white flex items-center gap-2">
              <RotateCw className="w-4 h-4" />
              Motion Controls
            </h4>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={controls.autoRotate}
                  onChange={(e) => onControlsChange({ ...controls, autoRotate: e.target.checked })}
                  className="rounded border-gray-600 text-blue-500 focus:ring-blue-400"
                  title="Enable auto rotation"
                />
                <span className="text-sm">Auto rotate</span>
              </label>

              {controls.autoRotate && (
                <div className="ml-6 space-y-1">
                  <label className="text-sm">Rotation speed</label>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={controls.autoRotateSpeed}
                    onChange={(e) => onControlsChange({ ...controls, autoRotateSpeed: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-white flex items-center gap-2">
              <ZoomIn className="w-4 h-4" />
              Model Scale
            </h4>
            
            <div className="space-y-1">
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={modelScale}
                onChange={(e) => onScaleChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                title="Adjust the model scale"
                aria-label="Model scale adjustment"
              />
              <div className="text-sm text-gray-400 text-center">
                {(modelScale * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
