"use client";

import React from "react";
import Image from "next/image";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import ExhibitionHeader from "../components/ExhibitionHeader";

interface Screen6Props {
  onNext?: () => void;
  onBack?: () => void;
  onHome?: () => void;
}

const Screen6: React.FC<Screen6Props> = ({ onNext, onBack, onHome }) => {
  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/asset/background1.png"
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

      {/* 상단 헤더 */}
      <ExhibitionHeader exhibitionNumber={1} title="모두의 미술관" />

      {/* 메인 콘텐츠 */}
      <div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{ height: "calc(100vh - 70px)", marginTop: "70px" }}
      >
        {/* 안내문 박스 */}
        <div className="flex justify-center items-center w-screen">
          <div className="bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl p-12 w-4/5 h-[75vh] flex flex-col justify-center items-center">
            {/* 메인 문구 */}
            <div className="text-center flex-1 flex flex-col justify-center">
              <p className="text-xl sm:text-2xl text-gray-800 mb-16 leading-relaxed font-bold">
                그림을 상상하기 어렵진 않으셨나요?
              </p>
              <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
                전맹 시각장애인이 다음과 같은 설명만으로
                <br />
                작품을 충분히 감상할 수 있다고 느끼셨나요?
              </p>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                잠시 그들의 입장에서 상상하는 시간을 가져봅시다.
              </p>
            </div>

            {/* 다음 버튼 */}
            <div className="mt-6">
              <button
                onClick={handleNext}
                className="bg-[#FFB6C0] hover:bg-[#FFB6C0] text-white font-bold py-5 px-12 rounded-2xl text-lg sm:text-xl transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-3 mx-auto border-2 border-white/30"
              >
                다음으로
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen6;
