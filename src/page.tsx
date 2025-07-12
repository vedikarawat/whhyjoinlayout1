import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Code,
  Palette,
  Zap,
  Globe,
  Smartphone,
  ChevronRight,
  Book,
  FormInput,
  Computer,
  Users,
  Trophy,
  Network,
  Lightbulb,
  Heart,
} from "lucide-react";

interface FlashCard {
  id: number;
  title: string;
  content: string;
  icon: React.ReactNode;
  gradient: string;
  isCover?: boolean;
  imageUrl?: string;
  imageAlt?: string;
}

const flashcards: FlashCard[] = [
  {
    id: 0,
    title: "WHY IEEE NSUT?",
    content:
      "Discover the power of global engineering excellence and innovation at your fingertips",
    icon: <BookOpen className="w-16 h-16" />,
    gradient: "from-[#1e3a8a] via-[#3b82f6] to-[#93c5fd]",
    isCover: true,
    imageUrl:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Technology and innovation",
  },
  {
    id: 1,
    title: "Supercharge Your Skills Like a Tech Pro",
    content:
      "Get exclusive access to immersive workshops, hands-on projects, and technical talks that turn you from student to standout—master everything from coding to cutting-edge tech frameworks. Build real-world applications, learn from industry experts, and gain the technical expertise that sets you apart in today's competitive landscape.",
    icon: <Computer className="w-12 h-12" />,
    gradient: "from-[#2563eb] via-[#60a5fa] to-[#bfdbfe]",
    imageUrl:
      "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Programming and coding",
  },
  {
    id: 2,
    title: "Experience That Makes Recruiters Notice You",
    content:
      "Lead events, organize conferences, and compete in national contests. Your resume will shine with real-world achievements and leadership experience. From organizing tech symposiums to leading project teams, you'll develop the leadership skills and portfolio that make you irresistible to top employers and graduate programs.",
    icon: <Trophy className="w-12 h-12" />,
    gradient: "from-[#1d4ed8] via-[#93c5fd] to-[#dbeafe]",
    imageUrl:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Professional achievement and success",
  },
  {
    id: 3,
    title: "Build a Network That Opens Doors Worldwide",
    content:
      "Connect with 400,000+ global engineers, industry leaders, and innovators. IEEE is your fast pass to mentorship, internships, and career-changing connections. Access exclusive networking events, connect with alumni working at top tech companies, and build relationships that will accelerate your career trajectory beyond imagination.",
    icon: <Network className="w-12 h-12" />,
    gradient: "from-[#1e40af] via-[#3b82f6] to-[#93c5fd]",
    imageUrl:
      "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Global networking and connections",
  },
  {
    id: 4,
    title: "Stay Ahead of the Curve",
    content:
      "Dive into IEEE's digital library and stay updated on the latest tech trends, research, and innovations before anyone else. Get early access to cutting-edge research papers, emerging technologies, and industry insights that keep you at the forefront of technological advancement and innovation.",
    icon: <Lightbulb className="w-12 h-12" />,
    gradient: "from-[#172554] via-[#1e40af] to-[#60a5fa]",
    imageUrl:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Innovation and research",
  },
  {
    id: 5,
    title: "Make Friends for Life",
    content:
      "Join a vibrant, passionate community where collaboration and fun are standard. Build friendships and professional relationships that last way beyond your college years. Participate in social events, hackathons, and collaborative projects that create bonds with like-minded individuals who share your passion for technology and innovation.",
    icon: <Heart className="w-12 h-12" />,
    gradient: "from-[#1e3a8a] via-[#2563eb] to-[#bfdbfe]",
    imageUrl:
      "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Community and friendship",
  },
];

