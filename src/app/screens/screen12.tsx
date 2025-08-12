"use client";

import React from "react";
import Image from "next/image";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import ExhibitionHeader from "../components/ExhibitionHeader";

interface Screen12Props {
  selectedPainting: "painting1" | "painting2" | "painting3";
  generatedImageUrl: string;
  onBack?: () => void;
  onHome?: () => void;
  onViewOthers?: () => void;
}

const Screen12: React.FC<Screen12Props> = ({
  selectedPainting,
  generatedImageUrl,
  onBack,
  onHome,
  onViewOthers,
}) => {
  // 선택된 그림 경로 가져오기
  const getPaintingImagePath = () => {
    return `/asset/${selectedPainting}.png`;
  };

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
          <div className="bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl p-8 w-4/5 h-[75vh] flex flex-col overflow-hidden leading-loose">
            {/* 헤딩 문구 */}
            <div className="text-center mb-4">
              <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-bold">
                AI가 당신의 설명을 바탕으로 그린 그림입니다!
                <br />
                <span className="font-medium">원작과 얼마나 비슷한가요?</span>
              </p>
            </div>

            {/* 메인 컨텐츠 영역 */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                {/* 그림들을 가로로 나란히 배치 */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                  {/* 원본 그림 */}
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-3">
                      [원본 작품]
                    </h3>
                    <div className="p-4">
                      <Image
                        src={getPaintingImagePath()}
                        alt="원본 그림"
                        width={300}
                        height={300}
                        className="w-full h-[240px]"
                      />
                    </div>
                  </div>

                  {/* AI 생성 그림 */}
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-3">
                      [AI 생성 작품]
                    </h3>
                    <div className="p-4">
                      <Image
                        src={generatedImageUrl}
                        alt="AI 생성 그림"
                        width={300}
                        height={300}
                        className="w-full h-[240px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 다른 사람의 설명 보러가기 버튼 */}
            <div className="text-center mt-4">
              <p className="text-m text-gray-500 mb-3">
                같은 그림에 대해 다른 사람들은 어떻게 설명했을까요?
              </p>
              <button
                onClick={onViewOthers}
                className="py-3 px-6 rounded-xl text-md font-bold transition-all duration-300 ease-in-out transform hover:scale-105 border-2 border-white/30 bg-[#502589] hover:bg-[#4a1f7a] text-white"
              >
                다른 사람의 설명과 그림 보러가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen12;
