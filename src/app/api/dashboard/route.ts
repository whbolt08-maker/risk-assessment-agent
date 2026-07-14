import { NextResponse } from "next/server";
import { getDashboardStats, getAllAssessments } from "@/lib/mock-data";

export async function GET() {
  const stats = getDashboardStats();
  const recent = getAllAssessments().slice(0, 5);

  return NextResponse.json({
    success: true,
    data: {
      stats,
      recentAssessments: recent,
    },
  });
}
