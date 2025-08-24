import { useState, useCallback } from 'react';

export function useModelLoader() {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadModel = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const validTypes = ['.glb', '.gltf'];
      const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
      
      if (!validTypes.includes(fileExtension)) {
        throw new Error('Unsupported file type. Please upload a GLB or GLTF file.');
      }

      const url = URL.createObjectURL(file);
      
      if (modelUrl) {
        URL.revokeObjectURL(modelUrl);
      }
      
      setModelUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while loading the model.');
    } finally {
      setIsLoading(false);
    }
  }, [modelUrl]);

  const resetModel = useCallback(() => {
    if (modelUrl) {
      URL.revokeObjectURL(modelUrl);
    }
    setModelUrl(null);
    setError(null);
  }, [modelUrl]);

  return {
    modelUrl,
    isLoading,
    error,
    loadModel,
    resetModel,
  };
}
