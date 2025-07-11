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
} from "lucide-react";

interface FlashCard {
  id: number;
  title: string;
  content: string;
  icon: React.ReactNode;
  gradient: string;
  isCover?: boolean;
}

const flashcards: FlashCard[] = [
  {
    id: 0,
    title: "WHY US?",
    content: "",
    icon: <BookOpen className="w-12 h-12" />,
    gradient: "from-[#1e3a8a] via-[#3b82f6] to-[#93c5fd]",
    isCover: true,
  },
  {
    id: 1,
    title: "Supercharge Your Skills Like a Tech Pro",
    content:
      "Get exclusive access to immersive workshops, hands-on projects, and technical talks that turn you from student to standout—master everything from coding to cutting-edge tech frameworks.",
    icon: <Computer className="w-8 h-8" />,
    gradient: "from-[#2563eb] via-[#60a5fa] to-[#bfdbfe]",
  },
  {
    id: 2,
    title: "Experience That Makes Recruiters Notice You",
    content:
      "Lead events, organize conferences, and compete in national contests. Your resume will shine with real-world achievements and leadership experience.",
    icon: <FormInput className="w-8 h-8" />,
    gradient: "from-[#1d4ed8] via-[#93c5fd] to-[#dbeafe]",
  },
  {
    id: 3,
    title: "Build a Network That Opens Doors Worldwide",
    content:
      "Connect with 400,000+ global engineers, industry leaders, and innovators. IEEE  is your fast pass to mentorship, internships, and career-changing connections.",
    icon: <Globe className="w-8 h-8" />,
    gradient: "from-[#1e40af] via-[#3b82f6] to-[#93c5fd]",
  },
  {
    id: 4,
    title: "Stay Ahead of the Curve",
    content:
      "Dive into IEEE's digital library and stay updated on the latest tech trends, research, and innovations before anyone else.",
    icon: <Book className="w-8 h-8" />,
    gradient: "from-[#172554] via-[#1e40af] to-[#60a5fa]",
  },
  {
    id: 5,
    title: "Make Friends for Life",
    content:
      "Join a vibrant, passionate community where collaboration and fun are standard. Build friendships and professional relationships that last way beyond your college years.",
    icon: <Smartphone className="w-8 h-8" />,
    gradient: "from-[#1e3a8a] via-[#2563eb] to-[#bfdbfe]",
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
    }, 2500);

    return () => clearInterval(interval);
  }, [currentCard, isFlipping, isAutoAdvancing]);

  const nextCard = () => {
    if (isFlipping) return;

    setIsFlipping(true);

    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % flashcards.length);
      setIsFlipping(false);
    }, 400);
  };

  const getCardStyle = (index: number) => {
    const offset = index - currentCard;
    const adjustedOffset = offset < 0 ? offset + flashcards.length : offset;

    // Only show current card and next 2 cards
    if (offset < 0 || offset > 2) return { display: "none" };

    const zIndex = 100 - offset;
    const translateY = offset * 6;
    const translateX = offset * 3;
    const scale = 1 - offset * 0.03;
    const opacity = offset === 0 ? 1 : 0.8 - offset * 0.25;
    const rotateX = offset * 2;

    return {
      transform: `translateY(${translateY}px) translateX(${translateX}px) scale(${scale}) rotateX(${rotateX}deg)`,
      zIndex,
      opacity,
      transition:
        isFlipping && offset === 0
          ? "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          : "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1e3a8a]/20 via-transparent to-transparent"></div>

      <div className="relative">
        {/* Flashcards Stack */}
        <div className="relative w-[42rem] h-[30rem] perspective-1000">
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
                  className={`w-full h-full bg-gradient-to-br ${card.gradient} rounded-2xl shadow-2xl shadow-[#60a5fa]/40 p-10 text-white relative overflow-hidden border border-[#93c5fd]/30 backdrop-blur-sm transform transition-all duration-300 hover:shadow-3xl hover:shadow-[#60a5fa]/60 hover:border-[#93c5fd]/50`}
                >
                  {/* Enhanced background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-6 right-6 w-32 h-32 border border-white/30 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-6 left-6 w-24 h-24 border border-white/30 rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-white/20 rounded-full animate-pulse delay-500"></div>

                    {/* Additional decorative elements */}
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping delay-700"></div>
                  </div>

                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-tr-full"></div>

                  {/* Card number indicator for non-cover cards */}
                  {!card.isCover && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold backdrop-blur-sm border border-white/30">
                      {index}
                    </div>
                  )}

                  {/* IEEE logo for cover card */}
                  {card.isCover && (
                    <div className="absolute top-4 right-4 text-white/30 text-xs font-mono tracking-wider">
                      EST. 1884
                    </div>
                  )}

                  {/* Card Header */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-4">
                        <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 shadow-lg">
                          {card.icon}
                        </div>
                      </div>
                      {!card.isCover && (
                        <div className="text-lg font-semibold bg-white/20 px-5 py-3 rounded-full backdrop-blur-sm border border-white/30">
                          {index} / {flashcards.length - 1}
                        </div>
                      )}
                    </div>

                    {/* Card Title */}
                    <h2
                      className={`${
                        card.isCover ? "text-5xl" : "text-4xl"
                      } font-bold mb-8 leading-tight`}
                    >
                      {card.title}
                    </h2>

                    {/* Card Content */}
                    <p
                      className={`${
                        card.isCover ? "text-xl" : "text-lg"
                      } leading-relaxed opacity-95 font-medium`}
                    >
                      {card.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 text-center w-screen">
          {/* Decorative background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3b82f6]/20 to-transparent blur-3xl"></div>

          {/* Main tagline */}
          <div className="relative z-10 px-8">
            <div className="inline-block relative">
              {/* Decorative border */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#1e3a8a] rounded-2xl opacity-20 blur-sm"></div>

              {/* Text container */}
              <div className="relative bg-gradient-to-r from-[#1e3a8a]/30 via-[#3b82f6]/20 to-[#1e3a8a]/30 backdrop-blur-sm border border-[#93c5fd]/30 rounded-xl px-8 py-6">
                <h1 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] via-[#60a5fa] to-[#3b82f6] font-bold tracking-wide">
                  IEEE NSUT
                </h1>
                <p className="text-2xl text-[#93c5fd]/90 font-semibold mt-2 italic">
                  "Your shortcut to global connections and next-level skills."
                </p>

                {/* Decorative elements */}
                <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-[#60a5fa] rounded-tl-lg"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-[#60a5fa] rounded-tr-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-[#60a5fa] rounded-bl-lg"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-[#60a5fa] rounded-br-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return <FlashcardDock />;
}

export default App;