const FlashcardDock: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);

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

  const getCardStyle = (index: number) => {
    const offset = index - currentCard;
    const adjustedOffset = offset < 0 ? offset + flashcards.length : offset;

    // Only show current card and next 2 cards
    if (offset < 0 || offset > 2) return { display: "none" };

    const zIndex = 100 - offset;
    const translateY = offset * 8;
    const translateX = offset * 4;
    const scale = 1 - offset * 0.02;
    const opacity = offset === 0 ? 1 : 0.8 - offset * 0.25;
    const rotateX = offset * 1;

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
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1e3a8a]/20 via-transparent to-transparent"></div>

      <div className="relative w-full">
        {/* Flashcards Stack */}
        <div className="relative w-full max-w-7xl mx-auto perspective-1000 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <div className="relative h-[24rem] sm:h-[28rem] md:h-[32rem] lg:h-[36rem] xl:h-[40rem]">
            {flashcards.map((card, index) => {
              const offset = index - currentCard;
              if (offset < 0 || offset > 2) return null;

              return (
                <div
                  key={card.id}
                  className={`absolute inset-0 cursor-pointer transform-gpu ${
                    isFlipping && index === currentCard
                      ? "animate-flip-out"
                      : ""
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
                    className={`w-full h-full bg-gradient-to-br ${card.gradient} rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl shadow-[#60a5fa]/40 text-white relative overflow-hidden border border-[#93c5fd]/30 backdrop-blur-sm transform transition-all duration-200 hover:shadow-3xl hover:shadow-[#60a5fa]/60 hover:border-[#93c5fd]/50`}
                  >
                    {/* Background Image */}
                    {card.imageUrl && (
                      <div className="absolute inset-0 opacity-15">
                        <img
                          src={card.imageUrl}
                          alt={card.imageAlt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50"></div>
                      </div>
                    )}

                    {/* Enhanced background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border border-white/30 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 border border-white/30 rounded-full animate-pulse delay-1000"></div>
                      <div className="absolute top-1/2 right-1/4 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border border-white/20 rounded-full animate-pulse delay-500"></div>

                      {/* Additional decorative elements */}
                      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
                      <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping delay-700"></div>
                    </div>

                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-tr-full"></div>

                    {/* Card number indicator for non-cover cards */}
                    {!card.isCover && (
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center text-sm sm:text-base md:text-lg font-bold backdrop-blur-sm border border-white/30 shadow-lg">
                        {index}
                      </div>
                    )}

                    {/* IEEE logo for cover card */}
                    {card.isCover && (
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 text-white/40 text-xs sm:text-sm font-mono tracking-wider bg-white/10 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg backdrop-blur-sm border border-white/20">
                        EST. 1884
                      </div>
                    )}

                    {/* Card Content Layout */}
                    <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
                        <div className="flex items-center space-x-6">
                          <div className="p-2 sm:p-3 md:p-4 lg:p-5 bg-white/20 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                            {card.icon}
                          </div>
                        </div>
                        {!card.isCover && (
                          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-white/20 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full backdrop-blur-sm border border-white/30 shadow-lg">
                            {index} / {flashcards.length - 1}
                          </div>
                        )}
                      </div>

                      {/* Card Title */}
                      <h2
                        className={`${
                          card.isCover
                            ? "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
                            : "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                        } font-bold mb-3 sm:mb-4 md:mb-6 lg:mb-8 leading-tight`}
                      >
                        {card.title}
                      </h2>

                      {/* Card Content */}
                      <div className="flex-1 flex items-center">
                        <p
                          className={`${
                            card.isCover
                              ? "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                              : "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                          } leading-relaxed opacity-95 font-medium`}
                        >
                          {card.content}
                        </p>
                      </div>

                      {/* Progress Indicator */}
                      {!card.isCover && (
                        <div className="mt-3 sm:mt-4 md:mt-6 flex justify-center">
                          <div className="flex space-x-2">
                            {flashcards.slice(1).map((_, idx) => (
                              <div
                                key={idx}
                                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
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

        {/* Instructions */}
        <div className="absolute -top-12 sm:-top-14 md:-top-16 lg:-top-20 xl:-top-24 left-1/2 transform -translate-x-1/2 text-center px-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#60a5fa] font-bold tracking-wide mb-1 sm:mb-2">
            IEEE NSUT
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#93c5fd] font-medium">
            Your shortcut to global connections and next-level skills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDock;
