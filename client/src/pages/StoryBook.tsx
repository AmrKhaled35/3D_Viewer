import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Download, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
interface StoryPage {
  id: number;
  illustration: string;
  text: string;
}

interface CoverPage {
  title: string;
  subtitle: string;
  author: string;
  illustration: string;
}

const coverPage: CoverPage = {
  title: "Leo and the Space Weather",
  subtitle: "Exploring Storms from the Sun",
  author: "A Journey into Solar Science",
  illustration: "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg" // Aurora (shining sky caused by space weather)
};


const storyPages: StoryPage[] = [
  {
    id: 1,
    illustration: "https://tse4.mm.bing.net/th/id/OIP.oujw2Si_ALMqy53u2su9RAHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    text: "The Sun is the engine of space weather. It constantly releases streams of charged particles and bursts of energy that travel across the solar system"
  },
  {
    id: 2,
    illustration: "https://tse4.mm.bing.net/th/id/OIP.oujw2Si_ALMqy53u2su9RAHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    text: "Solar wind is a continuous flow of charged particles from the Sun. It shapes the magnetic environment of planets and can disturb Earth’s protective shield"
  },
  {
    id: 3,
    illustration: "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg",
    text: "One day, Leo discovered an ancient glowing artifact floating among the asteroids. It pulsed with mysterious light, telling stories of civilizations from across the universe."
  },
  {
    id: 4,
    illustration: "https://images.pexels.com/photos/8474647/pexels-photo-8474647.jpeg",
    text: "The artifact showed him a constellation map of endless adventures the time he visited Mars, the day he flew through Saturn's rings, and the moment he saw Earth from space. It reminded him that courage lives in every explorer's heart."
  },
  {
    id: 5,
    illustration: "https://images.pexels.com/photos/39896/space-station-moon-landing-apollo-15-james-irwin-39896.jpeg",
    text: "Leo smiled, holding the artifact close as Earth glowed in the distance. He realized that the greatest adventures aren't just discovered—they're lived, remembered, and shared across the stars forever."
  }
];

const StoryBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const isCoverPage = currentPage === 0;
  const page = !isCoverPage ? storyPages[currentPage - 1] : null;

  const goToNextPage = () => {
    const maxPage = storyPages.length; 
    if (currentPage < maxPage && !isAnimating) {
      setIsAnimating(true);
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsAnimating(false);
      }, 600);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0 && !isAnimating) {
      setIsAnimating(true);
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsAnimating(false);
      }, 600);
    }
  };

  const togglePlay = () => {
    if (isCoverPage) return;
    
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(page!.text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => {
        setIsPlaying(false);
        if (currentPage < storyPages.length) {
          goToNextPage();
        }
      };
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };
  
  const drawBorder = (doc: jsPDF, pageWidth: number, pageHeight: number) => {
    const goldColor = [184, 134, 11];
    doc.setDrawColor(...goldColor);
    doc.setLineWidth(2);
    doc.rect(30, 30, pageWidth - 60, pageHeight - 60, "S");
    doc.setLineWidth(0.5);
    doc.rect(35, 35, pageWidth - 70, pageHeight - 70, "S");
  };
  
  const downloadPDF = async () => {
    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    try {
      const images = await Promise.all(storyPages.map((p) => loadImage(p.illustration)));
      const coverImage = await loadImage(coverPage.illustration);
  
      doc.addImage(coverImage, "JPEG", 0, 0, pageWidth, pageHeight);
      const titleY = pageHeight / 2 - 60;
      doc.setFont("times", "bold");
      doc.setFontSize(46);
      doc.setTextColor(255, 255, 255);
      doc.text(coverPage.title, pageWidth / 2, titleY, { align: "center" });
      doc.setFont("times", "italic");
      doc.setFontSize(24);
      doc.setTextColor(230, 230, 230);
      doc.text(coverPage.subtitle, pageWidth / 2, titleY + 40, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(18);
      doc.setTextColor(240, 220, 180);
      doc.text(coverPage.author, pageWidth / 2, titleY + 80, { align: "center" });
  
      storyPages.forEach((page, index) => {
        doc.addPage();
        doc.setFillColor(249, 241, 223);
        doc.rect(0, 0, pageWidth, pageHeight, "F");
        drawBorder(doc, pageWidth, pageHeight);
  
        const borderMargin = 45;
        const contentWidth = pageWidth - 2 * borderMargin;
        const contentHeight = pageHeight - 2 * borderMargin;
  
        const chapterY = borderMargin + 30;
        doc.setFont("times", "bold");
        doc.setFontSize(22);
        doc.setTextColor(100, 80, 50);
        doc.text(`Chapter ${page.id}`, pageWidth / 2, chapterY, { align: "center" });
  
        const img = images[index];
        const imgWidth = contentWidth;
        const imgHeight = contentHeight * 0.4;
        const imgX = borderMargin;
        const imgY = chapterY + 20;
        doc.addImage(img, "JPEG", imgX, imgY, imgWidth, imgHeight);
  
        let textY = imgY + imgHeight + 50;
        const text = page.text;
  
        doc.setFont("times", "normal");
        doc.setFontSize(18);
        doc.setTextColor(60, 50, 30);
        doc.setLineHeightFactor(1.6);
  
        if (index === 0) {
          const firstLetter = text.charAt(0);
          const restText = text.slice(1);
          doc.setFont("times", "bold");
          doc.setFontSize(48);
          doc.setTextColor(184, 134, 11);
          doc.text(firstLetter, borderMargin, textY);
          doc.setFont("times", "normal");
          doc.setFontSize(18);
          doc.setTextColor(60, 50, 30);
          const textLines = doc.splitTextToSize(restText, contentWidth - 30);
          doc.text(textLines, borderMargin + 30, textY - 5);
        } else {
          const textLines = doc.splitTextToSize(text, contentWidth - 30);
          doc.text(textLines, borderMargin, textY);
        }
  
        const pageNumY = pageHeight - 50;
        doc.setFillColor(184, 134, 11);
        doc.circle(pageWidth / 2, pageNumY, 15, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text((index + 1).toString(), pageWidth / 2, pageNumY + 4, { align: "center" });
      });
  
      doc.addPage();
      doc.setFillColor(249, 241, 223);
      doc.rect(0, 0, pageWidth, pageHeight, "F");
      doc.setFont("times", "italic");
      doc.setFontSize(28);
      doc.setTextColor(100, 80, 50);
      doc.text("The End", pageWidth / 2, pageHeight / 2 - 20, { align: "center" });
      doc.setFontSize(16);
      doc.setTextColor(120, 100, 70);
      doc.text("Thank you for reading!", pageWidth / 2, pageHeight / 2 + 20, { align: "center" });
      doc.save(`${coverPage.title.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("حدث خطأ أثناء إنشاء الـ PDF. يرجى المحاولة مرة أخرى.");
    }
  };
  
  
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #050510 50%, #0a0a18 100%)",
      }}
    >
      {Array.from({ length: 100 }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const opacity = Math.random() * 0.7 + 0.3;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: size + "px",
              height: size + "px",
              top: top + "%",
              left: left + "%",
              opacity: opacity,
              animation: `twinkle ${duration}s infinite ${delay}s`,
            }}
          />
        );
      })}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .story-text::first-letter {
          font-size: 3.5em;
          line-height: 0.8;
          float: left;
          margin: 0.1em 0.1em 0 0;
          font-weight: bold;
          color: #4a6eff;
          text-shadow: 0 0 20px rgba(74, 110, 255, 0.4);
        }
      `}</style>

      <div className="w-full max-w-7xl relative z-10">
        <div className="text-right mb-4">
          <p
            className="text-sm md:text-base tracking-wider uppercase italic"
            style={{
              color: "#4a6eff",
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            Storybook
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(10, 15, 25, 0.85)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(74, 110, 255, 0.15)",
            border: "1px solid rgba(74, 110, 255, 0.15)",
          }}
        >
          {isCoverPage ? (
            // Cover Page
            <div className="grid md:grid-cols-2 gap-0">
              <div
                className="relative aspect-[3/4] md:aspect-auto md:min-h-[700px] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(8, 10, 20, 0.9) 0%, rgba(15, 20, 35, 0.9) 100%)",
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? "scale(0.95)" : "scale(1)",
                  transition: "all 0.7s",
                }}
              >
                <img
                  src={coverPage.illustration}
                  alt="Cover illustration"
                  className="w-full h-full object-cover"
                  style={{
                    boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.5)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, transparent 0%, rgba(10, 15, 25, 0.6) 100%)",
                  }}
                />
              </div>

              <div
                className="p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center text-center relative"
                style={{
                  background: "linear-gradient(135deg, rgba(8, 10, 20, 0.95) 0%, rgba(15, 20, 35, 0.95) 100%)",
                  opacity: isAnimating ? 0 : 1,
                  transition: "all 0.7s",
                }}
              >
                <div className="space-y-8">
                  <h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      background: "linear-gradient(135deg, #4a6eff 0%, #6b8bff 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "0 0 40px rgba(74, 110, 255, 0.3)",
                    }}
                  >
                    {coverPage.title}
                  </h1>

                  <p
                    className="text-xl md:text-2xl lg:text-3xl"
                    style={{
                      fontFamily: "'Georgia', 'Times New Roman', serif",
                      color: "#e0e8f0",
                      fontStyle: "italic",
                      textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {coverPage.subtitle}
                  </p>

                  <p
                    className="text-lg md:text-xl"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#4a6eff",
                      textShadow: "0 0 10px rgba(74, 110, 255, 0.3)",
                    }}
                  >
                    {coverPage.author}
                  </p>
                </div>

                <div
                  className="absolute bottom-8 right-8 text-sm"
                  style={{
                    color: "#4a6eff",
                    textShadow: "0 0 10px rgba(74, 110, 255, 0.3)",
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  ★
                </div>
              </div>
            </div>
          ) : (
            // Story Pages
            <div className="grid md:grid-cols-2 gap-0">
              <div
                className="relative aspect-[3/4] md:aspect-auto md:min-h-[600px] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(8, 10, 20, 0.9) 0%, rgba(15, 20, 35, 0.9) 100%)",
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? "scale(0.95)" : "scale(1)",
                  transition: "all 0.7s",
                }}
              >
                <img
                  src={page!.illustration}
                  alt={`Story illustration ${page!.id}`}
                  className="w-full h-full object-cover"
                  style={{
                    boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.5)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, transparent 0%, rgba(10, 15, 25, 0.4) 100%)",
                  }}
                />
              </div>

              <div
                className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative"
                style={{
                  background: "linear-gradient(135deg, rgba(8, 10, 20, 0.95) 0%, rgba(15, 20, 35, 0.95) 100%)",
                  opacity: isAnimating ? 0 : 1,
                  transition: "all 0.7s",
                }}
              >
                <div
                  className="story-text text-lg md:text-xl lg:text-2xl leading-relaxed"
                  style={{
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    color: "#e0e8f0",
                    lineHeight: "1.8",
                    letterSpacing: "0.015em",
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {page!.text}
                </div>

                <div
                  className="absolute bottom-8 right-8 text-sm"
                  style={{
                    color: "#4a6eff",
                    textShadow: "0 0 10px rgba(74, 110, 255, 0.3)",
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  {page!.id}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-8 px-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 0 || isAnimating}
            className="gap-2 transition-all hover:scale-110 px-4 py-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed flex items-center"
            style={{
              background: "rgba(74, 110, 255, 0.1)",
              color: "#4a6eff",
              border: "1px solid rgba(74, 110, 255, 0.3)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex gap-4 items-center">
            {!isCoverPage && (
              <button
                onClick={togglePlay}
                className="gap-2 transition-all hover:scale-110 px-4 py-2 rounded-lg flex items-center"
                style={{
                  background: "linear-gradient(135deg, #4a6eff 0%, #6b8bff 100%)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(74, 110, 255, 0.4)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
            )}

            <button
              onClick={downloadPDF}
              className="gap-2 transition-all hover:scale-110 px-4 py-2 rounded-lg flex items-center"
              style={{
                background: "rgba(74, 110, 255, 0.1)",
                color: "#4a6eff",
                border: "1px solid rgba(74, 110, 255, 0.3)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <Download className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {/* Cover page indicator */}
              <button
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    window.speechSynthesis.cancel();
                    setIsPlaying(false);
                    setTimeout(() => {
                      setCurrentPage(0);
                      setIsAnimating(false);
                    }, 600);
                  }
                }}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: currentPage === 0 ? "32px" : "8px",
                  height: "8px",
                  background:
                    currentPage === 0
                      ? "linear-gradient(135deg, #4a6eff 0%, #6b8bff 100%)"
                      : "rgba(74, 110, 255, 0.3)",
                  boxShadow: currentPage === 0 ? "0 0 10px rgba(74, 110, 255, 0.5)" : "none",
                }}
                aria-label="Go to cover page"
              />
              {/* Story pages indicators */}
              {storyPages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      window.speechSynthesis.cancel();
                      setIsPlaying(false);
                      setTimeout(() => {
                        setCurrentPage(index + 1);
                        setIsAnimating(false);
                      }, 600);
                    }
                  }}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: currentPage === index + 1 ? "32px" : "8px",
                    height: "8px",
                    background:
                      currentPage === index + 1
                        ? "linear-gradient(135deg, #4a6eff 0%, #6b8bff 100%)"
                        : "rgba(74, 110, 255, 0.3)",
                    boxShadow: currentPage === index + 1 ? "0 0 10px rgba(74, 110, 255, 0.5)" : "none",
                  }}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === storyPages.length || isAnimating}
            className="gap-2 transition-all hover:scale-110 px-4 py-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed flex items-center"
            style={{
              background: "rgba(74, 110, 255, 0.1)",
              color: "#4a6eff",
              border: "1px solid rgba(74, 110, 255, 0.3)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div
          className="mt-4 text-center text-sm"
          style={{
            color: "#4a6eff",
            textShadow: "0 0 10px rgba(74, 110, 255, 0.3)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {isCoverPage ? "Cover" : `Page ${currentPage} of ${storyPages.length}`}
        </div>
      </div>
    </div>
  );
};

export default StoryBook;
