import { useRef, ChangeEvent } from 'react';
import { Upload, File } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

export function FileUploader({ onFileSelect, isLoading }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const triggerFileSelect = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept=".glb,.gltf"
        className="hidden"
      />
      
      <button
        onClick={triggerFileSelect}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Loading...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Upload New Model
          </>
        )}
      </button>

      <div className="text-sm text-gray-400 text-center">
        <File className="w-4 h-4 inline-block mr-1" />
        Supports GLB and GLTF files
      </div>
    </div>
  );
}
