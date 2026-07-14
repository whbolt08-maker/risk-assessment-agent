import { NextRequest, NextResponse } from "next/server";
import { performAssessment, type AssessmentInput } from "@/lib/assessment-engine";
import { addAssessment } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input: AssessmentInput = {
      businessUnit: body.businessUnit,
      organizationType: body.organizationType,
      organizationName: body.organizationName,
      visitorName: body.visitorName,
      visitorRole: body.visitorRole,
      visitPurpose: body.visitPurpose,
    };

    // 验证必填字段
    const required = [
      "businessUnit",
      "organizationType",
      "organizationName",
      "visitorName",
      "visitorRole",
      "visitPurpose",
    ] as const;
    const missing = required.filter((f) => !input[f]?.trim());
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    // 执行风险评估
    const result = performAssessment(input);

    // 存储结果
    addAssessment(result);

    return NextResponse.json({ success: true, data: result });
  } catch {
    return NextResponse.json(
      { error: "Assessment failed. Please check your input." },
      { status: 500 }
    );
  }
}
