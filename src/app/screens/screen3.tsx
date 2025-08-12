"use client";

import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import Image from "next/image";
import ExhibitionHeader from "../components/ExhibitionHeader";

interface Screen3Props {
  onNext?: () => void;
  onBack?: () => void;
  onHome?: () => void;
}

const Screen3: React.FC<Screen3Props> = ({ onNext, onBack, onHome }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);
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
        <div
          className={`transition-all duration-500 ease-out transform ${
            showContent
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="flex justify-center items-center w-screen">
            <div className="bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl p-10 w-4/5 h-[75vh] flex flex-col justify-center items-center">
              {/* 메인 설명 */}
              <div className="text-center flex-1 flex flex-col justify-center">
                <p className="text-2xl sm:text-3xl text-gray-800 mb-6 leading-relaxed font-medium">
                  이제 당신은 잠시{" "}
                  <span className="font-bold text-gray-900">
                    시각 장애인의 세상
                  </span>{" "}
                  속으로 들어갑니다.
                </p>
                <p className="text-lg sm:text-xl text-gray-700 leading-12 mt-6">
                  그들은 미술관에서 어떤 경험을 마주하게 될까요?
                  <br />
                  아래 버튼을 눌러 관람을 시작하세요.
                </p>
              </div>

              {/* 다음 버튼 */}
              <button
                onClick={handleNext}
                className="bg-[#FFB6C0] hover:bg-[#FFB6C0] text-white font-bold py-5 px-12 rounded-2xl text-lg sm:text-xl transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-3 mx-auto border-2 border-white/30"
              >
                시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen3;
