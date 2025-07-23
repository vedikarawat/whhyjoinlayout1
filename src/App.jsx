import React from "react";
import Tagline from "./Tagline";
// import FlashcardDock from "./FlashcardDock";
import FlashcardDock from "./new";
function App(){
    return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-0">
      <div className="absolute inset-0 bg-gradient-radial from-[#1e3a8a]/20 via-transparent to-transparent"></div>

      <div className="relative w-full flex flex-col items-center -mt-6 -sm:mt-6">
        <Tagline />
        <FlashcardDock />
      </div>
    </div>
  );
};



export default App;
