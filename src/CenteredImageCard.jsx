import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Computer,
  Trophy,
  Network,
  Lightbulb,
  Heart,
} from "lucide-react";
import cover from "./image/cover.png";
import dock1 from "./image/dock1.png";
import dock2 from "./image/dock2.png";
import dock3 from "./image/dock3.png";
import dock4 from "./image/dock4.png";
import dock5 from "./image/dock5.png";


const flashcards = [
  {
    id: 0,
    title: "WHY IEEE NSUT?",
    content:
      "Discover the power of global engineering excellence and innovation at your fingertips",
    icon: <BookOpen className="w-8 h-8 sm:w-12 md:w-16 lg:w-16" />,
    backgroundColor: "#003366",
    isCover: true,
    imageUrl: cover,
    imageAlt: "Technology and innovation",
  },
  {
    id: 1,
    title: "Supercharge Your Skills Like a Tech Pro",
    content:
      "Get exclusive access to immersive workshops, hands-on projects, and technical talks that turn you from student to standout—master everything from coding to cutting-edge tech frameworks. Build real-world applications, learn from industry experts, and gain the technical expertise that sets you apart in today's competitive landscape.",
    icon: <Computer className="w-8 h-8 sm:w-10 md:w-12 lg:w-12" />,
    backgroundColor: "#0066CC",
    imageUrl:dock1,
    imageAlt: "Programming and coding",
  },
  {
    id: 2,
    title: "Experience That Makes Recruiters Notice You",
    content:
      "Lead events, organize conferences, and compete in national contests. Your resume will shine with real-world achievements and leadership experience. From organizing tech symposiums to leading project teams, you'll develop the leadership skills and portfolio that make you irresistible to top employers and graduate programs.",
    icon: <Trophy className="w-8 h-8 sm:w-10 md:w-12 lg:w-12" />,
    backgroundColor: "#0080FF",
    imageUrl:dock2,
    imageAlt: "Professional achievement and success",
  },
  {
    id: 3,
    title: "Build a Network That Opens Doors Worldwide",
    content:
      "Connect with 400,000+ global engineers, industry leaders, and innovators. IEEE is your fast pass to mentorship, internships, and career-changing connections. Access exclusive networking events, connect with alumni working at top tech companies, and build relationships that will accelerate your career trajectory beyond imagination.",
    icon: <Network className="w-8 h-8 sm:w-10 md:w-12 lg:w-12" />,
    backgroundColor: "#004C99",
    imageUrl: dock3,
    imageAlt: "Global networking and connections",
  },
  {
    id: 4,
    title: "Stay Ahead of the Curve",
    content:
      "Dive into IEEE's digital library and stay updated on the latest tech trends, research, and innovations before anyone else. Get early access to cutting-edge research papers, emerging technologies, and industry insights that keep you at the forefront of technological advancement and innovation.",
    icon: <Lightbulb className="w-8 h-8 sm:w-10 md:w-12 lg:w-12" />,
    backgroundColor: "#1E5A96",
    imageUrl: dock4,
    imageAlt: "Innovation and research",
  },
  {
    id: 5,
    title: "Make Friends for Life",
    content:
      "Join a vibrant, passionate community where collaboration and fun are standard. Build friendships and professional relationships that last way beyond your college years. Participate in social events, hackathons, and collaborative projects that create bonds with like-minded individuals who share your passion for technology and innovation.",
    icon: <Heart className="w-8 h-8 sm:w-10 md:w-12 lg:w-12" />,
    backgroundColor: "#2E6DA4",
    imageUrl: dock5,
    imageAlt: "Community and friendship",
  },
];

