"use client";

import React from "react";
import Image from "next/image";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import ExhibitionHeader from "../components/ExhibitionHeader";

interface Screen9Props {
  onReturnToExhibition1?: () => void;
  onGoToExhibition2?: () => void;
  onBack?: () => void;
  onHome?: () => void;
}

const Screen9: React.FC<Screen9Props> = ({
  onReturnToExhibition1,
  onGoToExhibition2,
  onBack,
  onHome,
}) => {
  const handleReturnToExhibition1 = () => {
    if (onReturnToExhibition1) {
      onReturnToExhibition1();
    }
  };

  const handleGoToExhibition2 = () => {
    if (onGoToExhibition2) {
      onGoToExhibition2();
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
            <div className="text-center mb-16">
              <p className="text-xl sm:text-2xl text-gray-800 mb-12 leading-relaxed font-bold">
                제 1 전시관 관람을 마치셨습니다!
              </p>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                다른 작품을 감상해보거나, 제 2 전시관으로 이동해보세요.
              </p>
            </div>

            {/* 선택 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-8 items-center justify-center w-full">
              {/* 제1전시관 다시 감상하기 버튼 */}
              <button
                onClick={handleReturnToExhibition1}
                className="bg-[#FFB6C0] hover:bg-[#FFB6C0] text-white font-bold py-5 px-8 rounded-2xl text-lg transition-all duration-300 ease-in-out transform hover:scale-105 border-2 border-white/30 w-full sm:w-auto min-w-[250px]"
              >
                제 1 전시관 다시 감상하기
              </button>

              {/* 제2전시관으로 넘어가기 버튼 */}
              <button
                onClick={handleGoToExhibition2}
                className="bg-[#502589] hover:bg-[#502589] text-white font-bold py-5 px-8 rounded-2xl text-lg transition-all duration-300 ease-in-out transform hover:scale-105 border-2 border-white/30 w-full sm:w-auto min-w-[250px]"
              >
                제 2 전시관으로 이동하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen9;
