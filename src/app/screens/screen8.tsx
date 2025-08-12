"use client";

import React from "react";
import Image from "next/image";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import ExhibitionHeader from "../components/ExhibitionHeader";

interface Screen8Props {
  selectedPicture: "pic1" | "pic2" | "pic3";
  selectedOption: number;
  isCorrect: boolean;
  onNext?: () => void;
  onBack?: () => void;
  onHome?: () => void;
}

const Screen8: React.FC<Screen8Props> = ({
  selectedPicture,
  selectedOption,
  isCorrect,
  onNext,
  onBack,
  onHome,
}) => {
  // 작품 정보 가져오기
  const getArtworkInfo = () => {
    const artworkData = {
      pic1: {
        artist: "Claude Monet(클로드 모네)",
        title: "The Flood(홍수)",
        imagePath: "/asset/pic1.png",
      },
      pic2: {
        artist: "Edward Hopper(에드워드 호퍼)",
        title: "Nighthawks(밤샘하는 사람들)",
        imagePath: "/asset/pic2.png",
      },
      pic3: {
        artist: "Marc Chagall(마르크 샤갈)",
        title: "Over the Town(마을 위에서)",
        imagePath: "/asset/pic3.png",
      },
    };

    return artworkData[selectedPicture];
  };

  // 선택한 옵션의 이미지 경로 가져오기
  const getSelectedOptionImage = () => {
    const basePrefix =
      selectedPicture === "pic1"
        ? "quiz1_"
        : selectedPicture === "pic2"
        ? "quiz2_"
        : "quiz3_";

    return `/asset/${basePrefix}${selectedOption + 1}.png`;
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  const artworkInfo = getArtworkInfo();
  const selectedImagePath = getSelectedOptionImage();

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
            {/* 이미지 비교 섹션 */}
            <div className="flex justify-center items-center gap-8 mb-8 flex-wrap">
              {/* 정답 이미지 */}
              <div className="text-center">
                <Image
                  src={artworkInfo.imagePath}
                  alt="정답 이미지"
                  width={200}
                  height={150}
                  className="w-auto h-[200px] object-cover"
                />
                <h3 className="text-sm font-medium text-[#666666] mt-2">
                  [나레이션이 설명한 그림]
                </h3>
              </div>

              {/* 선택한 이미지 */}
              <div className="text-center">
                <Image
                  src={selectedImagePath}
                  alt="선택한 이미지"
                  width={200}
                  height={150}
                  className="w-auto h-[170px] object-cover"
                />
                <h3 className="text-sm font-medium text-[#666666] mt-2">
                  [당신이 선택한 그림]
                </h3>
              </div>
            </div>

            {/* 결과 메시지 */}
            <div className="text-center flex-1 flex flex-col justify-center">
              <p
                className={`text-lg sm:text-lg mb-6 leading-relaxed font-medium text-[#666666]`}
              >
                {isCorrect ? "정답입니다! 🎉" : "아쉽지만 오답입니다 🥲"}
              </p>

              <p className="text-m sm:text-lg text-gray-800 mb-4 leading-relaxed font-medium">
                이 작품은{" "}
                <span className="font-bold">{artworkInfo.artist}</span>의
                <span className="font-bold">&lt;{artworkInfo.title}&gt;</span>
                입니다.
              </p>

              <p className="text-m sm:text-lg text-gray-700 leading-relaxed">
                이렇게 잠시 <span className="font-bold">시각장애인의 입장</span>
                에서 작품을 감상해보았는데요. 감상은 어떠셨나요?
                <br />
                시각장애인에게 작품을 감상하는 것은 시각적인 것을 뛰어넘어
                <span className="font-bold">
                  &nbsp;다양한 감각과 상상을 통한 경험
                </span>
                이지 않을까요?
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

export default Screen8;
