/**
 * 风险评估引擎
 * 实现多维度评分 + 条件决策逻辑
 */

import { retrieveRelevantPolicies, type PolicySection } from "./sop/policies";

// ===== 类型定义 =====

export interface AssessmentInput {
  businessUnit: string;
  organizationType: string;
  organizationName: string;
  visitorName: string;
  visitorRole: string;
  visitPurpose: string;
  // 后勤细节
  meetingRoom?: string;
  mealRequired?: boolean;
  duration?: string;
  visitorCount?: number;
  hostName?: string;
  hostFeishuId?: string;
}

export interface DimensionScore {
  dimension: string;
  score: number;
  maxScore: number;
  rationale: string;
}

export interface AssessmentResult {
  id: string;
  timestamp: string;
  input: AssessmentInput;
  dimensionScores: DimensionScore[];
  overallScore: number;
  riskLevel: "Low" | "Medium" | "High";
  decision: "Cleared" | "Escalated";
  decisionRationale: string;
  matchedPolicies: PolicySection[];
  escalationDetails?: {
    department: string;
    notifiedAt: string;
    recipients: string[];
    status: "Sent" | "Acknowledged" | "Pending";
  };
}

// ===== 组织敏感度评分 =====

const ORG_SENSITIVITY: Record<string, { score: number; tier: string; rationale: string }> = {
  "International Press Outlet": {
    score: 8,
    tier: "Tier 1",
    rationale: "International press with investigative capacity carries high reputational exposure",
  },
  "Government Agency": {
    score: 9,
    tier: "Tier 1",
    rationale: "Government regulatory or intelligence agencies require highest scrutiny",
  },
  "NGO": {
    score: 7,
    tier: "Tier 1",
    rationale: "NGOs focused on advocacy may have adversarial positioning",
  },
  "Media Company": {
    score: 6,
    tier: "Tier 2",
    rationale: "Mainstream media without investigative focus presents moderate risk",
  },
  "Academic Institution": {
    score: 4,
    tier: "Tier 2",
    rationale: "Academic visits are generally routine but may involve technology discussions",
  },
  "Corporate Partner": {
    score: 3,
    tier: "Tier 3",
    rationale: "Established corporate partners with existing agreements are low risk",
  },
};

// ===== 业务单元敏感度评分 =====

const BU_SENSITIVITY: Record<string, { score: number; rationale: string }> = {
  "AI Research Labs": {
    score: 9,
    rationale: "Access to proprietary models, training data, and research methodologies",
  },
  "Content Moderation & Trust Safety": {
    score: 8,
    rationale: "Algorithmic decision-making processes are highly sensitive",
  },
  "Government Relations & Policy": {
    score: 7,
    rationale: "Regulatory engagement context requires careful handling",
  },
  "Data Infrastructure": {
    score: 8,
    rationale: "User data handling systems present privacy and compliance risks",
  },
  "Product & Engineering": {
    score: 5,
    rationale: "General product demonstrations are manageable with standard protocols",
  },
  "International Operations": {
    score: 5,
    rationale: "Market-specific strategies may be commercially sensitive",
  },
  "Marketing & Brand": {
    score: 4,
    rationale: "Campaign previews and brand discussions are moderate risk",
  },
  "Commercial & Partnerships": {
    score: 4,
    rationale: "Deal discussions require confidentiality but are routine",
  },
  "Corporate Social Responsibility": {
    score: 2,
    rationale: "CSR programs are public-facing and low risk",
  },
  "General Office & Facilities": {
    score: 1,
    rationale: "General office areas involve minimal proprietary exposure",
  },
};

// ===== 来访目的敏感度评分 =====

function assessPurposeSensitivity(purpose: string): { score: number; rationale: string } {
  const lower = purpose.toLowerCase();

  // 高敏感度关键词
  const highRiskKeywords = [
    "interview", "algorithm", "data", "investigat", "lab", "server",
    "moderation", "training data", "model", "surveillance", "regulatory",
    "compliance", "internal", "proprietary", "classified",
  ];
  const highRiskMatches = highRiskKeywords.filter((kw) => lower.includes(kw));

  if (highRiskMatches.length >= 2) {
    return {
      score: 8,
      rationale: `Purpose contains multiple elevated-risk indicators: ${highRiskMatches.join(", ")}`,
    };
  }
  if (highRiskMatches.length === 1) {
    return {
      score: 6,
      rationale: `Purpose contains elevated-risk indicator: ${highRiskMatches[0]}`,
    };
  }

  // 中敏感度关键词
  const medRiskKeywords = [
    "demonstration", "product", "panel", "collaboration", "partnership",
    "technology", "research", "trend", "overview",
  ];
  const medRiskMatches = medRiskKeywords.filter((kw) => lower.includes(kw));

  if (medRiskMatches.length >= 1) {
    return {
      score: 4,
      rationale: `Purpose indicates standard business activity: ${medRiskMatches.join(", ")}`,
    };
  }

  // 低敏感度
  return {
    score: 2,
    rationale: "Purpose appears routine (courtesy visit, tour, or ceremonial event)",
  };
}

