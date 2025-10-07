import { Rocket, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/90 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Rocket
                className="text-white"
                size={28}
                style={{ filter: 'drop-shadow(0 0 10px rgba(100, 200, 255, 0.5))' }}
              />
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                NOVA<span className="text-blue-400">TECH</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Exploring the universe through interactive storytelling. Learn about space, science, and beyond with immersive 3D experiences.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-white/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Story Library</li>
              <li className="hover:text-white cursor-pointer transition-colors">AI Assistant</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Connect
            </h3>
            <div className="flex space-x-4">
              <Github className="text-white/60 hover:text-white cursor-pointer transition-colors" size={20} />
              <Twitter className="text-white/60 hover:text-white cursor-pointer transition-colors" size={20} />
              <Mail className="text-white/60 hover:text-white cursor-pointer transition-colors" size={20} />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/40 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            © 2025 NovaTech. All rights reserved. Made with passion for space exploration.
          </p>
        </div>
      </div>
    </footer>
  );
}
