"use client";

import React from "react";
import Image from "next/image";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import ExhibitionHeader from "../components/ExhibitionHeader";

interface Screen7Props {
  selectedPicture: "pic1" | "pic2" | "pic3";
  onQuizAnswer?: (selectedOption: number, isCorrect: boolean) => void;
  onBack?: () => void;
  onHome?: () => void;
}

const Screen7: React.FC<Screen7Props> = ({
  selectedPicture,
  onQuizAnswer,
  onBack,
  onHome,
}) => {
  // 선택된 그림에 따른 퀴즈 옵션들 가져오기
  const getQuizOptions = () => {
    const basePrefix =
      selectedPicture === "pic1"
        ? "quiz1_"
        : selectedPicture === "pic2"
        ? "quiz2_"
        : "quiz3_";

    return [
      `/asset/${basePrefix}1.png`,
      `/asset/${basePrefix}2.png`,
      `/asset/${basePrefix}3.png`,
      `/asset/${basePrefix}4.png`,
    ];
  };

  // 정답 확인 (각 pic별로 다른 정답 인덱스)
  const isCorrectAnswer = (optionIndex: number): boolean => {
    // pic1은 1번(index 0), pic2는 2번(index 1), pic3는 3번(index 2)이 정답
    const correctAnswers = {
      pic1: 0, // 1번 옵션
      pic2: 1, // 2번 옵션
      pic3: 2, // 3번 옵션
    };

    return optionIndex === correctAnswers[selectedPicture];
  };

  const handleQuizOptionClick = (optionIndex: number) => {
    const isCorrect = isCorrectAnswer(optionIndex);
    if (onQuizAnswer) {
      onQuizAnswer(optionIndex, isCorrect);
    }
  };

  const quizOptions = getQuizOptions();

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
          <div className="bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl px-12 py-20 w-4/5 h-[75vh] flex flex-col justify-center items-center">
            {/* 헤딩 문구 */}
            <div className="text-center mb-8">
              <p className="text-xl sm:text-2xl text-gray-800 mb-4 leading-relaxed font-bold">
                당신은 나레이션을 듣고 작품을 상상해보았습니다.
              </p>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                나레이션에서 묘사한 작품은 무엇이었을지 선택해주세요.
              </p>
            </div>

            {/* 퀴즈 옵션들 (반응형 그리드) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 flex-1 items-center justify-items-center w-full">
              {quizOptions.map((imagePath, index) => (
                <button
                  key={index}
                  onClick={() => handleQuizOptionClick(index)}
                  className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-full max-w-[240px]"
                >
                  <Image
                    src={imagePath}
                    alt={`퀴즈 옵션 ${index + 1}`}
                    width={300}
                    height={150}
                    className="rounded-lg border-4 border-white/50 w-full h-auto"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen7;
