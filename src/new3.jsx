// const flashcards = [
//   {
//     id: 0,
//     title: "WHY IEEE NSUT?",
//     content: "Discover the power of global engineering excellence and innovation at your fingertips",
//     icon: <BookOpen className="w-8 h-8 sm:w-12 md:w-16 lg:w-16" />,
//     gradient: "from-blue-900 via-blue-600 to-blue-300",
//     isCover: true,
//     imageUrl: cover,
//     imageAlt: "Technology and innovation",
//   },
//   {
//     id: 1,
//     title: "Supercharge Your Skills Like a Tech Pro",
//     content: "Get exclusive access to immersive workshops, hands-on projects, and technical talks that turn you from student to standout—master everything from coding to cutting-edge tech frameworks.",
//     icon: <Computer className="w-8 h-8 sm:w-10 md:w-12 lg:w-12" />,
//     gradient: "from-blue-600 via-blue-400 to-blue-200",
//     imageUrl: dock1,
//     imageAlt: "Programming and coding",
//   },
//   {
//     id: 2,
//     title: "Experience That Makes Recruiters Notice You",
//     content: "Lead events, organize conferences, and compete in national contests. Your resume will shine with real-world achievements and leadership experience.",
//     icon: <Trophy className="w-8 h-8 sm:w-10 md:w-12 lg:w-12" />,
//     gradient: "from-blue-700 via-blue-300 to-blue-100",
//     imageUrl: dock2,
//     imageAlt: "Professional achievement and success",
//   },
//   {
//     id: 3,
//     title: "Build a Network That Opens Doors Worldwide",
//     content: "Connect with 400,000+ global engineers, industry leaders, and innovators. IEEE is your fast pass to mentorship, internships, and career-changing connections.",
//     icon: <Network className="w-8 h-8 sm:w-10 md:w-12 lg:w-12" />,
//     gradient: "from-blue-800 via-blue-600 to-blue-300",
//     imageUrl: dock3,
//     imageAlt: "Global networking and connections",
//   },
//   {
//     id: 4,
//     title: "Stay Ahead of the Curve",
//     content: "Dive into IEEE's digital library and stay updated on the latest tech trends, research, and innovations before anyone else.",
//     icon: <Lightbulb className="w-8 h-8 sm:w-10 md:w-12 lg:w-12" />,
//     gradient: "from-blue-950 via-blue-800 to-blue-400",
//     imageUrl: dock4,
//     imageAlt: "Innovation and research",
//   },
//   {
//     id: 5,
//     title: "Make Friends for Life",
//     content: "Join a vibrant, passionate community where collaboration and fun are standard. Build friendships and professional relationships that last beyond college.",
//     icon: <Heart className="w-8 h-8 sm:w-10 md:w-12 lg:w-12" />,
//     gradient: "from-blue-900 via-blue-600 to-blue-200",
//     imageUrl: dock5,
//     imageAlt: "Community and friendship",
//   },
// ];

// const FlashcardDock = () => {
//   const [currentCard, setCurrentCard] = useState(0);
//   const [isFlipping, setIsFlipping] = useState(false);
//   const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);

//   // Auto-advance cards every 3 seconds
//   useEffect(() => {
//     if (!isAutoAdvancing) return;

//     const interval = setInterval(() => {
//       if (!isFlipping) {
//         nextCard();
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [currentCard, isFlipping, isAutoAdvancing]);

//   const nextCard = () => {
//     if (isFlipping) return;
//     setIsFlipping(true);
//     setTimeout(() => {
//       setCurrentCard((prev) => (prev + 1) % flashcards.length);
//       setIsFlipping(false);
//     }, 300);
//   };

//   const getCardStyle = (index) => {
//     const offset = index - currentCard;
    
//     // Handle negative offsets (cards that come before current)
//     const normalizedOffset = offset < 0 ? offset + flashcards.length : offset;
    
//     // Only show current card and next 2 cards
//     if (offset < 0 || offset > 2) return { display: "none" };

//     const zIndex = 100 - offset;
//     const translateY = offset * 12; // Increased for better stacking effect
//     const translateX = offset * 6;  // Slight horizontal offset
//     const scale = 1 - offset * 0.05; // More pronounced scaling
//     const opacity = offset === 0 ? 1 : Math.max(0.4, 0.9 - offset * 0.3);
//     const rotateX = offset * 2; // 3D rotation effect

//     return {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       transform: `translateY(${translateY}px) translateX(${translateX}px) scale(${scale}) rotateX(${rotateX}deg)`,
//       transformOrigin: "center center",
//       zIndex,
//       opacity,
//       transition: isFlipping && offset === 0 
//         ? "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)" 
//         : "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//     };
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
//       <div className="relative w-full mx-auto">
//         {/* Container with proper perspective for 3D effect */}
//         <div 
//           className="relative mx-auto"
//           style={{ 
//             perspective: '1200px',
//             perspectiveOrigin: 'center center',
//             height: '500px',
//             width: '100%',
//             maxWidth: '100vw'
//           }}
//         >
//           {flashcards.map((card, index) => {
//             const offset = index - currentCard;
//             if (offset < 0 || offset > 2) return null;