// ===== 核心评估函数 =====

export function performAssessment(input: AssessmentInput): AssessmentResult {
  // Stage 1: 组织敏感度评分
  const orgConfig = ORG_SENSITIVITY[input.organizationType] || {
    score: 5,
    tier: "Tier 2",
    rationale: "Organization type not in classification database, defaulting to moderate",
  };
  const orgScore: DimensionScore = {
    dimension: "Organization Sensitivity",
    score: orgConfig.score,
    maxScore: 10,
    rationale: `${orgConfig.tier} — ${orgConfig.rationale}`,
  };

  // Stage 2: 业务单元敏感度评分
  const buConfig = BU_SENSITIVITY[input.businessUnit] || {
    score: 5,
    rationale: "Business unit not in classification matrix, defaulting to moderate",
  };
  const buScore: DimensionScore = {
    dimension: "Business Unit Sensitivity",
    score: buConfig.score,
    maxScore: 10,
    rationale: buConfig.rationale,
  };

  // Stage 3: 来访目的敏感度评分
  const purposeConfig = assessPurposeSensitivity(input.visitPurpose);
  const purposeScore: DimensionScore = {
    dimension: "Visit Purpose Specificity",
    score: purposeConfig.score,
    maxScore: 10,
    rationale: purposeConfig.rationale,
  };

  // Stage 4: 综合评分（加权平均）
  const overallScore = Math.round(
    (orgScore.score * 0.4 + buScore.score * 0.3 + purposeConfig.score * 0.3) * 10
  ) / 10;

  // Stage 5: 风险等级判定
  const riskLevel: "Low" | "Medium" | "High" =
    overallScore < 4 ? "Low" : overallScore <= 6.5 ? "Medium" : "High";

  // Stage 6: 决策逻辑
  const hasExtremeDimension =
    orgScore.score >= 8 || buScore.score >= 8 || purposeConfig.score >= 8;
  const isTier1AndHighPurpose =
    (input.organizationType === "International Press Outlet" ||
      input.organizationType === "Government Agency") &&
    purposeConfig.score >= 6;

  const shouldEscalate = overallScore > 6.5 || hasExtremeDimension || isTier1AndHighPurpose;
  const decision: "Cleared" | "Escalated" = shouldEscalate ? "Escalated" : "Cleared";

  // Stage 7: 决策理由
  let decisionRationale = "";
  if (shouldEscalate) {
    const reasons: string[] = [];
    if (overallScore > 6.5) reasons.push(`composite score ${overallScore} exceeds threshold 6.5`);
    if (hasExtremeDimension) reasons.push("at least one dimension scored 8+");
    if (isTier1AndHighPurpose)
      reasons.push("Tier 1 organization with elevated visit purpose");
    decisionRationale = `Escalation triggered: ${reasons.join("; ")}. Per SOP-005, this case requires PR department review.`;
  } else {
    decisionRationale = `Risk score ${overallScore} is within acceptable range. Per SOP-001 Section 3, this visit is auto-cleared. All inputs and scoring rationale have been logged for audit.`;
  }

  // Stage 8: 检索相关 SOP 政策
  const matchedPolicies = retrieveRelevantPolicies(
    input.businessUnit,
    input.organizationType,
    input.visitPurpose
  );

  // Stage 9: 构建结果
  const result: AssessmentResult = {
    id: `RA-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    timestamp: new Date().toISOString(),
    input,
    dimensionScores: [orgScore, buScore, purposeScore],
    overallScore,
    riskLevel,
    decision,
    decisionRationale,
    matchedPolicies,
  };

  // Stage 10: 如需升级，生成升级详情
  if (decision === "Escalated") {
    result.escalationDetails = {
      department: "PR Department",
      notifiedAt: new Date().toISOString(),
      recipients: ["pr-team@bytedance-demo.com", "compliance@bytedance-demo.com"],
      status: "Sent",
    };
  }

  return result;
}
