import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Rocket, Globe, Map } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import StarMap from '@/components/StoryMap';
import { Button } from '@/components/ui/Button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function StoryLibrary() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showStarMap, setShowStarMap] = useState(false);

  const categories = [
    { id: 'all', name: 'All Stories', icon: Sparkles },
    { id: 'planets', name: 'Planets', icon: Globe },
    { id: 'stars', name: 'Stars', icon: Sparkles },
    { id: 'exploration', name: 'Exploration', icon: Rocket },
  ];

  const stories = [
    {
      id: 1,
      title: 'Solar Storms',
      category: 'space-weather',
      pages: 12,
      image: 'https://th.bing.com/th?id=OIF.TsshI%2bQS6QtzCqWI9%2f6HRQ&cb=12&rs=1&pid=ImgDetMain&o=7&rm=3', 
    },
    {
      id: 2,
      title: 'Aurora Borealis',
      category: 'space-weather',
      pages: 8,
      image: 'https://tse4.mm.bing.net/th/id/OIP.oujw2Si_ALMqy53u2su9RAHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      id: 3,
      title: 'Coronal Mass Ejections',
      category: 'space-weather',
      pages: 10,
      image: 'https://tse1.mm.bing.net/th/id/OIP.vTtSfff-13-kDRct9e1EMgHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3', 
    },
    {
      id: 4,
      title: 'Geomagnetic Storms',
      category: 'space-weather',
      pages: 9,
      image: 'https://th.bing.com/th/id/R.e463d1e189025b98fa20c4e263bca42b?rik=KCUl4cN1jP4ChQ&pid=ImgRaw&r=0',
    },
    {
      id: 5,
      title: 'Black Holes',
      category: 'space-weather',
      pages: 11,
      image: 'https://assets.science.nasa.gov/dynamicimage/assets/science/missions/hubble/releases/2022/06/STScI-01FQHABPWKNXRYBMXQWRAGFWSC.tif?crop=faces%2Cfocalpoint&fit=clip&h=1052&w=1877', 
    },
    {
      id: 6,
      title: 'Galaxies',
      category: 'space-weather',
      pages: 7,
      image: 'https://tse4.mm.bing.net/th/id/OIP.jzymMuv29kNOg7gAyfPvMwHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3', 
    }
  ];

  const filteredStories = selectedCategory === 'all' 
    ? stories 
    : stories.filter(s => s.category === selectedCategory);

  const handleStorySelect = (storyId: number) => {
    setShowStarMap(false);
    navigate(`/story/${storyId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-space-dark to-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        >
          <source src="https://www.pexels.com/download/video/9341381/" type="video/mp4" />
        </video>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <BookOpen className="mb-6 text-blue-400 animate-float" size={64} />
            <h1 style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-6xl md:text-7xl font-black text-white mb-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              STORY <span className="text-blue-400">LIBRARY</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mb-8">
              Choose your cosmic adventure and embark on an unforgettable journey through space
            </p>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
              <Button
                onClick={() => setShowStarMap(true)}
                className="group relative px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-cyan-400/70 hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  <Map className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Explore Star Map
                  <Sparkles className="w-5 h-5 animate-twinkle" />
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories & Stories Section */}
      <section className="py-12 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 hover:scale-105"
                  style={{
                    background: selectedCategory === cat.id 
                      ? 'linear-gradient(135deg, hsl(var(--space-blue)), hsl(var(--space-cyan)))' 
                      : 'rgba(255, 255, 255, 0.05)',
                    color: selectedCategory === cat.id ? 'white' : 'rgba(255, 255, 255, 0.7)',
                    border: selectedCategory === cat.id ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: selectedCategory === cat.id ? '0 0 20px hsl(var(--space-cyan) / 0.3)' : 'none',
                  }}
                >
                  <Icon size={18} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="wait">
              {filteredStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => handleStorySelect(story.id)}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all transform hover:scale-105 bg-white/5 backdrop-blur-md">
                    <div className="aspect-[6/4] relative">
                      <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:from-black/80 transition-all" />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <h3 style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                          {story.title}
                        </h3>
                        <div className="text-cyan-400 text-md font-semibold flex items-center space-x-2">
                          <BookOpen size={18} />
                          <span>Read Now</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Star Map Dialog */}
      <AnimatePresence>
        {showStarMap && (
          <Dialog open={showStarMap} onOpenChange={setShowStarMap}>
            <DialogContent className="max-w-6xl bg-black/95 backdrop-blur-xl border-2 border-cyan-400/30 p-0 overflow-hidden">
              <motion.div initial={{ clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)', opacity: 0, scale: 0.9 }}
                animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', opacity: 1, scale: 1 }}
                exit={{ clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)', opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <DialogTitle className="sr-only">Story Constellation Map</DialogTitle>
                <div className="relative">
                  <button
                    onClick={() => setShowStarMap(false)}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400 transition-all group"
                  >
                    <div className="absolute inset-0 rounded-full bg-cyan-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                  </button>
                  <StarMap stories={stories} onStorySelect={handleStorySelect} />
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