const CenteredImageCard = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState(new Set());

  // Preload all images on component mount
  useEffect(() => {
    const imageUrls = flashcards
      .filter((card) => card.imageUrl)
      .map((card) => card.imageUrl);

    const preloadImages = async () => {
      const loadPromises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(url);
          img.onerror = reject;
          img.src = url;
        });
      });

      try {
        const loadedUrls = await Promise.all(loadPromises);
        setPreloadedImages(new Set(loadedUrls));
      } catch (error) {
        console.warn("Some images failed to preload:", error);
      }
    };

    preloadImages();
  }, []);

  // Auto-advance cards every 4 seconds
  useEffect(() => {
    if (!isAutoAdvancing) return;

    const interval = setInterval(() => {
      if (!isFlipping) {
        nextCard();
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [currentCard, isFlipping, isAutoAdvancing]);

  const nextCard = () => {
    if (isFlipping) return;

    setIsFlipping(true);

    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % flashcards.length);
      setIsFlipping(false);
    }, 300);
  };

  const getCardStyle = (index) => {
    const offset = index - currentCard;

    if (offset < 0 || offset > 2) return { display: "none" };

    const zIndex = 100 - offset;
    const isMobile = window.innerWidth < 640;
    const translateY = offset * (isMobile ? 6 : 8);
    const translateX = offset * (isMobile ? 3 : 4);
    const scale = 1 - offset * (isMobile ? 0.02 : 0.02);
    const opacity = offset === 0 ? 1 : 0.8 - offset * 0.25;
    const rotateX = offset * (isMobile ? 0.5 : 1);

    return {
      transform: `translateY(${translateY}px) translateX(${translateX}px) scale(${scale}) rotateX(${rotateX}deg)`,
      zIndex,
      opacity,
      transition:
        isFlipping && offset === 0
          ? "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto perspective-1000">
      <div className="relative h-[28rem] sm:h-[22rem] md:h-[24rem] lg:h-[26rem] xl:h-[28rem]">
        {flashcards.map((card, index) => {
          const offset = index - currentCard;
          if (offset < 0 || offset > 2) return null;

          return (
            <div
              key={card.id}
              className={`absolute inset-0 cursor-pointer transform-gpu ${
                isFlipping && index === currentCard ? "animate-flip-out" : ""
              }`}
              style={getCardStyle(index)}
              onClick={() => {
                if (index === currentCard) {
                  setIsAutoAdvancing(false);
                  nextCard();
                }
              }}
              onMouseEnter={() => setIsAutoAdvancing(false)}
              onMouseLeave={() => setIsAutoAdvancing(true)}
            >
              {/* Card Content */}
              <div
                className={`w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl shadow-2xl shadow-blue-500/40 text-white relative overflow-hidden border border-blue-300/30 backdrop-blur-sm transform transition-all duration-200 hover:shadow-3xl hover:shadow-blue-500/60 hover:border-blue-300/50`}
                style={{ backgroundColor: card.backgroundColor }}
              >
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 w-8 h-8 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 border border-white/30 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 w-6 h-6 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 border border-white/30 rounded-full animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 right-1/4 w-4 h-4 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 border border-white/20 rounded-full animate-pulse delay-500"></div>

                  <div className="absolute top-1/4 left-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-white/30 rounded-full animate-ping"></div>
                  <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping delay-700"></div>
                </div>

                <div className="absolute top-0 right-0 w-8 h-8 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-tr-full"></div>

                {card.isCover && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 lg:top-6 lg:right-6 text-white/40 text-xs sm:text-sm font-mono tracking-wider bg-white/10 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg backdrop-blur-sm border border-white/20">
                    EST. 1884
                  </div>
                )}

                {/* New Layout with Title at Top, Image in Center, Content Surrounding */}
                <div className="relative z-10 h-full p-4 md:p-6 lg:p-8">
                  {/* Top Section - Title and Icon */}
                  <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                    <div className="text-white/90 drop-shadow-lg">
                      {card.icon}
                    </div>
                    {!card.isCover && (
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg font-bold backdrop-blur-sm border border-white/30 shadow-lg">
                        {index}
                      </div>
                    )}
                  </div>

                  {/* Title Section - Increased font size */}
                  <div className="text-center mb-2 sm:mb-3 md:mb-4">
                    <h2
                      className={`${
                        card.isCover
                          ? "text-xl sm:text-3xl md:text-4xl lg:text-5xl"
                          : "text-lg sm:text-2xl md:text-3xl lg:text-4xl"
                      } font-bold leading-tight tracking-tight`}
                    >
                      {card.title}
                    </h2>
                  </div>

                  {/* Content with image on left and content on right (row for desktop, column for mobile) */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-center h-[calc(100%-100px)] sm:h-[calc(100%-120px)] overflow-hidden">
                    {/* Image Section - Positioned on left for desktop, top for mobile with reduced size on mobile */}
                    <div className="flex justify-center mb-3 sm:mb-0 sm:mr-6 mt-1 sm:mt-0 sm:flex-shrink-0 max-w-[40%] sm:max-w-none mx-auto">
                      {card.imageUrl && (
                        <div className="w-20 h-20 sm:w-32 md:w-40 lg:w-48 sm:h-32 md:h-40 lg:h-48 relative rounded-full overflow-hidden border-3 border-white/40 shadow-xl">
                          <img
                            src={card.imageUrl}
                            alt={card.imageAlt}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${
                              preloadedImages.has(card.imageUrl)
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                            loading="eager"
                            decoding="async"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Content Section - Clear separation from image on mobile with reduced height */}
                    <div className="w-full sm:flex-grow overflow-auto px-2 sm:px-5 pb-1 sm:pb-2 flex flex-col justify-center mt-1 sm:mt-0 max-h-[120px] sm:max-h-none">
                      <p
                        className={`${
                          card.isCover
                            ? "text-xs sm:text-lg md:text-xl lg:text-2xl"
                            : "text-xs sm:text-base md:text-lg lg:text-xl"
                        } leading-tight sm:leading-relaxed opacity-95 font-medium text-center sm:text-left tracking-wide md:leading-relaxed`}
                      >
                        {card.content}
                      </p>
                    </div>
                  </div>

                  {/* Pagination Dots */}
                  {!card.isCover && (
                    <div className="mt-3 sm:mt-4 md:mt-5 flex justify-center">
                      <div className="flex space-x-1 sm:space-x-2">
                        {flashcards.slice(1).map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                              idx + 1 === index
                                ? "bg-white shadow-lg scale-125"
                                : "bg-white/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CenteredImageCard;