import { Link } from 'react-router-dom';
import { Rocket, BookOpen, Bot, Gamepad2 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <Rocket
              className="text-white transform group-hover:rotate-45 transition-transform duration-300"
              size={32}
              style={{ filter: 'drop-shadow(0 0 10px rgba(100, 200, 255, 0.5))' }}
            />
            <span
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              NOVA<span className="text-blue-400">TECH</span>
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              to="/library"
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors font-medium"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <BookOpen size={18} />
              <span>Stories</span>
            </Link>
            <Link
              to="/game"
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors font-medium"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Gamepad2 size={18} />
              <span>Game</span>
            </Link>
            <Link
              to="/chatbot"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg border border-blue-400/30 text-white transition-all"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Bot size={18} />
              <span>AI Assistant</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
