"use client";

import React from "react";

interface HomeButtonProps {
  onHome?: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onHome }) => {
  const handleHome = () => {
    if (onHome) {
      onHome();
    }
  };

  return (
    <button
      onClick={handleHome}
      className="bg-white/60 border border-white/30 text-gray-500 font-bold py-3 px-4 rounded-xl text-sm transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
      처음으로
    </button>
  );
};

export default HomeButton;
