"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";

interface Screen2Props {
  onViewExhibition?: () => void;
  onBack?: () => void;
  onHome?: () => void;
}

const Screen2: React.FC<Screen2Props> = ({
  onViewExhibition,
  onBack,
  onHome,
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleViewExhibition = () => {
    if (onViewExhibition) {
      onViewExhibition();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/asset/background.png"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        {/* 반투명 흰색 오버레이 */}
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      {/* 상단 네비게이션 버튼들 */}
      <div className="absolute top-4 left-4 z-20">
        <BackButton onBack={onBack} />
      </div>
      <div className="absolute top-4 right-4 z-20">
        <HomeButton onHome={onHome} />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        {/* 안내문 박스 */}
        <div
          className={`transition-all duration-500 ease-out transform ${
            showContent
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="flex justify-center items-center w-screen">
            <div className="bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl p-16 w-4/5 h-[80vh] flex flex-col justify-center items-center">
              {/* 메인 설명 */}
              <div className="text-center mb-10">
                <p className="text-xl sm:text-2xl text-black mb-4 leading-relaxed font-bold">
                  모두의 미술관{" "}
                  <span className="text-[#EA8585] font-black">
                    &apos;MOMI&apos;
                  </span>
                  에 오신 여러분 환영합니다!
                </p>
                <p className="text-lg sm:text-m text-gray-800 leading-relaxed font-medium">
                  MOMI는 새로운 방식으로 작품 감상할 수 있는 두 전시관으로
                  이루어져 있습니다.
                </p>
              </div>

              {/* 전시관 설명 */}
              <div className="grid md:grid-cols-2 gap-6 mb-10 flex-1 items-center">
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-white/50 h-full">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 leading-10 text-center">
                    <span className="font-medium">제 1 전시관:</span>
                    &nbsp;모두의 미술관
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="/asset/illust1.png"
                        alt="제1전시관 일러스트"
                        width={160}
                        height={160}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        시각장애인의 입장이 되어 나레이션을 통해 작품을
                        관람합니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-white/50 h-full">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 leading-10 text-center">
                    <span className="font-medium">제 2 전시관:</span>
                    &nbsp;모두가 고민하는 미술관
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="/asset/illust2.png"
                        alt="제2전시관 일러스트"
                        width={160}
                        height={160}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        시각장애인에게 작품을 설명하며 전달하는 대화형 감상법을
                        체험합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 안내 메시지 및 버튼 */}
              <div className="text-center">
                <p className="text-lg font-medium mb-4 text-[#666666]">
                  아래 버튼을 눌러{" "}
                  <span className="font-black">제 1 전시관</span>을
                  관람해보세요.
                </p>

                {/* 1전시관 관람하기 버튼 */}
                <button
                  onClick={handleViewExhibition}
                  className="bg-[#EA8585] text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-300 ease-in-out transform hover:scale-105 border-2 border-white/50"
                >
                  제 1 전시관 관람하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen2;
