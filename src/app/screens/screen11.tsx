"use client";

import React, { useState } from "react";
import Image from "next/image";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import ExhibitionHeader from "../components/ExhibitionHeader";

interface Screen11Props {
  selectedPainting: "painting1" | "painting2" | "painting3";
  onGenerateImage?: (answers: {
    answer1: string;
    answer2: string;
    answer3: string;
    generatedImageUrl?: string;
  }) => void;
  onBack?: () => void;
  onHome?: () => void;
}

const Screen11: React.FC<Screen11Props> = ({
  selectedPainting,
  onGenerateImage,
  onBack,
  onHome,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [answers, setAnswers] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
  });

  // 선택된 그림 경로 가져오기
  const getPaintingImagePath = () => {
    return `/asset/${selectedPainting}.png`;
  };

  const handleAnswerChange = (questionNumber: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [`answer${questionNumber}`]: value,
    }));
  };

  const handleGenerateImage = async () => {
    if (!isAllAnswered) return;

    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers,
          selectedPainting,
        }),
      });

      const data = await response.json();

      if (data.success && onGenerateImage) {
        // 이미지 생성이 완료되면 자동으로 Screen12로 이동
        onGenerateImage({
          ...answers,
          generatedImageUrl: data.imageUrl,
        });
      } else {
        alert("이미지 생성에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("이미지 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const isAllAnswered = answers.answer1.trim() && answers.answer2.trim();

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
          <div className="bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl p-8 w-4/5 h-[75vh] flex flex-col overflow-hidden">
            {/* 헤딩 문구 */}
            <div className="text-center mb-2">
              <p className="text-m sm:text-lg text-gray-800 leading-relaxed font-medium">
                이 그림을 보지 못하는 누군가에게 그림에 대해 설명해보세요.
                <br />
                작성한 답변을 바탕으로{" "}
                <span className="font-bold">AI가 생성한 그림</span>을 실제
                작품과 비교해볼 수 있어요.
              </p>
            </div>

            {/* 메인 컨텐츠 영역 */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full items-center">
                {/* 왼쪽: 선택한 그림 */}
                <div className="lg:col-span-1 flex justify-center items-start">
                  <div className="p-4">
                    <Image
                      src={getPaintingImagePath()}
                      alt="선택한 그림"
                      width={300}
                      height={200}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>

                {/* 오른쪽: 질문과 답변란 */}
                <div className="lg:col-span-2 p-4">
                  <p className="text-m font-medium text-gray-500 mb-4">
                    아래 질문에 대해 문장형으로 답변을 작성해주세요!
                  </p>

                  <div className="space-y-4">
                    {/* 질문 1 */}
                    <div>
                      <label className="block text-m font-medium text-gray-700 mb-1">
                        1. 그림에서{" "}
                        <span className="font-bold">어떤 풍경이나 사물</span>이
                        보이나요?
                      </label>
                      <textarea
                        value={answers.answer1}
                        onChange={(e) => handleAnswerChange(1, e.target.value)}
                        className="w-full p-2 border border-[#DBC4FE] rounded-md bg-[#FBF7FF] backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-[#DBC4FE] resize-none text-sm"
                        rows={2}
                        placeholder="예: 푸른 하늘 아래 펼쳐진 넓은 들판..."
                      />
                    </div>

                    {/* 질문 2 */}
                    <div>
                      <label className="block text-m font-medium text-gray-700 mb-1">
                        2. 그림에서{" "}
                        <span className="font-bold">어떤 분위기나 인상</span>이
                        느껴지나요?
                      </label>
                      <textarea
                        value={answers.answer2}
                        onChange={(e) => handleAnswerChange(2, e.target.value)}
                        className="w-full p-2 border border-[#DBC4FE] rounded-md bg-[#FBF7FF] backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-[#DBC4FE] resize-none text-sm"
                        rows={2}
                        placeholder="예: 따뜻하고 평화로운 느낌..."
                      />
                    </div>

                    {/* 질문 3 */}
                    <div>
                      <label className="block text-m font-medium text-gray-700 mb-1">
                        3. 더 설명해주고 싶은 부분이 있나요? (선택)
                      </label>
                      <textarea
                        value={answers.answer3}
                        onChange={(e) => handleAnswerChange(3, e.target.value)}
                        className="w-full p-2 border border-[#DBC4FE] rounded-md bg-[#FBF7FF] backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-[#DBC4FE] resize-none text-sm"
                        rows={2}
                        placeholder="예: 노란색이 매우 생생하고 밝아서..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 그림 생성하기 버튼 */}
            <div className="text-center mt-2">
              <button
                onClick={handleGenerateImage}
                disabled={!isAllAnswered || isGenerating}
                className={`py-3 px-6 rounded-xl text-md font-bold transition-all duration-300 ease-in-out transform hover:scale-105 border-2 border-white/30 ${
                  isAllAnswered && !isGenerating
                    ? "bg-[#502589] hover:bg-[#502589] text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isGenerating ? "그림 생성 중..." : "그림 생성하기"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen11;
