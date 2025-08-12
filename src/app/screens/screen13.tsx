"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import ExhibitionHeader from "../components/ExhibitionHeader";

interface Screen13Props {
  selectedPainting: "painting1" | "painting2" | "painting3";
  onBack?: () => void;
  onHome?: () => void;
  onNext?: () => void;
}

interface ImageData {
  id: number;
  imageUrl: string;
  user_prompt: string;
  created_at: string;
}

const Screen13: React.FC<Screen13Props> = ({
  selectedPainting,
  onBack,
  onHome,
  onNext,
}) => {
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    try {
      const paintingNumMap = {
        painting1: 1,
        painting2: 2,
        painting3: 3,
      };

      const num = paintingNumMap[selectedPainting];
      const response = await fetch(`/api/get-images?num=${num}`);
      const data = await response.json();

      if (data.success) {
        setImageData(data.data);
      } else {
        console.error("Failed to fetch images:", data.error);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedPainting]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imageData.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < imageData.length - 1 ? prev + 1 : 0));
  };

  const currentData = imageData[currentIndex];

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
          <div className="bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl p-12 w-4/5 h-[75vh] flex flex-col overflow-hidden relative">
            {/* 헤딩 문구 */}
            <div className="text-center mb-4">
              <p className="text-lg sm:text-xl text-gray-800 leading-loose font-medium">
                동일한 그림에 대한 다른 사람들의 설명을 바탕으로 생성된
                그림들입니다.
                <br />
                다양한 관점을 비교해보세요!
              </p>
            </div>

            {/* 메인 컨텐츠 영역 */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-600">데이터를 불러오는 중...</p>
                </div>
              ) : imageData.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-600">아직 생성된 그림이 없습니다.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                  {/* 현재 이미지와 설명 */}
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-10 w-full max-w-4xl">
                    {/* 왼쪽: AI 생성 이미지 */}
                    <div className="flex flex-col items-center lg:w-2/5">
                      <div className="relative p-4">
                        <Image
                          src={currentData.imageUrl}
                          alt="AI 생성 그림"
                          width={280}
                          height={280}
                          className="w-full h-[280px] object-cover"
                        />
                        {/* 액자 오버레이 */}
                        <Image
                          src="/asset/frame.png"
                          alt="액자"
                          width={280}
                          height={280}
                          className="absolute inset-0 w-[400px] h-auto object-cover pointer-events-none"
                        />
                      </div>
                    </div>

                    {/* 오른쪽: 사용자 설명 */}
                    <div className="flex flex-col lg:w-3/5">
                      <div className="bg-white/50 backdrop-blur-sm borderrounded-lg p-8 max-w-2xl">
                        <p className="text-m text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {currentData.user_prompt}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 네비게이션 컨트롤 */}
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={handlePrevious}
                      className="px-4 py-2 bg-white/40 hover:bg-white/70 rounded-lg text-gray-700 font-medium transition-colors"
                    >
                      ←
                    </button>

                    <span className="text-gray-600 font-medium">
                      {currentIndex + 1} / {imageData.length}
                    </span>

                    <button
                      onClick={handleNext}
                      className="px-4 py-2 bg-white/40 hover:bg-white/70 rounded-lg text-gray-700 font-medium transition-colors"
                    >
                      →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 박스 안 우측하단 다음으로 버튼 */}
            <button
              onClick={onNext}
              className="absolute bottom-6 right-6 bg-[#502589] hover:bg-[#4a1f7a] border-2 border-white/30 text-white px-6 py-3 rounded-lg font-medium shadow transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              다음으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen13;
