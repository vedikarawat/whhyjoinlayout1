import React from "react";
import DockList from "./DockList"; // adjust import path as needed
import SideImage from "./SideImage"; // adjust import path as needed

function WhyChooseUs() {
  return (
    <section className="bg-black text-blue w-full min-h-screen flex items-center py-14 sm:py-24 px-2 sm:px-8">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col md:flex-row items-stretch gap-10 sm:gap-16">
        {/* Left: Docks (vertical stack) */}
        <div className="w-full md:w-[55%] flex-shrink-0">
          <DockList />
        </div>
        {/* Right: Image */}
        <div className="w-full md:w-[45%] flex-shrink-0 flex items-center justify-center">
          <SideImage />
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
