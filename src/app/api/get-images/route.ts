import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const num = searchParams.get("num");

    if (!num) {
      return NextResponse.json(
        { success: false, error: "Painting number is required" },
        { status: 400 }
      );
    }

    const paintingNum = parseInt(num);
    console.log("Fetching images for painting num:", paintingNum);

    // Supabase에서 해당 painting 번호의 데이터 가져오기
    const { data, error } = await supabase
      .from("image_metadata")
      .select("*")
      .eq("num", paintingNum)
      .order("created_at", { ascending: false });

    console.log("Supabase response:", { data, error });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { success: false, error: `Supabase error: ${error.message}` },
        { status: 500 }
      );
    }

    // file_path를 사용해서 public URL 생성
    const processedData =
      data?.map((item) => {
        const { data: publicUrlData } = supabase.storage
          .from("test")
          .getPublicUrl(item.file_path);

        return {
          ...item,
          imageUrl: publicUrlData.publicUrl,
          user_prompt: item.prompt, // 호환성을 위해 user_prompt도 제공
        };
      }) || [];

    return NextResponse.json({
      success: true,
      data: processedData,
    });
  } catch (error) {
    console.error("Fetch images error:", error);
    return NextResponse.json(
      {
        success: false,
        error: `Server error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
