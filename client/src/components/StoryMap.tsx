import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Story {
  id: number;
  title: string;
  category: string;
  pages: number;
  image: string;
}

interface StarMapProps {
  stories: Story[];
  onStorySelect: (storyId: number) => void;
}

const StarMap = ({ stories, onStorySelect }: StarMapProps) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const getStarPosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const radius = 35;
    const spiralFactor = index * 5;
    
    return {
      x: 50 + Math.cos(angle) * (radius + spiralFactor * 0.3),
      y: 50 + Math.sin(angle) * (radius + spiralFactor * 0.3),
    };
  };

  const getCardPosition = (pos: { x: number; y: number }) => {
    const isRight = pos.x > 50;
    const isBottom = pos.y > 50;
    const isNearRight = pos.x > 70;
    const isNearLeft = pos.x < 30;
    const isNearTop = pos.y < 30;
    const isNearBottom = pos.y > 70;

    let position = '';
    let transform = '';

    if (isNearRight) {
      position = 'right-full mr-8';
      transform = 'top-1/2 -translate-y-1/2';
    } else if (isNearLeft) {
      position = 'left-full ml-8';
      transform = 'top-1/2 -translate-y-1/2';
    } else if (isNearBottom) {
      position = 'bottom-full mb-8';
      transform = 'left-1/2 -translate-x-1/2';
    } else if (isNearTop) {
      position = 'top-full mt-8';
      transform = 'left-1/2 -translate-x-1/2';
    } else if (isRight && !isBottom) {
      position = 'left-full ml-8';
      transform = 'top-1/2 -translate-y-1/2';
    } else if (isRight && isBottom) {
      position = 'left-full ml-8';
      transform = 'top-1/2 -translate-y-1/2';
    } else if (!isRight && isBottom) {
      position = 'right-full mr-8';
      transform = 'top-1/2 -translate-y-1/2';
    } else {
      position = 'right-full mr-8';
      transform = 'top-1/2 -translate-y-1/2';
    }

    return { position, transform };
  };

  const generatePath = () => {
    if (stories.length === 0) return '';

    let path = '';
    stories.forEach((_, index) => {
      const pos = getStarPosition(index, stories.length);
      if (index === 0) {
        path += `M ${pos.x} ${pos.y}`;
      } else {
        path += ` L ${pos.x} ${pos.y}`;
      }
    });

    if (stories.length > 1) {
      const firstPos = getStarPosition(0, stories.length);
      path += ` L ${firstPos.x} ${firstPos.y}`;
    }

    return path;
  };

  return (
    <div
      className="relative w-full h-[600px] rounded-2xl overflow-hidden"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-space-dark via-space-dark to-purple-950/30">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <motion.path
          d={generatePath()}
          stroke="white"
          strokeWidth="0.15"
          fill="none"
          strokeDasharray="1000"
          initial={{ strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          opacity={0.6}
        />
      </svg>

      {stories.map((story, index) => {
        const pos = getStarPosition(index, stories.length);
        const isHovered = hoveredStar === story.id;
        const { position, transform } = getCardPosition(pos);

        return (
          <motion.div
            key={story.id}
            className="absolute cursor-pointer"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onHoverStart={() => setHoveredStar(story.id)}
            onHoverEnd={() => setHoveredStar(null)}
            onClick={() => onStorySelect(story.id)}
          >
            <div className="relative w-12 h-12">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, transparent 70%)',
                  filter: 'blur(12px)',
                }}
                animate={{
                  scale: isHovered ? [1, 1.6, 1] : [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 20%, rgba(255,255,255,0.4) 40%, transparent 60%)',
                  filter: 'blur(6px)',
                }}
                animate={{
                  scale: isHovered ? [1, 1.4, 1] : [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: isHovered ? '16px' : '12px',
                  height: isHovered ? '16px' : '12px',
                  background: 'radial-gradient(circle, #ffffff 0%, #e0e0e0 40%, #b0b0b0 80%)',
                  borderRadius: '50%',
                  boxShadow: '0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,255,255,0.8)',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {[0, 45, 90, 135].map((rotation, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: isHovered ? '24px' : '18px',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
                    transform: `rotate(${rotation}deg)`,
                    filter: 'blur(1px)',
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className={`absolute ${position} ${transform} w-72 z-50`}
                  initial={{ opacity: 0, x: -20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative rounded-xl overflow-hidden border border-blue-400/30 bg-black/80 backdrop-blur-xl shadow-2xl">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>

                    <div className="p-4">
                      <h3 className="text-xl font-bold text-blue-300 mb-2">
                        {story.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-300/80">
                          {story.pages} pages
                        </span>
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs border border-blue-400/30">
                          {story.category}
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-blue-400/20">
                        <span className="text-blue-400 text-sm font-semibold">
                          Click to read →
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-blue-500/20 rounded-full scale-150" />
          
          <div className="relative bg-black/50 backdrop-blur-md rounded-2xl px-8 py-4 border border-blue-400/30">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 via-blue-400 to-purple-300 bg-clip-text text-transparent">
              Story Constellation
            </h2>
            <p className="text-blue-300/60 text-sm mt-1">
              Hover to explore • Click to read
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StarMap;
