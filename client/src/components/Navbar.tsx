import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, BookOpen, Bot, Gamepad2, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-t border-white/10 overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col items-start p-6 space-y-6">
          <Link
            to="/library"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-3 text-white/80 hover:text-white text-lg"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <BookOpen size={20} />
            <span>Stories</span>
          </Link>

          <Link
            to="/game"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-3 text-white/80 hover:text-white text-lg"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Gamepad2 size={20} />
            <span>Game</span>
          </Link>

          <Link
            to="/chatbot"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-3 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg border border-blue-400/30 text-white text-lg transition-all"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Bot size={20} />
            <span>AI Assistant</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
