import { useNavigate } from "react-router-dom";
import { Rocket, Trophy } from "lucide-react";

export default function GameStart() {
  const navigate = useNavigate();
  const highScore = localStorage.getItem("spaceWeatherHighScore") || "0";

  return (
    <div className="min-h-screen bg-black relative">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://videos.pexels.com/video-files/856309/856309-hd_1920_1080_30fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/80" />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1 + "px",
                height: Math.random() * 2 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.4 + 0.2,
                animation: `twinkle ${Math.random() * 4 + 3}s infinite ${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => navigate("/home")}
            className="px-5 py-2 text-white/80 hover:text-white rounded-xl font-medium text-base sm:text-lg transition-all backdrop-blur-sm hover:bg-white/5 w-full sm:w-auto text-center"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ← Back to Home
          </button>

          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-purple-400/30 rounded-2xl px-4 py-2 sm:px-6 sm:py-3 shadow-lg w-full sm:w-auto justify-center">
            <Trophy
              className="text-purple-400"
              size={24}
              style={{
                filter: "drop-shadow(0 0 10px rgba(192, 132, 252, 0.6))",
              }}
            />
            <div className="text-left">
              <p
                className="text-white/60 text-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Best Score
              </p>
              <p
                className="text-xl sm:text-2xl font-bold text-white"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {highScore} / 100
              </p>
            </div>
          </div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mt-28 sm:mt-16 text-center">
          <div
            className="mb-10"
            style={{ animation: "fadeInUp 0.8s ease-out forwards" }}
          >
            <h1
              className="text-7xl sm:text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 mb-4 sm:mb-6"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                textShadow: "0 0 80px rgba(59, 130, 246, 0.5)",
              }}
            >
              SPACE QUEST
            </h1>
            <p
              className="text-base sm:text-xl md:text-2xl text-cyan-200/90 max-w-2xl mx-auto leading-relaxed"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                textShadow: "0 2px 20px rgba(0, 0, 0, 0.8)",
              }}
            >
              Explore the dynamic forces of space weather and test your cosmic
              knowledge
            </p>
          </div>
          <div
            className="flex flex-col items-center gap-4"
            style={{ animation: "fadeInUp 1.4s ease-out forwards" }}
          >
            <button
              onClick={() => navigate("/game/play")}
              className="group px-10 sm:px-16 py-5 sm:py-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-2xl font-bold text-xl sm:text-2xl transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/40 flex items-center gap-3 sm:gap-4 border border-cyan-300/20 relative overflow-hidden"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Rocket
                size={28}
                className="group-hover:rotate-12 transition-transform relative z-10"
              />
              <span className="relative z-10">START MISSION</span>
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.6; }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
