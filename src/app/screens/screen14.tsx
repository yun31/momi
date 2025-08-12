"use client";

import React from "react";
import Image from "next/image";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import ExhibitionHeader from "../components/ExhibitionHeader";

interface Screen14Props {
  onBack?: () => void;
  onHome?: () => void;
  onLearnMore?: () => void;
}

const Screen14: React.FC<Screen14Props> = ({ onBack, onHome, onLearnMore }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/asset/background2.png"
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
      <ExhibitionHeader exhibitionNumber={2} title="모두가 고민하는 미술관" />

      {/* 메인 콘텐츠 */}
      <div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{ height: "calc(100vh - 70px)", marginTop: "70px" }}
      >
        {/* 안내문 박스 */}
        <div className="flex justify-center items-center w-screen">
          <div className="bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl p-20 w-4/5 h-[75vh] flex flex-col items-center justify-center overflow-hidden">
            {/* 헤딩 문구 */}
            <div className="text-center mb-12">
              <p className="text-lg sm:text-xl text-gray-800 leading-loose font-medium">
                미술관 관람이 모두 끝났습니다. 관람은 즐거우셨나요?
                <br />
                <span className="font-bold">
                  시각장애인에 대한 자세한 이해는 더 좋은 대화형 감상법 전달에
                  도움이 됩니다.
                </span>
                <br />
                아래 더 알아보기 버튼을 누르면 시각장애인에 대한 더 많은 정보를
                확인할 수 있습니다.
              </p>
            </div>

            {/* 버튼 영역 */}
            <div className="flex flex-row items-center justify-center space-x-8">
              <button
                onClick={onHome}
                className="bg-[#EA8585] text-white px-8 py-3 border-2 border-white/30 rounded-xl font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                처음으로 돌아가기
              </button>

              <button
                onClick={onLearnMore}
                className="bg-[#502589] text-white px-8 py-3 border-2 border-white/30 rounded-xl font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                더 알아보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen14;
