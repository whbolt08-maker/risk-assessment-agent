import { NextResponse } from "next/server";
import { getAllAssessments, getAssessmentById } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const assessment = getAssessmentById(id);
    if (!assessment) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: assessment });
  }

  const assessments = getAllAssessments();
  return NextResponse.json({ success: true, data: assessments });
}
