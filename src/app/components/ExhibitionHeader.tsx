"use client";

import React from "react";
import Image from "next/image";

interface ExhibitionHeaderProps {
  exhibitionNumber: 1 | 2;
  title: string;
}

const ExhibitionHeader: React.FC<ExhibitionHeaderProps> = ({
  exhibitionNumber,
  title,
}) => {
  // 제2전시관인 경우 rec2.png 사용
  const headerImageSrc =
    exhibitionNumber === 2 ? "/asset/rec2.png" : "/asset/rec.png";

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="relative inline-block">
          {/* 헤더 이미지 */}
          <Image
            src={headerImageSrc}
            alt="Header Background"
            width={400}
            height={100}
            className="w-auto h-[90px]"
          />
          {/* 텍스트 오버레이 */}
          <h1
            className="absolute inset-0 flex items-center justify-center text-2xl font-medium text-[#333333]"
            style={{ fontFamily: "GmarketSansMedium, sans-serif" }}
          >
            제 {exhibitionNumber} 전시관 :
            <span className="font-medium"> &nbsp;{title}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionHeader;
