import { NextResponse } from "next/server";
import { sopDocuments } from "@/lib/sop/policies";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: sopDocuments.map((doc) => ({
      id: doc.id,
      title: doc.title,
      category: doc.category,
      lastUpdated: doc.lastUpdated,
      sectionCount: doc.sections.length,
    })),
  });
}
