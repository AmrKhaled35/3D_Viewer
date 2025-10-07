import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Download, BookOpen } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
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

interface Story {
  id: number;
  cover: CoverPage;
  pages: StoryPage[];
}

const allStories = [
  {
    id: 1,
    cover: {
      title: "Solar Storms",
      subtitle: "Exploring Storms from the Sun",
      author: "A Journey into Solar Science",
      illustration: "https://assets.science.nasa.gov/dynamicimage/assets/science/hpd/space-weather/SDO_5-14-25_0818UT_131-304.jpg?crop=faces%2Cfocalpoint&fit=clip&h=4096&w=4096"
    },
    pages: [
      { 
        id: 1, 
        illustration: "https://www.nasa.gov/wp-content/uploads/2017/09/sept10x8blend1311714k.jpg", 
        text: "The Sun is the engine of space weather, constantly sending out streams of charged particles. These streams, known as solar winds, can reach Earth and interact with our planet's magnetic field. Scientists study these interactions to predict space weather and protect modern technology." 
      },
      { 
        id: 2, 
        illustration: "https://assets.science.nasa.gov/dynamicimage/assets/science/hpd/space-weather/SDO_5-14-25_0818UT_131-304.jpg?crop=faces%2Cfocalpoint&fit=clip&h=4096&w=4096", 
        text: "Solar wind is a continuous flow of charged particles emitted by the Sun’s corona. When the wind becomes intense, it can disturb satellite communications and GPS systems. Understanding its patterns helps in forecasting potential disruptions in Earth’s atmosphere." 
      },
      { 
        id: 3, 
        illustration: "https://science.nasa.gov/wp-content/uploads/2024/09/cme-soho-eit-c2-2002.jpg?w=768", 
        text: "Magnetic storms can affect satellites and power grids, sometimes leading to blackouts. During major solar events, these storms create spectacular auroras near the poles. Scientists are working on ways to minimize the risks these storms pose to our global infrastructure." 
      },
      { 
        id: 4, 
        illustration: "https://science.nasa.gov/wp-content/uploads/2024/05/sdo-x5pt8-flare-0122ut-may-11-2024-171-193-131.jpg", 
        text: "Understanding solar storms helps protect astronauts and spacecraft from dangerous radiation. With better solar observation tools, we can predict these storms earlier. This knowledge ensures safer exploration of space and more resilient technologies on Earth." 
      },
    ]
  },
  {
    id: 2,
    cover: {
      title: "Aurora Borealis",
      subtitle: "Northern Lights Magic",
      author: "Journey Across the Arctic",
      illustration: "https://www.nasa.gov/wp-content/uploads/2023/03/25937026477_4b7949e87d_o.jpg"
    },
    pages: [
      { 
        id: 1, 
        illustration: "https://www.nasa.gov/wp-content/uploads/2023/03/626125main_iss030e097783_full.jpg?w=1041", 
        text: "Auroras light up the sky with colors of green, pink, and violet, dancing like curtains of light. They appear mostly in polar regions, where Earth’s magnetic field interacts with solar particles. This mesmerizing phenomenon has fascinated humans for centuries." 
      },
      { 
        id: 2, 
        illustration: "https://science.nasa.gov/wp-content/uploads/2024/08/sinha-aurorasaurus-pho-20240411.jpg?w=720", 
        text: "The aurora is caused by charged particles from the Sun colliding with gases in Earth's atmosphere. Oxygen produces green and red lights, while nitrogen adds blue and purple hues. The intensity of the aurora depends on solar activity and geomagnetic conditions." 
      },
      { 
        id: 3, 
        illustration: "https://science.nasa.gov/wp-content/uploads/2024/08/sinha-aurorasaurus-pho-20240411.jpg?w=720", 
        text: "Travelers from around the world visit Norway, Iceland, and Canada to witness the Northern Lights. Photographers capture breathtaking scenes under frozen skies. Seeing an aurora in person is often described as a once-in-a-lifetime experience." 
      },
      { 
        id: 4, 
        illustration: "https://science.nasa.gov/wp-content/uploads/2024/08/sinha-aurorasaurus-pho-20240411.jpg?w=720", 
        text: "Auroras have inspired countless myths and legends across cultures. Some ancient people believed they were messages from the gods. Today, they remind us of the incredible connection between our planet and the Sun." 
      },
    ]
  },
  {
    id: 3,
    cover: {
      title: "Coronal Mass Ejections",
      subtitle: "Sun's Explosive Phenomena",
      author: "Solar Science Today",
      illustration: "https://tse1.mm.bing.net/th/id/OIP.vTtSfff-13-kDRct9e1EMgHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    pages: [
      { 
        id: 1, 
        illustration: "https://pwg.gsfc.nasa.gov/istp/nicky/Image1.gif", 
        text: "Coronal Mass Ejections, or CMEs, are massive explosions on the Sun’s surface. They release billions of tons of plasma into space at incredible speeds. When directed toward Earth, CMEs can create beautiful auroras and also disrupt communication systems." 
      },
      { 
        id: 2, 
        illustration: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2003/02/coronal_mass_ejections_sometimes_reach_out_in_the_direction_of_earth/9851895-3-eng-GB/Coronal_mass_ejections_sometimes_reach_out_in_the_direction_of_Earth.jpg", 
        text: "These eruptions can travel millions of kilometers per hour, reaching Earth within days. They compress Earth’s magnetic field, causing geomagnetic storms. Space agencies monitor the Sun daily to track these massive ejections." 
      },
      { 
        id: 3, 
        illustration: "https://www.nasa.gov/wp-content/uploads/2023/03/faq4.jpg?w=1041", 
        text: "When CMEs interact with our atmosphere, they can interfere with radio waves and satellite signals. Scientists study their magnetic structures to improve forecasting models. Early warnings help protect astronauts and power grids from harmful effects." 
      },
      { 
        id: 4, 
        illustration: "https://cdn.mos.cms.futurecdn.net/46PJLXCiJJcB8HZwLygdJT.jpg", 
        text: "Monitoring CMEs is essential for planning safe space missions. With modern telescopes and spacecraft, scientists can capture detailed images of solar eruptions. These insights help us understand the complex behavior of our nearest star." 
      },
    ]
  },
  {
    id: 4,
    cover: {
      title: "Planet Exploration",
      subtitle: "Visiting the Planets",
      author: "Space Adventurer",
      illustration: "https://th.bing.com/th/id/R.e463d1e189025b98fa20c4e263bca42b?rik=KCUl4cN1jP4ChQ&pid=ImgRaw&r=0"
    },
    pages: [
      { 
        id: 1, 
        illustration: "https://images.openai.com/static-rsc-1/H7q3zquj3_JIbe3ucfOL9OxDjKrO8YMSszUF0MTcl7aHiiG8VpmmvU8YIP7w-_C0x2v-nLXZrTrKa7fd0vMWuTbk1M8zsiTnDl1CUNE2wjch5ts3JNW7V9ojvQp3IDDnJoMqCEp71cpbI_tqWLc9zw", 
        text: "Mars is the fourth planet from the Sun, often called the Red Planet due to its iron-rich soil. It has the largest volcano in the solar system, Olympus Mons. Scientists believe Mars once had liquid water, making it a candidate for ancient life." 
      },
      { 
        id: 2, 
        illustration: "https://images.openai.com/static-rsc-1/8o9tJNH4E3XiU0jr3jwRg0bI_raVENNtkV0cwdVWw3JYgYsHFoMEEgnENiVnrz5C4rPe1LF0BoJBoBkF5TfAU79ilndOxaUkK06KUFl6-U34bQ4SzxGjhau6Op6ZjSicupBhg_xpLKaN1Yhltlaw7w", 
        text: "Jupiter is the largest planet, a gas giant with a massive storm known as the Great Red Spot. Its magnetic field is the strongest among all planets. Jupiter’s many moons, including Europa, may harbor oceans beneath their icy crusts." 
      },
      { 
        id: 3, 
        illustration: "https://images.openai.com/static-rsc-1/SCW0dI9HeMzuF-CT9HQb9olHybE60zT079tgnXyrCK29DNG_XYzGxvm5RUuXx5Xf2SrwSf9T-lrktDYbw5XnVqZlLwiaD1G4r89GuByeyqG5iA7JtTdGiNV7CnL-RvW0LZxC47bf_iHz3c2E6AZNXw", 
        text: "Saturn is famous for its beautiful rings made of ice and rock particles. These rings extend thousands of kilometers but are only a few meters thick. Saturn’s moon Titan also intrigues scientists with its dense atmosphere and methane lakes." 
      },
      { 
        id: 4, 
        illustration: "https://images.openai.com/static-rsc-1/7u6Uh7pn88NGdnMqwWajoxy04bjQzInF3sxSARle9O25G_wmc2zLG-f2BuKBC_ECoVWGjX-rop5YMPZoDcFPOVcqkxZBveQGN8Cnf7cMO-4nBuoeZCsJt9vGhlQ8qWiT6VjDyhxBV5oGZSfmZZDRAg", 
        text: "Exploring planets helps us understand the formation of our solar system. Robotic missions and telescopes continue to reveal new wonders. Each discovery brings us closer to answering whether life exists beyond Earth." 
      },
    ]
  },
  {
    id: 5,
    cover: {
      title: "Black Holes",
      subtitle: "Mysteries of the Universe",
      author: "Astrophysics Insights",
      illustration: "https://myspacemuseum.com/wp-content/uploads/2024/04/Solar-Wind-Effects-on-Earth-2.jpg"
    },
    pages: [
      { 
        id: 1, 
        illustration: "https://tse2.mm.bing.net/th/id/OIP.ITfI5Tf_NYN-mw2LFGpMtQHaF7?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3", 
        text: "Black holes are regions in space where gravity is so strong that nothing can escape. They form when massive stars collapse after exhausting their fuel. Their immense pull bends light and even time itself." 
      },
      { 
        id: 2, 
        illustration: "https://tse3.mm.bing.net/th/id/OIP.-60Fc4fdQ3mxpqsskADRywHaFK?cb=12&w=2074&h=1446&rs=1&pid=ImgDetMain&o=7&rm=3", 
        text: "Nothing, not even light, can escape a black hole’s event horizon. Scientists detect them by observing how they affect nearby stars and gas. These mysterious objects challenge our understanding of physics." 
      },
      { 
        id: 3, 
        illustration: "https://d.newsweek.com/en/full/2336923/black-hole.jpg", 
        text: "Studying black holes helps us explore the extremes of gravity and spacetime. The first image of a black hole, captured in 2019, confirmed many theories of relativity. Each new discovery deepens our cosmic curiosity." 
      },
      { 
        id: 4, 
        illustration: "https://tse4.mm.bing.net/th/id/OIP.2EzI5fduX7uhTwtt3lhEzQHaE7?cb=12&w=1280&h=853&rs=1&pid=ImgDetMain&o=7&rm=3", 
        text: "Black holes can merge, releasing powerful gravitational waves detectable on Earth. These waves ripple through spacetime, carrying stories from distant galaxies. They are a window into some of the universe’s most violent events." 
      },
    ]
  },
  {
    id: 6,
    cover: {
      title: "Galaxies",
      subtitle: "Islands of Stars",
      author: "Cosmic Explorer",
      illustration: "https://tse4.mm.bing.net/th/id/OIP.jzymMuv29kNOg7gAyfPvMwHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    pages: [
      { 
        id: 1, 
        illustration: "https://science.nasa.gov/wp-content/uploads/2023/04/potw2109a-jpg.webp", 
        text: "Galaxies are vast collections of stars, gas, dust, and dark matter bound by gravity. They come in many shapes—spiral, elliptical, and irregular. Each galaxy contains billions of stars, each potentially hosting its own planets." 
      },
      { 
        id: 2, 
        illustration: "https://c02.purpledshub.com/uploads/sites/48/2024/06/10.WhirlpoolGalaxy_HarshwardhanPathak.jpg?w=1200&webp=1", 
        text: "The Milky Way is our home galaxy, stretching over 100,000 light-years. Our Sun is just one of hundreds of billions of stars orbiting its center. Scientists study the Milky Way to understand how galaxies evolve over time." 
      },
      { 
        id: 3, 
        illustration: "https://science.nasa.gov/wp-content/uploads/2023/09/ssc2019-15b-med.jpg?w=1024", 
        text: "Sometimes galaxies collide, merging into larger systems and sparking new waves of star formation. These cosmic interactions reshape the structure of the universe. Observing them helps astronomers trace the history of creation." 
      },
      { 
        id: 4, 
        illustration: "https://c02.purpledshub.com/uploads/sites/41/2018/11/PIA15630-medium-9a2b4d0.jpg?w=1200&webp=1", 
        text: "Exploring galaxies allows us to glimpse the vastness of the cosmos. With advanced telescopes, we can see light that has traveled for billions of years. Every observation reminds us how small, yet special, our place in the universe is." 
      },
    ]
  },
];



const StoryBook = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Find the selected story based on storyId
  const selectedStory: Story | undefined = allStories.find(
    story => story.id.toString() === storyId
  );

  console.log({storyId, selectedStory})
  // Use selected story or default to first story if not found
  const story = selectedStory || allStories[0];
  const coverPage = story.cover;
  const storyPages = story.pages;

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
    doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2]);
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
      alert("An error occurred while generating the PDF. Please try again.");
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