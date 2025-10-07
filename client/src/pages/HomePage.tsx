import { useNavigate } from "react-router-dom";
import { BookOpen, Sparkles, Globe, Star, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function Home() {
  const navigate = useNavigate();

  const featuredStories = [
    {
      title: "The Birth of Stars",
      description: "Journey through stellar nurseries",
      image:
        "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg",
    },
    {
      title: "Black Hole Mysteries",
      description: "Explore the darkest regions of space",
      image:
        "https://images.pexels.com/photos/8474647/pexels-photo-8474647.jpeg",
    },
    {
      title: "The Solar System",
      description: "Meet our planetary neighbors",
      image:
        "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{ animation: "fadeIn 1.5s ease-out forwards" }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://www.pexels.com/download/video/7094565/"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 0.5 + "px",
                height: Math.random() * 2 + 0.5 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.3,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite ${
                  Math.random() * 2
                }s`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-20">
          <h1
            className="text-5xl md:text-7xl lg:text-7xl font-black text-white mb-6 leading-tight animate-fade-in"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              textShadow:
                "0 0 60px rgba(59, 130, 246, 0.5), 0 0 20px rgba(0, 0, 0, 0.8)",
              animation: "fadeInUp 1.2s ease-out forwards",
            }}
          >
            EXPLORE THE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 animate-pulse">
              UNIVERSE
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
              animation: "fadeInUp 1.4s ease-out forwards",
            }}
          >
            Embark on an extraordinary journey through space with interactive
            stories that bring the cosmos to life. Learn, explore, and discover
            the wonders of our universe.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
            style={{ animation: "fadeInUp 1.6s ease-out forwards" }}
          >
            <button
              onClick={() => navigate("/library")}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 flex items-center space-x-2 border border-blue-400/20"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <BookOpen
                size={22}
                className="group-hover:rotate-12 transition-transform"
              />
              <span>Start Reading</span>
            </button>
            <button
              onClick={() => navigate("/chatbot")}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-lg border border-white/30 hover:border-white/50 transition-all transform hover:scale-105 backdrop-blur-sm"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Try AI Assistant
            </button>
          </div>
        </div>
      </section>
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              DISCOVER{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                OUR FEATURES
              </span>
            </h2>
            <p
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Everything you need for an extraordinary space learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-blue-400/50 transition-all hover:transform hover:scale-105">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg"
                  alt="Interactive Stories"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute top-4 left-4 w-12 h-12 bg-blue-500/30 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-400/30">
                  <BookOpen className="text-blue-400" size={24} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3
                  className="text-xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Interactive Stories
                </h3>
                <p
                  className="text-white/70 text-sm leading-relaxed"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Experience space through captivating narratives that make
                  learning unforgettable and engaging.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-blue-400/50 transition-all hover:transform hover:scale-105">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg"
                  alt="AI-Powered Learning"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute top-4 left-4 w-12 h-12 bg-blue-500/30 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-400/30">
                  <Zap className="text-blue-400" size={24} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3
                  className="text-xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  AI-Powered Learning
                </h3>
                <p
                  className="text-white/70 text-sm leading-relaxed"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Get instant answers and personalized explanations from our
                  advanced AI assistant.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-blue-400/50 transition-all hover:transform hover:scale-105">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg"
                  alt="Visual Excellence"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute top-4 left-4 w-12 h-12 bg-blue-500/30 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-400/30">
                  <Globe className="text-blue-400" size={24} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3
                  className="text-xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Visual Excellence
                </h3>
                <p
                  className="text-white/70 text-sm leading-relaxed"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Stunning visuals and animations bring the cosmos closer than
                  ever before.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-blue-950/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              ABOUT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                NOVATECH
              </span>
            </h2>
            <p
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Revolutionizing space education through innovation and technology
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            <div className="order-2 lg:order-1">
              <h3
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                IMMERSIVE <span className="text-blue-400">STORYTELLING</span>
              </h3>
              <p
                className="text-lg text-white/70 leading-relaxed mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                We transform complex space concepts into engaging narratives
                that captivate and educate. Our interactive stories are designed
                to make learning feel like an adventure, not a chore.
              </p>
              <p
                className="text-lg text-white/70 leading-relaxed"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Each story is crafted by space enthusiasts and educators to
                ensure accuracy while maintaining the excitement of exploration.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src="https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg"
                  alt="Immersive Storytelling"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            <div className="order-1">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src="https://images.pexels.com/photos/8474771/pexels-photo-8474771.jpeg"
                  alt="AI Technology"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
            <div className="order-2">
              <h3
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                ADVANCED <span className="text-blue-400">AI ASSISTANT</span>
              </h3>
              <p
                className="text-lg text-white/70 leading-relaxed mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Our AI-powered assistant is available 24/7 to answer your
                questions, provide personalized explanations, and guide you
                through your cosmic journey.
              </p>
              <p
                className="text-lg text-white/70 leading-relaxed"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Whether you're curious about black holes or planetary systems,
                our AI adapts to your learning style and pace.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <h3
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                STUNNING <span className="text-blue-400">VISUALS</span>
              </h3>
              <p
                className="text-lg text-white/70 leading-relaxed mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Experience space like never before with breathtaking visuals,
                realistic animations, and immersive environments that bring the
                cosmos to your screen.
              </p>
              <p
                className="text-lg text-white/70 leading-relaxed"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                From nebulas to galaxies, every visual element is designed to
                inspire wonder and curiosity about our universe.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src="https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg"
                  alt="Stunning Visuals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-black via-blue-950/10 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              FEATURED{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                STORIES
              </span>
            </h2>
            <p
              className="text-lg md:text-xl text-white/60"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Begin your cosmic journey with these stellar adventures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {featuredStories.map((story, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-blue-400/50 transition-all cursor-pointer transform hover:scale-[1.02]"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:from-black/80 transition-all" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3
                    className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {story.title}
                  </h3>
                  <p
                    className="text-white/80 text-sm"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {story.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/library")}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 inline-flex items-center space-x-2 border border-blue-400/20"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Star size={22} />
              <span>Explore All Stories</span>
            </button>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-black via-blue-950/10 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-400"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5,
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              textShadow: "0 0 40px rgba(59, 130, 246, 0.3)",
            }}
          >
            STAY UPDATED WITH{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400">
              COSMIC NEWS
            </span>
          </h2>

          <p
            className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Subscribe to our newsletter and get the latest space stories,
            updates, and exclusive content delivered to your inbox.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-blue-400/50 transition-all"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              />
              <button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-semibold transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 border border-blue-400/20"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Subscribe
              </button>
            </div>
            <p
              className="text-sm text-white/50 mt-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Join 50,000+ space enthusiasts. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
      <Footer />
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}
