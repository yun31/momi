"use client";

import React from "react";
import Image from "next/image";

interface Screen1Props {
  onEnterMuseum?: () => void;
}

const Screen1: React.FC<Screen1Props> = ({ onEnterMuseum }) => {
  const handleDoorClick = () => {
    if (onEnterMuseum) {
      onEnterMuseum();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 배경 그라디언트 */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(to bottom, rgb(79, 37, 137) 0%, rgb(79, 37, 137) 80%, rgb(255, 182, 193) 80%, rgb(255, 182, 193) 100%)`,
        }}
      />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        {/* 안내 텍스트 */}
        <div className="mt-12 mb-6 sm:mb-8 lg:mb-12">
          <p className="neon-text text-white text-lg sm:text-xl lg:text-2xl font-medium text-center drop-shadow-lg">
            모두의 미술관 입장을 위해 문을 클릭해주세요
          </p>
        </div>

        {/* 박물관 이미지와 문 컨테이너 */}
        <div className="relative flex items-center justify-center w-full h-full">
          {/* 박물관 이미지 */}
          <div className="absolute bottom-8 w-full flex justify-center">
            <Image
              src="/asset/museum.png"
              alt="Museum"
              width={800}
              height={600}
              priority
              className="w-4/5 h-auto object-contain"
            />

            {/* 문 버튼 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <button
                onClick={handleDoorClick}
                className="relative group focus:outline-none rounded-lg"
                aria-label="박물관 입장"
              >
                <div className="door-pulse">
                  <Image
                    src="/asset/door.png"
                    alt="Door"
                    width={120}
                    height={150}
                    className="w-[10vw] h-auto
                             transition-transform duration-300 ease-in-out
                             group-hover:scale-110 
                             drop-shadow-lg"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS 애니메이션 */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes neonGlow {
          0%,
          100% {
            text-shadow: 0 0 2px #fff, 0 0 4px #fff, 0 0 6px #ff00ff,
              0 0 8px #ff00ff;
          }
          50% {
            text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #ff00ff,
              0 0 4px #ff00ff;
          }
        }

        .neon-text {
          text-shadow: 0 0 2px #fff, 0 0 4px #fff, 0 0 6px #ff00ff,
            0 0 8px #ff00ff;
          animation: neonGlow 3s ease-in-out infinite alternate;
        }

        .door-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .door-pulse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Screen1;
