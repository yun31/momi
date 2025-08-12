"use client";

import React, { useState, useEffect } from "react";

// 모든 이미지 경로 목록
const imagePaths = [
  "/asset/background.png",
  "/asset/background1.png",
  "/asset/background2.png",
  "/asset/door.png",
  "/asset/frame.png",
  "/asset/image.png",
  "/asset/illust1.png",
  "/asset/museum.png",
  "/asset/painting1.png",
  "/asset/painting2.png",
  "/asset/painting3.png",
  "/asset/pic1.png",
  "/asset/pic1_unknown.png",
  "/asset/pic2.png",
  "/asset/pic2_unknown.png",
  "/asset/pic3.png",
  "/asset/pic3_unknown.png",
  "/asset/quiz1_1.png",
  "/asset/quiz1_2.png",
  "/asset/quiz1_3.png",
  "/asset/quiz1_4.png",
  "/asset/quiz2_1.png",
  "/asset/quiz2_2.png",
  "/asset/quiz2_3.png",
  "/asset/quiz2_4.png",
  "/asset/quiz3_1.png",
  "/asset/quiz3_2.png",
  "/asset/quiz3_3.png",
  "/asset/quiz3_4.png",
  "/asset/rec.png",
  "/asset/rec2.png",
];

interface ImagePreloaderProps {
  children: React.ReactNode;
  onLoadingComplete?: () => void;
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({
  children,
  onLoadingComplete,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    setTotalImages(imagePaths.length);

    const preloadImages = async () => {
      const imagePromises = imagePaths.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages((prev) => prev + 1);
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load image: ${src}`);
            setLoadedImages((prev) => prev + 1); // 실패해도 카운트 증가
            resolve(); // 실패해도 계속 진행
          };
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        // 모든 이미지 로딩 완료 후 잠깐 대기
        setTimeout(() => {
          setIsLoading(false);
          onLoadingComplete?.();
        }, 500);
      } catch (error) {
        console.error("Error preloading images:", error);
        setIsLoading(false);
        onLoadingComplete?.();
      }
    };

    preloadImages();
  }, [onLoadingComplete]);

  const loadingPercentage =
    totalImages > 0 ? Math.round((loadedImages / totalImages) * 100) : 0;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
        <div className="text-center">
          <div className="mb-8">
            <h1
              className="text-4xl font-medium text-gray-800 mb-4"
              style={{ fontFamily: "GmarketSansMedium, sans-serif" }}
            >
              MOMI 모두의 미술관
            </h1>
            <p className="text-lg text-gray-600">
              이미지를 불러오는 중입니다...
            </p>
          </div>

          {/* 로딩 바 */}
          <div className="w-80 bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-[#FFB6C0] h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingPercentage}%` }}
            ></div>
          </div>

          {/* 로딩 퍼센트 */}
          <p className="text-sm text-gray-500">
            {loadedImages} / {totalImages} ({loadingPercentage}%)
          </p>

          {/* 로딩 스피너 */}
          <div className="mt-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFB6C0] mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ImagePreloader;
