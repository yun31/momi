import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { supabase } from "@/lib/supabase";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { answers, selectedPainting } = await request.json();

    // 답변들을 하나로 합치기
    const combinedAnswers = `${answers.answer1} ${answers.answer2} ${
      answers.answer3 || ""
    }`.trim();

    // 영어로 번역
    const translationResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a professional translator. Translate the following Korean text to English for image generation purposes. Keep the description vivid and detailed.",
        },
        {
          role: "user",
          content: combinedAnswers,
        },
      ],
      max_tokens: 500,
    });

    const translatedText = translationResponse.choices[0].message.content;

    // 그림별 스타일 프롬프트 (더 안전하게 수정)
    const stylePrompts = {
      painting1:
        "Create a painting in the style of Edvard Munch with expressive brushwork and emotional depth. The following description should guide the artwork:",
      painting2:
        "Create an impressionist painting in the style of Claude Monet with soft brushstrokes and natural lighting. The following description should guide the artwork:",
      painting3:
        "Create a post-impressionist painting in the style of Vincent van Gogh with bold colors and dynamic brushwork. The following description should guide the artwork:",
    };

    const stylePrompt =
      stylePrompts[selectedPainting as keyof typeof stylePrompts];

    // 프롬프트 안전성 확인 및 정제
    const safeTranslatedText =
      translatedText?.replace(/[^\w\s,.!?-]/g, "") || "";

    // 최종 프롬프트 구성
    const finalPrompt = `${stylePrompt} ${safeTranslatedText}`;

    console.log("Final prompt being sent to OpenAI:", finalPrompt);

    // 이미지 생성
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: finalPrompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    if (!imageResponse.data || imageResponse.data.length === 0) {
      throw new Error("No image data received from OpenAI");
    }

    const imageUrl = imageResponse.data[0].url;

    // OpenAI 이미지를 다운로드
    const imageResponse2 = await fetch(imageUrl!);
    if (!imageResponse2.ok) {
      throw new Error("Failed to fetch image from OpenAI");
    }
    const imageBlob = await imageResponse2.blob();

    // 파일명 생성 (고유 파일 이름)
    const fileName = `t${Date.now()}.jpg`;

    console.log(
      "Attempting to upload to Supabase storage with filename:",
      fileName
    );

    // Supabase Storage에 이미지 업로드
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("test")
      .upload(`public/${fileName}`, imageBlob, {
        contentType: "image/jpg",
        upsert: false,
        cacheControl: "3600",
      });

    if (uploadError) {
      console.error("Supabase storage error:", uploadError);
      throw new Error(
        `Failed to upload image to storage: ${uploadError.message}`
      );
    }

    console.log("Image uploaded successfully:", uploadData);

    // painting 번호 매핑
    const paintingNumMap = {
      painting1: 1,
      painting2: 2,
      painting3: 3,
    };

    const num = paintingNumMap[selectedPainting as keyof typeof paintingNumMap];

    // Supabase database 이미지 메타데이터 저장
    const { data: savedData, error: supabaseError } = await supabase
      .from("image_metadata")
      .insert([
        {
          file_path: uploadData.path, // 저장된 파일 경로
          num: num, // num 값
          prompt: combinedAnswers, // prompt 값
        },
      ]);

    if (supabaseError) {
      console.error("Supabase error:", supabaseError);
      throw new Error("Failed to save data to database");
    }

    console.log("Metadata saved successfully:", savedData);

    // 업로드된 이미지의 공개 URL 가져오기
    const { data: publicUrlData } = supabase.storage
      .from("test")
      .getPublicUrl(`public/${fileName}`);

    const supabaseImageUrl = publicUrlData.publicUrl;

    return NextResponse.json({
      success: true,
      imageUrl: supabaseImageUrl,
      translatedPrompt: translatedText,
      finalPrompt,
      savedData,
    });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
