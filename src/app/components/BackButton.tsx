"use client";

import React from "react";

interface BackButtonProps {
  onBack?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <button
      onClick={handleBack}
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
          d="M15 19l-7-7 7-7"
        />
      </svg>
      이전으로
    </button>
  );
};

export default BackButton;
