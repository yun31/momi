"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import ExhibitionHeader from "../components/ExhibitionHeader";

interface Screen15Props {
  onBack?: () => void;
  onHome?: () => void;
}

const Screen15: React.FC<Screen15Props> = ({ onBack, onHome }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
            <div className="bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl p-8 w-4/5 h-[80vh] flex flex-col overflow-hidden">
              {/* 스크롤 가능한 내용 영역 */}
              <div className="flex-1 overflow-y-auto space-y-6">
                {/* 정의 섹션 */}
                <div className="bg-white/60 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-8">
                    시각장애인의 정의
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    <span className="font-bold">한국시각장애인연합회</span>에
                    따르면, 시각 장애의 정의는 크게{" "}
                    <span className="font-bold text-[#EA8585]">
                      의학적 정의
                    </span>
                    와{" "}
                    <span className="font-bold text-[#502589]">법적 정의</span>
                    로 나뉩니다.
                  </p>
                  <br />
                  <p className="text-base text-gray-700 leading-relaxed">
                    시각장애의{" "}
                    <span className="font-bold text-[#EA8585]">
                      의학적 정의
                    </span>
                    는 일반적으로 시력과 시야에 의해 결정됩니다. 시력이란
                    &apos;사람이 볼 수 있는 명료도&apos;를, 시야는 &apos;눈으로
                    정면의 한 점을 주시하고 있을 때 눈에 보이는 외계의
                    범위&apos;를 의미합니다. 시야는 &apos;눈으로 정면의 한 점을
                    주시하고 있을 때 눈에 보이는 외계의 범위&apos;를 의미합니다.
                  </p>
                  <br />
                  <p className="text-base text-gray-700 leading-relaxed">
                    시각장애인의{" "}
                    <span className="font-bold text-[#502589]">
                      법적 장애 분류
                    </span>{" "}
                    목적으로 규정하고 있는 장애인복지법에서 차약하부 수 있는데,
                    장애인복지법 시행 규칙 시력이 0.02 이하인 사람, 좋은 눈의
                    시력이 0.2 이하인 사람, 두 눈의 시야가 각각 주 시점에서 10도
                    이하로 남은 사람, 두 눈의 시야 2분의 1 이상을 잃은 사람으로
                    정의됩니다.
                  </p>
                </div>

                {/* 분류 섹션 */}
                <div className="bg-white/60 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    시각장애인의 분류
                  </h3>

                  <div className="space-y-4">
                    <div className="border-l-4 border-pink-200 pl-4">
                      <h4 className="font-bold text-lg text-pink-400">
                        시력장애
                      </h4>
                      <p className="text-gray-700">
                        시력이 현저하게 저하되어 있거나 물체가 보이지 않는 장애
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-200 pl-4">
                      <h4 className="font-bold text-lg text-orange-400">
                        광각장애
                      </h4>
                      <p className="text-gray-700">
                        낮에 보이는 추상시세포와 밤에 보는 간상시세포가 손상을
                        받거나, 그 수가 어느 한쪽이 선천적으로 부족하여 밝은
                        곳에서 잘 보이지 않거나 밤에 보이지 않는 장애
                      </p>
                    </div>

                    <div className="border-l-4 border-green-200 pl-4">
                      <h4 className="font-bold text-lg text-green-400">
                        색각장애
                      </h4>
                      <p className="text-gray-700">색약이나 색맹의 상태</p>
                    </div>

                    <div className="border-l-4 border-blue-200 pl-4">
                      <h4 className="font-bold text-lg text-blue-400">
                        굴절장애
                      </h4>
                      <p className="text-gray-700">
                        빛의 굴절에 문제가 있어 난시가 되거나 근시, 원시 등으로
                        초점이 망막에 맺히지 못하는 장애, 안경으로 교정 가능.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-200 pl-4">
                      <h4 className="font-bold text-lg text-purple-400">
                        조절장애
                      </h4>
                      <p className="text-gray-700">
                        수정체의 두께 조절이 잘 안 되거나 안구를 움직이는
                        동안근이 잘 조절되지 못하는 장애
                      </p>
                    </div>

                    <div className="border-l-4 border-red-200 pl-4">
                      <h4 className="font-bold text-lg text-red-400">
                        양안시장애
                      </h4>
                      <p className="text-gray-700">
                        한쪽 눈이 잘 보이지 않거나 시력이 현저히 낮아 입체시를
                        이루지 못하는 장애
                      </p>
                    </div>
                  </div>
                </div>

                {/* 한국시각장애인연합회 링크 섹션 */}
                <div className="bg-white/60 rounded-lg p-6 text-center">
                  <p className="text-gray-700 mb-4">
                    더 자세한 정보는 한국시각장애인연합회에서 확인하실 수
                    있습니다.
                  </p>
                  <a
                    href="http://www.kbuwel.or.kr/Blind/What"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-[#EA8585] hover:bg-[#d07373] text-white rounded-lg font-medium transition-all duration-300 ease-in-out transform"
                  >
                    <span>한국시각장애인연합회 바로가기</span>
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>

                {/* 하단 버튼 */}
                <div className="text-center pt-4">
                  <button
                    onClick={onHome}
                    className="mb-4 bg-[#502589] hover:bg-[#4a1f7a] border-2 border-white/30 text-white px-8 py-3 rounded-xl font-medium text-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    처음으로 돌아가기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen15;
