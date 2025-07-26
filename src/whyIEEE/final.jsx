import React, { useEffect, useRef } from "react";
import {
  Computer,
  Trophy,
  Network,
  Lightbulb,
  Heart,
} from "lucide-react";
import cover from "./image/cover.png";

const FEATURE_COLORS = [
  {
    bg: "bg-blue-50",
    border: "border-blue-300",
    iconBg: "bg-blue-700",
    title: "text-blue-900",
    desc: "text-blue-800",
  },
  {
    bg: "bg-blue-100",
    border: "border-blue-400",
    iconBg: "bg-blue-800",
    title: "text-blue-900",
    desc: "text-blue-800",
  },
  {
    bg: "bg-sky-50",
    border: "border-sky-300",
    iconBg: "bg-sky-700",
    title: "text-sky-900",
    desc: "text-sky-800",
  },
  {
    bg: "bg-indigo-50",
    border: "border-indigo-300",
    iconBg: "bg-indigo-700",
    title: "text-indigo-900",
    desc: "text-indigo-800",
  },
  {
    bg: "bg-cyan-50",
    border: "border-cyan-300",
    iconBg: "bg-cyan-700",
    title: "text-cyan-900",
    desc: "text-cyan-800",
  },
];

const features = [
  {
    icon: Computer,
    title: "Supercharge Your Skills Like a Tech Pro",
    description:
      "Get exclusive access to immersive workshops, hands-on projects, and technical talks that turn you from student to standout—master everything from coding to cutting-edge tech frameworks. Build real-world applications, learn from industry experts, and gain the technical expertise that sets you apart in today's competitive landscape.",
  },
  {
    icon: Trophy,
    title: "Experience That Makes Recruiters Notice You",
    description:
      "Lead events, organize conferences, and compete in national contests. Your resume will shine with real-world achievements and leadership experience. From organizing tech symposiums to leading project teams, you'll develop the leadership skills and portfolio that make you irresistible to top employers and graduate programs.",
  },
  {
    icon: Network,
    title: "Build a Network That Opens Doors Worldwide",
    description:
      "Connect with 400,000+ global engineers, industry leaders, and innovators. IEEE is your fast pass to mentorship, internships, and career-changing connections. Access exclusive networking events, connect with alumni working at top tech companies, and build relationships that will accelerate your career trajectory beyond imagination.",
  },
  {
    icon: Lightbulb,
    title: "Stay Ahead of the Curve",
    description:
      "Dive into IEEE's digital library and stay updated on the latest tech trends, research, and innovations before anyone else. Get early access to cutting-edge research papers, emerging technologies, and industry insights that keep you at the forefront of technological advancement and innovation.",
  },
  {
    icon: Heart,
    title: "Make Friends for Life",
    description:
      "Join a vibrant, passionate community where collaboration and fun are standard. Build friendships and professional relationships that last way beyond your college years. Participate in social events, hackathons, and collaborative projects that create bonds with like-minded individuals who share your passion for technology and innovation.",
  },
];

function Docks() {
  const cardsRef = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
      }
    });

    if (imageRef.current) {
      const image = imageRef.current;
      image.style.opacity = "0";
      image.style.transform = "scale(0.95)";
      image.style.transition = "opacity 0.8s ease, transform 0.8s ease";

      const handleImageLoad = () => {
        setTimeout(() => {
          image.style.opacity = "1";
          image.style.transform = "scale(1)";
        }, 300);
      };

      image.addEventListener("load", handleImageLoad);

      if (image.complete) {
        setTimeout(() => {
          image.style.opacity = "1";
          image.style.transform = "scale(1)";
        }, 300);
      }

      return () => image.removeEventListener("load", handleImageLoad);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleCardHover = (e, isEntering) => {
    if (isEntering) {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.transition = "transform 0.3s ease";
    } else {
      e.currentTarget.style.transform = "translateY(0)";
    }
  };

  const handleCardClick = (e, title) => {
    e.currentTarget.style.animation = "pulse 0.6s ease-in-out";
    setTimeout(() => {
      e.currentTarget.style.animation = "";
    }, 600);
  };

  return (
    <div className="min-h-screen bg-black text-blue-400 py-6 px-2 sm:px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Reduced spacing, more lowered on desktop */}
        <div className="text-center mb-8 sm:mb-12 md:mb-20 lg:mb-24 pt-12 sm:pt-16 md:pt-28 lg:pt-36">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-blue-400">
            Why IEEE NSUT?
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-red-600 mx-auto" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Image on top on mobile, right on desktop */}
          <div className="order-1 lg:order-2 mt-0 mb-2 lg:mt-0 lg:mb-0 relative flex justify-center">
            <div className="relative w-full max-w-md md:max-w-lg lg:max-w-none">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-blue-400">
                <img
                  ref={imageRef}
                  src={cover}
                  alt="IEEE NSUT community activities and events"
                  className="w-full h-[180px] xs:h-[240px] sm:h-[300px] md:h-[380px] lg:h-[540px] xl:h-[650px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 -m-2 sm:-m-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl sm:rounded-3xl -z-10 opacity-20"></div>
            </div>
          </div>

          {/* Features below image on mobile, left of image on desktop */}
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const color = FEATURE_COLORS[index % FEATURE_COLORS.length];
              return (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className={`rounded-2xl border shadow-xl p-4 sm:p-6 cursor-pointer transition duration-300 
                  ${color.bg} ${color.border}`}
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                  onClick={(e) => handleCardClick(e, feature.title)}
                  style={{}}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${color.iconBg}`}
                      >
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg sm:text-xl font-bold mb-1 sm:mb-2 ${color.title}`}>
                        {feature.title}
                      </h3>
                      <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${color.desc}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>
        {`
        @keyframes pulse {
          0% { transform: scale(1);}
          50% { transform: scale(1.02);}
          100% { transform: scale(1);}
        }
        `}
      </style>
    </div>
  );
}

export default Docks;