//             return (
//               <div
//                 key={card.id}
//                 className="cursor-pointer transform-gpu"
//                 style={getCardStyle(index)}
//                 onClick={() => {
//                   if (index === currentCard) {
//                     setIsAutoAdvancing(false);
//                     nextCard();
//                   }
//                 }}
//                 onMouseEnter={() => setIsAutoAdvancing(false)}
//                 onMouseLeave={() => setIsAutoAdvancing(true)}
//               >
//                 <div className={`w-full h-full bg-gradient-to-br ${card.gradient} rounded-2xl lg:rounded-3xl shadow-2xl text-white relative overflow-hidden border border-white/20 backdrop-blur-sm hover:shadow-3xl hover:border-white/40 transition-all duration-300`}>
                  
//                   {/* Animated background elements */}
//                   <div className="absolute inset-0 opacity-10">
//                     <div className="absolute top-6 right-6 w-20 h-20 md:w-24 md:h-24 border border-white/30 rounded-full animate-pulse"></div>
//                     <div className="absolute bottom-6 left-6 w-16 h-16 md:w-20 md:h-20 border border-white/30 rounded-full animate-pulse delay-700"></div>
//                     <div className="absolute top-1/2 right-1/4 w-12 h-12 border border-white/20 rounded-full animate-pulse delay-1000"></div>
//                   </div>

//                   {/* Gradient overlays for depth */}
//                   <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
//                   <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-white/10 to-transparent rounded-tr-full"></div>

//                   {/* IEEE Badge for cover */}
//                   {card.isCover && (
//                     <div className="absolute top-4 right-4 text-white/60 text-xs sm:text-sm font-mono tracking-wider bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm border border-white/20">
//                       EST. 1884
//                     </div>
//                   )}

//                   {/* Header with icon and number */}
//                   <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
//                     <div className="text-white/90 drop-shadow-lg transform hover:scale-110 transition-transform duration-200">
//                       {card.icon}
//                     </div>
//                     {!card.isCover && (
//                       <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold backdrop-blur-sm border border-white/30 shadow-lg">
//                         {index}
//                       </div>
//                     )}
//                   </div>

//                   {/* Main content area */}
//                   <div className="relative z-10 h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12 pt-20 pb-12">
//                     {/* Title at top */}
//                     <h2 className={`${card.isCover ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl' : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'} font-bold text-center mb-6 sm:mb-8 lg:mb-12 leading-tight drop-shadow-lg`}>
//                       {card.title}
//                     </h2>

//                     {/* Content with horizontal layout */}
//                     <div className="flex-1 flex items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16">
//                       {/* Left content section */}
//                       <div className="flex-1 text-left">
//                         <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl opacity-95 leading-relaxed font-medium drop-shadow-md">
//                           {card.content.split(' ').slice(0, Math.ceil(card.content.split(' ').length / 3)).join(' ')}
//                         </p>
//                       </div>

//                       {/* Central Image */}
//                       <div className="relative group flex-shrink-0">
//                         <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 xl:w-64 xl:h-64 rounded-2xl overflow-hidden shadow-2xl border-3 border-white/40 transform group-hover:scale-105 transition-all duration-300">
//                           <img
//                             src={card.imageUrl}
//                             alt={card.imageAlt}
//                             className="w-full h-full object-cover"
//                             loading="eager"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
//                         </div>
//                         <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
//                       </div>

//                       {/* Right content section */}
//                       <div className="flex-1 text-right">
//                         <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl opacity-95 leading-relaxed font-medium drop-shadow-md">
//                           {card.content.split(' ').slice(Math.ceil(card.content.split(' ').length / 3)).join(' ')}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Bottom content section */}
//                     <div className="text-center mt-6 sm:mt-8">
//                       <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl opacity-90 leading-relaxed font-medium drop-shadow-md max-w-2xl mx-auto">
//                         {card.isCover ? "Join the world's largest technical professional organization." : "Experience the IEEE difference in your professional journey."}
//                       </p>
//                     </div>

//                     {/* Progress dots */}
//                     {!card.isCover && (
//                       <div className="flex justify-center mt-8">
//                         <div className="flex space-x-3">
//                           {flashcards.slice(1).map((_, idx) => (
//                             <div
//                               key={idx}
//                               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                                 idx + 1 === index 
//                                   ? "bg-white shadow-lg scale-125 shadow-white/50" 
//                                   : "bg-white/40 hover:bg-white/60"
//                               }`}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Navigation hint */}
//         <div className="text-center mt-8 text-white/60">
//           <p className="text-sm">Click cards to advance • Hover to pause auto-advance</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlashcardDock;