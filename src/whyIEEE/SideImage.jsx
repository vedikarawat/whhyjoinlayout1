import React from "react";

const SideImage = () => (
  <div className="w-full flex items-center justify-center py-4">
    <div className="relative aspect-square w-[250px] sm:w-[340px] md:w-[400px] xl:w-[440px]">
      <div className="absolute top-6 left-6 w-full h-full rounded-3xl border-4 border-blue-800 bg-[#101020] opacity-80 -z-10" />
      <div className="absolute top-12 left-12 w-full h-full rounded-3xl border-4 border-blue-900 bg-[#0b0d19] opacity-50 -z-20" />
      <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-600 relative z-10 w-full h-full flex items-center justify-center">
        <img
          src="https://i.ibb.co/9bHzv5H/ieee-delhi-section-dssywlc.png"
          alt="IEEE Delhi Section Event"
          className="object-contain w-full h-full bg-black"
          style={{ background: "transparent" }}
        />
      </div>
    </div>
  </div>
);

export default SideImage;
