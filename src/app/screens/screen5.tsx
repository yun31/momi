"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import ExhibitionHeader from "../components/ExhibitionHeader";

interface Screen5Props {
  selectedPicture: "pic1" | "pic2" | "pic3";
  onNext?: () => void;
  onBack?: () => void;
  onHome?: () => void;
}

const Screen5: React.FC<Screen5Props> = ({
  selectedPicture,
  onNext,
  onBack,
  onHome,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 선택된 그림에 따른 오디오 파일 경로
  const getAudioPath = () => {
    switch (selectedPicture) {
      case "pic1":
        return "/narration/narration1.mp3";
      case "pic2":
        return "/narration/narration2.mp3";
      case "pic3":
        return "/narration/narration3.mp3";
      default:
        return "/narration/narration1.mp3";
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setAudioProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  // 오디오 시각화 바들
  const AudioVisualizationBars = () => {
    const bars = Array.from({ length: 60 }, (_, i) => (
      <div
        key={i}
        className={`bg-[#FFB6C0] rounded-full transition-all duration-200 ${
          isPlaying ? "animate-pulse" : ""
        }`}
        style={{
          width: "4px",
          height: isPlaying ? `${Math.random() * 30 + 10}px` : "10px",
          animationDelay: `${i * 0.05}s`,
        }}
      />
    ));
    return bars;
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
            {/* 헤딩 문구 */}
            <div className="text-center mb-8">
              <p className="text-xl sm:text-2xl text-gray-800 leading-relaxed font-medium">
                아래 재생 버튼을 눌러 그림을 설명하는 나레이션을 들어보세요.
                <br />
                설명을 들으며 어떤 모습의 그림일지 상상해보세요.
              </p>
            </div>

            {/* 오디오 시각화 UI */}
            <div className="mb-8">
              <div className="flex items-end justify-center gap-1 h-16 w-full max-w-4xl mx-auto mb-10">
                <AudioVisualizationBars />
              </div>
              {/* 재생 버튼과 진행률 바 */}
              <div className="flex items-center gap-6 mt-4">
                {/* 재생/일시정지 버튼 */}
                <button
                  onClick={togglePlayPause}
                  className="bg-[#FFB6C0] hover:bg-[#ff9fb1] text-white font-bold w-12 h-12 rounded-full text-2xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center flex-shrink-0"
                >
                  {isPlaying ? (
                    // 일시정지 아이콘
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    // 재생 아이콘
                    <svg
                      className="w-8 h-8 ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* 진행률 바 */}
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-[#FFB6C0] h-4 rounded-full transition-all duration-200"
                    style={{ width: `${audioProgress}%` }}
                  ></div>
                </div>
              </div>
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
            {/* 오디오 엘리먼트 (숨김) */}
            <audio ref={audioRef} src={getAudioPath()} preload="metadata" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen5;
