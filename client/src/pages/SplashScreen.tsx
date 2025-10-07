import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket } from 'lucide-react';

export default function SplashScreen() {
  const [tvOn, setTvOn] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setTvOn(true), 500);
    const timer2 = setTimeout(() => setShowLogo(true), 2500);
    const timer3 = setTimeout(() => navigate('/home'), 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <div
        className="w-full h-full transition-all duration-1000 relative"
        style={{
          background: tvOn
            ? 'radial-gradient(ellipse at center, #0b0b1a 0%, #000000 70%)'
            : '#000000',
          opacity: tvOn ? 1 : 0,
        }}
      >
        {tvOn && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, transparent 1px, transparent 2px, rgba(255,255,255,0.05) 3px)',
              animation: 'scan 1s linear infinite',
              mixBlendMode: 'overlay',
            }}
          />
        )}

        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: showLogo ? 1 : 0, transition: 'opacity 2s' }}
        >
          <source src="https://static.videezy.com/system/resources/previews/000/005/456/original/Earth_Eclipse_Rotate_Medium.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-1000"
          style={{
            opacity: showLogo ? 1 : 0,
            transform: showLogo ? 'scale(1)' : 'scale(0.5)',
          }}
        >
          <div className="text-center relative">
            <div className="flex items-center justify-center mb-8">
              <Rocket
                className="text-white"
                size={60}
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))',
                  animation: 'rocket 2s ease-in-out infinite',
                }}
              />
            </div>

            <h1
              className="text-8xl font-black tracking-wider relative"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: '#ffffff',
                textShadow: '0 0 40px rgba(255, 255, 255, 0.8), 0 0 80px rgba(100, 200, 255, 0.6)',
                animation: 'glow 2s ease-in-out infinite alternate',
              }}
            >
              NOVA<span className="text-blue-400">TECH</span>
            </h1>

            <div className="mt-6 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glow {
          from {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
                         0 0 40px rgba(100, 200, 255, 0.4);
          }
          to {
            text-shadow: 0 0 40px rgba(255, 255, 255, 0.9),
                         0 0 80px rgba(100, 200, 255, 0.7),
                         0 0 120px rgba(100, 200, 255, 0.5);
          }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes rocket {
          0%, 100% { transform: translateY(0) rotate(-45deg); }
          50% { transform: translateY(-20px) rotate(-45deg); }
        }
      `}</style>
    </div>
  );
}
