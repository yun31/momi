"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import ExhibitionHeader from "../components/ExhibitionHeader";

interface Screen10Props {
  onPaintingSelect?: (
    paintingId: "painting1" | "painting2" | "painting3"
  ) => void;
  onBack?: () => void;
  onHome?: () => void;
}

const Screen10: React.FC<Screen10Props> = ({
  onPaintingSelect,
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

  const handlePaintingSelect = (
    paintingId: "painting1" | "painting2" | "painting3"
  ) => {
    if (onPaintingSelect) {
      onPaintingSelect(paintingId);
    }
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
        <div
          className={`transition-all duration-300 ease-out transform ${
            showContent
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="flex justify-center items-center w-screen">
            <div className="bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl px-12 py-20 w-4/5 h-[75vh] flex flex-col justify-center items-center">
              {/* 헤딩 문구 */}
              <div className="text-center mb-12">
                <p className="text-xl sm:text-2xl text-gray-800 mb-4 leading-relaxed font-medium">
                  제 2 전시관은 반대로{" "}
                  <span className="font-bold">직접 작품을 설명해보는 공간</span>
                  입니다.
                </p>
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  아래 그림 중 설명하고 싶은 그림을 선택해주세요.
                </p>
              </div>

              {/* 3개 그림 버튼 (반응형 그리드) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 items-center justify-items-center w-full">
                {/* 첫 번째 그림 */}
                <button
                  onClick={() => handlePaintingSelect("painting1")}
                  className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-full max-w-[300px]"
                >
                  <Image
                    src="/asset/painting1.png"
                    alt="그림 1"
                    width={300}
                    height={200}
                  />
                </button>

                {/* 두 번째 그림 */}
                <button
                  onClick={() => handlePaintingSelect("painting2")}
                  className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-full max-w-[300px]"
                >
                  <Image
                    src="/asset/painting2.png"
                    alt="그림 2"
                    width={300}
                    height={200}
                  />
                </button>

                {/* 세 번째 그림 */}
                <button
                  onClick={() => handlePaintingSelect("painting3")}
                  className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-full max-w-[300px]"
                >
                  <Image
                    src="/asset/painting3.png"
                    alt="그림 3"
                    width={300}
                    height={200}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen10;
