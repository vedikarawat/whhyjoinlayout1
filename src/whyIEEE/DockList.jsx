import React, { useEffect, useRef } from "react";
import { Computer, Trophy, Network, Lightbulb, Heart } from "lucide-react";

const FEATURE_COLORS = [
  {
    bg: "bg-blue-950",
    border: "border-blue-900",
    iconBg: "bg-blue-950",
    title: "text-blue-200",
    desc: "text-blue-300",
  },
  {
    bg: "bg-blue-900",
    border: "border-blue-800",
    iconBg: "bg-blue-900",
    title: "text-cyan-100",
    desc: "text-cyan-200",
  },
  {
    bg: "bg-blue-800",
    border: "border-blue-700",
    iconBg: "bg-blue-800",
    title: "text-sky-100",
    desc: "text-sky-200",
  },
  {
    bg: "bg-blue-600",
    border: "border-sky-600",
    iconBg: "bg-blue-600",
    title: "text-sky-50",
    desc: "text-sky-100",
  },
  {
    bg: "bg-blue-400",
    border: "border-cyan-400",
    iconBg: "bg-blue-400",
    title: "text-cyan-950",
    desc: "text-cyan-800",
  },
];

const features = [
  {
    icon: Computer,
    title: "Supercharge Your Skills Like a Tech Pro",
    description:
      "Get exclusive access to immersive workshops, hands-on projects, and technical talks that turn you from student to standout—master everything from coding to cutting-edge tech frameworks.",
  },
  {
    icon: Trophy,
    title: "Experience That Makes Recruiters Notice You",
    description:
      "Lead events, organize conferences, and compete in national contests. Your resume will shine with real-world achievements and leadership experience.",
  },
  {
    icon: Network,
    title: "Build a Network That Opens Doors Worldwide",
    description:
      "Connect with 400,000+ global engineers, industry leaders, and innovators. IEEE is your fast pass to mentorship, internships, and career-changing connections.",
  },
  {
    icon: Lightbulb,
    title: "Stay Ahead of the Curve",
    description:
      "Dive into IEEE's digital library and stay updated on the latest tech trends, research, and innovations before anyone else.",
  },
  {
    icon: Heart,
    title: "Make Friends for Life",
    description:
      "Join a vibrant, passionate community where collaboration and fun are standard. Build friendships and professional relationships that last way beyond your college years.",
  },
];

const DockList = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "translateY(50px)";
        card.style.transition = `opacity 0.8s cubic-bezier(.4,2.5,.4,.95) ${
          index * 0.14
        }s, transform 0.8s cubic-bezier(.35,1.7,.41,.77) ${index * 0.14}s`;
        observer.observe(card);
      }
    });
    return () => observer.disconnect();
  }, []);

  const handleCardHover = (e, isEntering) => {
    if (isEntering) {
      e.currentTarget.style.transform = "translateY(-14px)";
      e.currentTarget.style.transition =
        "transform 0.35s cubic-bezier(.36,1.39,.37,1.01)";
    } else {
      e.currentTarget.style.transform = "translateY(0)";
    }
  };

  return (
    <div className="w-full flex flex-col justify-center gap-8 md:pl-0 sm:pl-0 pl-0">
      <h1 className="text-3xl sm:text-5xl font-extrabold mb-7 sm:mb-9 text-blue-500 text-center pt-7 sm:pt-10">
        Why IEEE NSUT?
      </h1>

      <div className="flex flex-col gap-7 sm:gap-9">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          const color = FEATURE_COLORS[index % FEATURE_COLORS.length];
          return (
            <div
              key={feature.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`rounded-3xl border-4 shadow-2xl px-7 py-7 sm:px-12 sm:py-9 cursor-pointer transition duration-300 hover:shadow-[0_8px_48px_16px_rgba(0,0,0,0.22)] w-full flex items-center gap-7 sm:gap-9 ${color.bg} ${color.border}`}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
              style={{ opacity: 1, transform: "translateY(0)" }}
            >
              <div
                className={`flex-shrink-0 w-14 h-14 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center ${color.iconBg}`}
              >
                <IconComponent className="w-8 h-8 sm:w-14 sm:h-14 text-white" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <h3
                  className={`text-lg sm:text-2xl font-bold mb-2 sm:mb-3 ${color.title}`}
                >
                  {feature.title}
                </h3>
                <p className={`text-xs sm:text-lg ${color.desc}`}>
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DockList;
