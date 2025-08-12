"use client";

import React from "react";
import Image from "next/image";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import ExhibitionHeader from "../components/ExhibitionHeader";

interface Screen4Props {
  onPictureSelect?: (pictureId: "pic1" | "pic2" | "pic3") => void;
  onBack?: () => void;
  onHome?: () => void;
}

const Screen4: React.FC<Screen4Props> = ({
  onPictureSelect,
  onBack,
  onHome,
}) => {
  const handlePictureSelect = (pictureId: "pic1" | "pic2" | "pic3") => {
    if (onPictureSelect) {
      onPictureSelect(pictureId);
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
            {/* 안내 문구 */}
            <div className="text-center mb-8">
              <p className="text-xl sm:text-2xl text-gray-800 leading-relaxed font-medium">
                아래 세 가지 그림 중에 하나를 선택해주세요.
              </p>
            </div>

            {/* 3개 그림 버튼 */}
            <div className="flex justify-center items-center gap-24 flex-1">
              {/* 첫 번째 그림 */}
              <button
                onClick={() => handlePictureSelect("pic1")}
                className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                <Image
                  src="/asset/pic1_unknown.png"
                  alt="그림 1"
                  width={200}
                  height={250}
                />
              </button>

              {/* 두 번째 그림 */}
              <button
                onClick={() => handlePictureSelect("pic2")}
                className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                <Image
                  src="/asset/pic2_unknown.png"
                  alt="그림 2"
                  width={200}
                  height={250}
                />
              </button>

              {/* 세 번째 그림 */}
              <button
                onClick={() => handlePictureSelect("pic3")}
                className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                <Image
                  src="/asset/pic3_unknown.png"
                  alt="그림 3"
                  width={200}
                  height={250}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen4;
