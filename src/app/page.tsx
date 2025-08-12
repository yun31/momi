"use client";

import React, { useState } from "react";
import ImagePreloader from "./components/ImagePreloader";
import Screen1 from "./screens/screen1";
import Screen2 from "./screens/screen2";
import Screen3 from "./screens/screen3";
import Screen4 from "./screens/screen4";
import Screen5 from "./screens/screen5";
import Screen6 from "./screens/screen6";
import Screen7 from "./screens/screen7";
import Screen8 from "./screens/screen8";
import Screen9 from "./screens/screen9";
import Screen10 from "./screens/screen10";
import Screen11 from "./screens/screen11";
import Screen12 from "./screens/screen12";
import Screen13 from "./screens/screen13";
import Screen14 from "./screens/screen14";
import Screen15 from "./screens/screen15";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<
    | "screen1"
    | "screen2"
    | "screen3"
    | "screen4"
    | "screen5"
    | "screen6"
    | "screen7"
    | "screen8"
    | "screen9"
    | "screen10"
    | "screen11"
    | "screen12"
    | "screen13"
    | "screen14"
    | "screen15"
  >("screen1");

  // 네비게이션 히스토리를 관리하는 스택
  const [navigationHistory, setNavigationHistory] = useState<
    (
      | "screen1"
      | "screen2"
      | "screen3"
      | "screen4"
      | "screen5"
      | "screen6"
      | "screen7"
      | "screen8"
      | "screen9"
      | "screen10"
      | "screen11"
      | "screen12"
      | "screen13"
      | "screen14"
      | "screen15"
    )[]
  >(["screen1"]);

  // 선택된 그림 상태 관리 (제1전시관)
  const [selectedPicture, setSelectedPicture] = useState<
    "pic1" | "pic2" | "pic3" | null
  >(null);

  // 선택된 그림 상태 관리 (제2전시관)
  const [selectedPainting, setSelectedPainting] = useState<
    "painting1" | "painting2" | "painting3" | null
  >(null);

  // 퀴즈 결과 상태 관리
  const [quizResult, setQuizResult] = useState<{
    selectedOption: number;
    isCorrect: boolean;
  } | null>(null);

  // AI 생성 이미지 URL 상태 관리
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );

  // 새로운 화면으로 이동하는 공통 함수
  const navigateToScreen = (
    screen:
      | "screen1"
      | "screen2"
      | "screen3"
      | "screen4"
      | "screen5"
      | "screen6"
      | "screen7"
      | "screen8"
      | "screen9"
      | "screen10"
      | "screen11"
      | "screen12"
      | "screen13"
      | "screen14"
      | "screen15"
  ) => {
    setCurrentScreen(screen);
    setNavigationHistory((prev) => [...prev, screen]);
  };

  // 처음으로 돌아가는 공통 함수
  const handleGoHome = () => {
    setCurrentScreen("screen1");
    setNavigationHistory(["screen1"]);
    setSelectedPicture(null); // 제1전시관 선택된 그림 초기화
    setSelectedPainting(null); // 제2전시관 선택된 그림 초기화
    setQuizResult(null); // 퀴즈 결과도 초기화
    setGeneratedImageUrl(null); // 생성된 이미지 URL도 초기화
  };

  // 이전 화면으로 돌아가는 공통 함수
  const handleGoBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // 현재 화면 제거
      const previousScreen = newHistory[newHistory.length - 1];

      setCurrentScreen(previousScreen);
      setNavigationHistory(newHistory);
    }
  };

  // 개별 화면별 네비게이션 핸들러들
  const handleEnterMuseum = () => {
    navigateToScreen("screen2");
  };

  const handleViewExhibition = () => {
    navigateToScreen("screen3");
  };

  const handleNextFromScreen3 = () => {
    navigateToScreen("screen4");
  };

  const handlePictureSelect = (pictureId: "pic1" | "pic2" | "pic3") => {
    setSelectedPicture(pictureId);
    navigateToScreen("screen5");
  };

  const handleNextFromScreen5 = () => {
    navigateToScreen("screen6");
  };

  const handleNextFromScreen6 = () => {
    navigateToScreen("screen7");
  };

  const handleQuizAnswer = (selectedOption: number, isCorrect: boolean) => {
    setQuizResult({ selectedOption, isCorrect });
    navigateToScreen("screen8");
  };

  const handleNextFromScreen8 = () => {
    navigateToScreen("screen9");
  };

  const handleReturnToExhibition1 = () => {
    // 상태 초기화하고 screen3로 이동
    setSelectedPicture(null);
    setQuizResult(null);
    navigateToScreen("screen3");
  };

  const handleGoToExhibition2 = () => {
    navigateToScreen("screen10");
  };

  const handlePaintingSelect = (
    paintingId: "painting1" | "painting2" | "painting3"
  ) => {
    setSelectedPainting(paintingId);
    navigateToScreen("screen11");
  };

  const handleGenerateImage = (answers: {
    answer1: string;
    answer2: string;
    answer3: string;
    generatedImageUrl?: string;
  }) => {
    if (answers.generatedImageUrl) {
      setGeneratedImageUrl(answers.generatedImageUrl);
      navigateToScreen("screen12");
    }
  };

  const handleViewOthers = () => {
    navigateToScreen("screen13");
  };

  const handleGoToScreen14 = () => {
    navigateToScreen("screen14");
  };

  const handleLearnMore = () => {
    navigateToScreen("screen15");
  };

  const MainContent = () => (
    <main>
      {currentScreen === "screen1" && (
        <Screen1 onEnterMuseum={handleEnterMuseum} />
      )}
      {currentScreen === "screen2" && (
        <Screen2
          onViewExhibition={handleViewExhibition}
          onBack={handleGoBack}
          onHome={handleGoHome}
        />
      )}
      {currentScreen === "screen3" && (
        <Screen3
          onNext={handleNextFromScreen3}
          onBack={handleGoBack}
          onHome={handleGoHome}
        />
      )}
      {currentScreen === "screen4" && (
        <Screen4
          onPictureSelect={handlePictureSelect}
          onBack={handleGoBack}
          onHome={handleGoHome}
        />
      )}
      {currentScreen === "screen5" && selectedPicture && (
        <Screen5
          selectedPicture={selectedPicture}
          onNext={handleNextFromScreen5}
          onBack={handleGoBack}
          onHome={handleGoHome}
        />
      )}
      {currentScreen === "screen6" && (
        <Screen6
          onNext={handleNextFromScreen6}
          onBack={handleGoBack}
          onHome={handleGoHome}
        />
      )}
      {currentScreen === "screen7" && selectedPicture && (
        <Screen7
          selectedPicture={selectedPicture}
          onQuizAnswer={handleQuizAnswer}
          onBack={handleGoBack}
          onHome={handleGoHome}
        />
      )}
      {currentScreen === "screen8" && selectedPicture && quizResult && (
        <Screen8
          selectedPicture={selectedPicture}
          selectedOption={quizResult.selectedOption}
          isCorrect={quizResult.isCorrect}
          onNext={handleNextFromScreen8}
          onBack={handleGoBack}
          onHome={handleGoHome}
        />
      )}
      {currentScreen === "screen9" && (
        <Screen9
          onReturnToExhibition1={handleReturnToExhibition1}
          onGoToExhibition2={handleGoToExhibition2}
          onBack={handleGoBack}
          onHome={handleGoHome}
        />
      )}
      {currentScreen === "screen10" && (
        <Screen10
          onPaintingSelect={handlePaintingSelect}
          onBack={handleGoBack}
          onHome={handleGoHome}
        />
      )}
      {currentScreen === "screen11" && selectedPainting && (
        <Screen11
          selectedPainting={selectedPainting}
          onGenerateImage={handleGenerateImage}
          onBack={handleGoBack}
          onHome={handleGoHome}
        />
      )}
      {currentScreen === "screen12" &&
        selectedPainting &&
        generatedImageUrl && (
          <Screen12
            selectedPainting={selectedPainting}
            generatedImageUrl={generatedImageUrl}
            onBack={handleGoBack}
            onHome={handleGoHome}
            onViewOthers={handleViewOthers}
          />
        )}
      {currentScreen === "screen13" && selectedPainting && (
        <Screen13
          selectedPainting={selectedPainting}
          onBack={handleGoBack}
          onHome={handleGoHome}
          onNext={handleGoToScreen14}
        />
      )}
      {currentScreen === "screen14" && (
        <Screen14
          onBack={handleGoBack}
          onHome={handleGoHome}
          onLearnMore={handleLearnMore}
        />
      )}
      {currentScreen === "screen15" && (
        <Screen15 onBack={handleGoBack} onHome={handleGoHome} />
      )}
    </main>
  );

  return (
    <ImagePreloader>
      <MainContent />
    </ImagePreloader>
  );
}
