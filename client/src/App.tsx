import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import { Header } from "./components/Header";
import { Scene } from "./components/Scene";
import { FileUploader } from "./components/FileUploader";
import { ControlPanel } from "./components/ControlPanel";
import { useModelLoader } from "./hooks/useModelLoader";
import { Maximize2, Minimize2 } from "lucide-react";

function App() {
  const { modelUrl, isLoading, error, loadModel, resetModel } = useModelLoader();
  const [environment, setEnvironment] = useState({
    preset: "sunset",
    background: true,
    blur: 0,
  });
  const [controls, setControls] = useState({
    autoRotate: true,
    autoRotateSpeed: 1,
    enableZoom: true,
    enablePan: true,
  });
  const [modelScale, setModelScale] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <SplashScreen onComplete={() => setSplashDone(true)} />;
  }

  return (
    <div className="min-h-[200vh] bg-black">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className={`grid grid-cols-1 ${
            isFullScreen ? "" : "lg:grid-cols-4"
          } gap-8 h-[calc(100vh-120px)]`}
        >
          <div
            className={`${
              isFullScreen
                ? "col-span-4 fixed inset-0 z-50 bg-black"
                : "lg:col-span-3 bg-gray-900 rounded-2xl shadow-xl overflow-hidden"
            }`}
          >
            <div className="relative w-full h-full">
              <Scene
                modelUrl={modelUrl}
                environment={environment}
                controls={controls}
                modelScale={modelScale}
              />
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              >
                {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
            </div>
          </div>
          {!isFullScreen && (
            <div className="space-y-6">
              <FileUploader onFileSelect={loadModel} isLoading={isLoading} />
              {error && (
                <div className="bg-red-900 border border-red-700 rounded-xl p-4">
                  <div className="text-red-300 text-sm font-medium">{error}</div>
                  <button
                    onClick={resetModel}
                    className="mt-2 text-red-400 hover:text-red-200 text-sm underline"
                  >
                    Reset
                  </button>
                </div>
              )}
              <ControlPanel
                environment={environment}
                controls={controls}
                modelScale={modelScale}
                onEnvironmentChange={setEnvironment}
                onControlsChange={setControls}
                onScaleChange={setModelScale}
              />
              <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
                <h3 className="font-semibold text-white mb-3">Note</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• I'm Amr, an intern, and honestly, I'm not loving it.</p>
                  <p>• I want to work in AI, not frontend.</p>
                  <p>• I'm forced to do things I don't enjoy.</p>
                  <p>• Plus, tasks keep coming unexpectedly and late.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
