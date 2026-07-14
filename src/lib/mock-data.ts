/**
 * 模拟数据存储
 * 在内存中存储评估记录，模拟数据库
 */

import { type AssessmentResult } from "./assessment-engine";

// 预填充的模拟历史数据
const mockHistory: AssessmentResult[] = [
  {
    id: "RA-2024-0081",
    timestamp: "2024-12-01T09:15:00Z",
    input: {
      businessUnit: "Marketing & Brand",
      organizationType: "Corporate Partner",
      organizationName: "Acme Global Trading",
      visitorName: "Sarah Johnson",
      visitorRole: "Partnership Director",
      visitPurpose: "General office tour and brand collaboration discussion",
      meetingRoom: "Conference Room A-301",
      mealRequired: false,
      duration: "1.5 hours",
      visitorCount: 3,
      hostName: "Lisa Wang",
      hostFeishuId: "ou_lisa_wang_001",
    },
    dimensionScores: [
      { dimension: "Organization Sensitivity", score: 3, maxScore: 10, rationale: "Tier 3 — Established corporate partners with existing agreements are low risk" },
      { dimension: "Business Unit Sensitivity", score: 4, maxScore: 10, rationale: "Campaign previews and brand discussions are moderate risk" },
      { dimension: "Visit Purpose Specificity", score: 2, maxScore: 10, rationale: "Purpose appears routine (courtesy visit, tour, or ceremonial event)" },
    ],
    overallScore: 3.0,
    riskLevel: "Low",
    decision: "Cleared",
    decisionRationale: "Risk score 3.0 is within acceptable range. Auto-cleared per SOP-001.",
    matchedPolicies: [],
  },
  {
    id: "RA-2024-0082",
    timestamp: "2024-12-02T14:30:00Z",
    input: {
      businessUnit: "AI Research Labs",
      organizationType: "International Press Outlet",
      organizationName: "Reuters",
      visitorName: "James Chen",
      visitorRole: "Senior Technology Correspondent",
      visitPurpose: "Request for interview with AI research leads about content moderation algorithms and training data practices",
      meetingRoom: "Executive Meeting Room B-501",
      mealRequired: true,
      duration: "3 hours",
      visitorCount: 2,
      hostName: "Dr. Michael Zhang",
      hostFeishuId: "ou_michael_zhang_002",
    },
    dimensionScores: [
      { dimension: "Organization Sensitivity", score: 8, maxScore: 10, rationale: "Tier 1 — International press with investigative capacity" },
      { dimension: "Business Unit Sensitivity", score: 9, maxScore: 10, rationale: "Access to proprietary models and training data" },
      { dimension: "Visit Purpose Specificity", score: 8, maxScore: 10, rationale: "Purpose contains multiple elevated-risk indicators: interview, algorithm, data, moderation" },
    ],
    overallScore: 8.3,
    riskLevel: "High",
    decision: "Escalated",
    decisionRationale: "Escalation triggered: composite score 8.3 exceeds threshold 6.5; at least one dimension scored 8+; Tier 1 organization with elevated visit purpose.",
    matchedPolicies: [],
    escalationDetails: {
      department: "PR Department",
      notifiedAt: "2024-12-02T14:31:00Z",
      recipients: ["pr-team@bytedance-demo.com"],
      status: "Acknowledged",
    },
  },
  {
    id: "RA-2024-0083",
    timestamp: "2024-12-03T10:00:00Z",
    input: {
      businessUnit: "Product & Engineering",
      organizationType: "Academic Institution",
      organizationName: "Harvard Kennedy School",
      visitorName: "Prof. Emily Watson",
      visitorRole: "Department Chair",
      visitPurpose: "Academic collaboration discussion on technology policy trends",
      meetingRoom: "Seminar Room C-201",
      mealRequired: true,
      duration: "2 hours",
      visitorCount: 4,
      hostName: "Prof. Sarah Chen",
      hostFeishuId: "ou_sarah_chen_003",
    },
    dimensionScores: [
      { dimension: "Organization Sensitivity", score: 4, maxScore: 10, rationale: "Tier 2 — Academic visits are generally routine" },
      { dimension: "Business Unit Sensitivity", score: 5, maxScore: 10, rationale: "General product demonstrations are manageable" },
      { dimension: "Visit Purpose Specificity", score: 4, maxScore: 10, rationale: "Purpose indicates standard business activity: collaboration, technology, trend" },
    ],
    overallScore: 4.3,
    riskLevel: "Medium",
    decision: "Cleared",
    decisionRationale: "Risk score 4.3 is within acceptable range. Auto-cleared per SOP-001.",
    matchedPolicies: [],
  },
  {
    id: "RA-2024-0084",
    timestamp: "2024-12-04T16:45:00Z",
    input: {
      businessUnit: "Content Moderation & Trust Safety",
      organizationType: "NGO",
      organizationName: "Amnesty International",
      visitorName: "Maria Garcia",
      visitorRole: "Digital Rights Researcher",
      visitPurpose: "Investigation into content moderation algorithms and data handling practices",
      meetingRoom: "Secure Meeting Room D-102",
      mealRequired: false,
      duration: "2.5 hours",
      visitorCount: 2,
      hostName: "Kevin Liu",
      hostFeishuId: "ou_kevin_liu_004",
    },
    dimensionScores: [
      { dimension: "Organization Sensitivity", score: 7, maxScore: 10, rationale: "Tier 1 — NGOs focused on advocacy may have adversarial positioning" },
      { dimension: "Business Unit Sensitivity", score: 8, maxScore: 10, rationale: "Algorithmic decision-making processes are highly sensitive" },
      { dimension: "Visit Purpose Specificity", score: 8, maxScore: 10, rationale: "Purpose contains multiple elevated-risk indicators: investigation, algorithm, data, moderation" },
    ],
    overallScore: 7.7,
    riskLevel: "High",
    decision: "Escalated",
    decisionRationale: "Escalation triggered: composite score 7.7 exceeds threshold 6.5; at least one dimension scored 8+.",
    matchedPolicies: [],
    escalationDetails: {
      department: "PR Department",
      notifiedAt: "2024-12-04T16:46:00Z",
      recipients: ["pr-team@bytedance-demo.com"],
      status: "Sent",
    },
  },
  {
    id: "RA-2024-0085",
    timestamp: "2024-12-05T11:20:00Z",
    input: {
      businessUnit: "Commercial & Partnerships",
      organizationType: "Corporate Partner",
      organizationName: "McKinsey & Company",
      visitorName: "David Park",
      visitorRole: "Engagement Manager",
      visitPurpose: "Partnership exploration meeting and market overview",
      meetingRoom: "Board Room E-801",
      mealRequired: true,
      duration: "2 hours",
      visitorCount: 3,
      hostName: "Jennifer Wu",
      hostFeishuId: "ou_jennifer_wu_005",
    },
    dimensionScores: [
      { dimension: "Organization Sensitivity", score: 3, maxScore: 10, rationale: "Tier 3 — Established corporate partner" },
      { dimension: "Business Unit Sensitivity", score: 4, maxScore: 10, rationale: "Deal discussions require confidentiality but are routine" },
      { dimension: "Visit Purpose Specificity", score: 4, maxScore: 10, rationale: "Purpose indicates standard business activity: partnership" },
    ],
    overallScore: 3.6,
    riskLevel: "Low",
    decision: "Cleared",
    decisionRationale: "Risk score 3.6 is within acceptable range. Auto-cleared per SOP-001.",
    matchedPolicies: [],
  },
  {
    id: "RA-2024-0086",
    timestamp: "2024-12-06T09:00:00Z",
    input: {
      businessUnit: "International Operations",
      organizationType: "Media Company",
      organizationName: "BBC World Service",
      visitorName: "Thomas Wright",
      visitorRole: "Executive Producer",
      visitPurpose: "Request for interview with regional operations leads about market strategies",
      meetingRoom: "Conference Room F-402",
      mealRequired: false,
      duration: "1.5 hours",
      visitorCount: 2,
      hostName: "Alex Tan",
      hostFeishuId: "ou_alex_tan_006",
    },
    dimensionScores: [
      { dimension: "Organization Sensitivity", score: 6, maxScore: 10, rationale: "Tier 2 — Mainstream media without investigative focus" },
      { dimension: "Business Unit Sensitivity", score: 5, maxScore: 10, rationale: "Market-specific strategies may be commercially sensitive" },
      { dimension: "Visit Purpose Specificity", score: 6, maxScore: 10, rationale: "Purpose contains elevated-risk indicator: interview" },
    ],
    overallScore: 5.7,
    riskLevel: "Medium",
    decision: "Cleared",
    decisionRationale: "Risk score 5.7 is within acceptable range. Auto-cleared per SOP-001.",
    matchedPolicies: [],
  },
  {
    id: "RA-2024-0087",
    timestamp: "2024-12-07T13:30:00Z",
    input: {
      businessUnit: "International Operations",
      organizationType: "International Press Outlet",
      organizationName: "Reuters",
      visitorName: "John Smith",
      visitorRole: "Senior Correspondent",
      visitPurpose: "Request for tour of AI research labs and interview with technical leads regarding content moderation algorithms",
      meetingRoom: "Executive Meeting Room B-501",
      mealRequired: true,
      duration: "3 hours",
      visitorCount: 2,
      hostName: "Dr. Michael Zhang",
      hostFeishuId: "ou_michael_zhang_002",
    },
    dimensionScores: [
      { dimension: "Organization Sensitivity", score: 8, maxScore: 10, rationale: "Tier 1 — International press with investigative capacity" },
      { dimension: "Business Unit Sensitivity", score: 5, maxScore: 10, rationale: "International Operations - Moderate" },
      { dimension: "Visit Purpose Specificity", score: 8, maxScore: 10, rationale: "Purpose contains multiple elevated-risk indicators: interview, algorithm, lab, moderation" },
    ],
    overallScore: 7.0,
    riskLevel: "High",
    decision: "Escalated",
    decisionRationale: "Escalation triggered: composite score 7.0 exceeds threshold 6.5; at least one dimension scored 8+; Tier 1 organization with elevated visit purpose.",
    matchedPolicies: [],
    escalationDetails: {
      department: "PR Department",
      notifiedAt: "2024-12-07T13:31:00Z",
      recipients: ["pr-team@bytedance-demo.com", "compliance@bytedance-demo.com"],
      status: "Sent",
    },
  },
  {
    id: "RA-2024-0088",
    timestamp: "2024-12-08T15:00:00Z",
    input: {
      businessUnit: "Corporate Social Responsibility",
      organizationType: "NGO",
      organizationName: "UNICEF",
      visitorName: "Anna Lee",
      visitorRole: "Program Director",
      visitPurpose: "Courtesy visit to discuss CSR collaboration opportunities",
      meetingRoom: "Conference Room A-301",
      mealRequired: true,
      duration: "1.5 hours",
      visitorCount: 3,
      hostName: "Rachel Huang",
      hostFeishuId: "ou_rachel_huang_007",
    },
    dimensionScores: [
      { dimension: "Organization Sensitivity", score: 7, maxScore: 10, rationale: "Tier 1 — NGO classification" },
      { dimension: "Business Unit Sensitivity", score: 2, maxScore: 10, rationale: "CSR programs are public-facing and low risk" },
      { dimension: "Visit Purpose Specificity", score: 2, maxScore: 10, rationale: "Purpose appears routine (courtesy visit)" },
    ],
    overallScore: 3.9,
    riskLevel: "Low",
    decision: "Cleared",
    decisionRationale: "Risk score 3.9 is within acceptable range. Auto-cleared per SOP-001.",
    matchedPolicies: [],
  },
  {
    id: "RA-2024-0089",
    timestamp: "2024-12-09T10:45:00Z",
    input: {
      businessUnit: "Data Infrastructure",
      organizationType: "Government Agency",
      organizationName: "EU Digital Regulation Office",
      visitorName: "Klaus Weber",
      visitorRole: "Policy Advisor",
      visitPurpose: "Regulatory inquiry into data handling practices and compliance with Digital Services Act",
      meetingRoom: "Secure Meeting Room D-102",
      mealRequired: false,
      duration: "2 hours",
      visitorCount: 2,
      hostName: "Tom Zhou",
      hostFeishuId: "ou_tom_zhou_008",
    },
    dimensionScores: [
      { dimension: "Organization Sensitivity", score: 9, maxScore: 10, rationale: "Tier 1 — Government regulatory agency" },
      { dimension: "Business Unit Sensitivity", score: 8, maxScore: 10, rationale: "User data handling systems present privacy and compliance risks" },
      { dimension: "Visit Purpose Specificity", score: 8, maxScore: 10, rationale: "Purpose contains multiple elevated-risk indicators: regulatory, data, compliance" },
    ],
    overallScore: 8.4,
    riskLevel: "High",
    decision: "Escalated",
    decisionRationale: "Escalation triggered: composite score 8.4 exceeds threshold 6.5; at least one dimension scored 8+.",
    matchedPolicies: [],
    escalationDetails: {
      department: "PR Department",
      notifiedAt: "2024-12-09T10:46:00Z",
      recipients: ["pr-team@bytedance-demo.com", "legal@bytedance-demo.com"],
      status: "Acknowledged",
    },
  },
  {
    id: "RA-2024-0090",
    timestamp: "2024-12-10T08:30:00Z",
    input: {
      businessUnit: "General Office & Facilities",
      organizationType: "Academic Institution",
      organizationName: "Oxford University Press",
      visitorName: "Dr. Rachel Kim",
      visitorRole: "Visiting Fellow",
      visitPurpose: "General office tour and cultural exchange event",
      meetingRoom: "Lobby Reception Area",
      mealRequired: true,
      duration: "1 hour",
      visitorCount: 5,
      hostName: "Lisa Wang",
      hostFeishuId: "ou_lisa_wang_001",
    },
    dimensionScores: [
      { dimension: "Organization Sensitivity", score: 4, maxScore: 10, rationale: "Tier 2 — Academic institution" },
      { dimension: "Business Unit Sensitivity", score: 1, maxScore: 10, rationale: "General office areas involve minimal proprietary exposure" },
      { dimension: "Visit Purpose Specificity", score: 2, maxScore: 10, rationale: "Purpose appears routine (tour, cultural exchange)" },
    ],
    overallScore: 2.3,
    riskLevel: "Low",
    decision: "Cleared",
    decisionRationale: "Risk score 2.3 is within acceptable range. Auto-cleared per SOP-001.",
    matchedPolicies: [],
  },
];

let storage: AssessmentResult[] = [...mockHistory];

export function getAllAssessments(): AssessmentResult[] {
  return [...storage].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function getAssessmentById(id: string): AssessmentResult | undefined {
  return storage.find((a) => a.id === id);
}

export function addAssessment(result: AssessmentResult): void {
  storage.unshift(result);
}

export function getDashboardStats() {
  const all = getAllAssessments();
  const cleared = all.filter((a) => a.decision === "Cleared").length;
  const escalated = all.filter((a) => a.decision === "Escalated").length;
  const pending = all.filter(
    (a) => a.escalationDetails?.status === "Sent"
  ).length;
  const low = all.filter((a) => a.riskLevel === "Low").length;
  const medium = all.filter((a) => a.riskLevel === "Medium").length;
  const high = all.filter((a) => a.riskLevel === "High").length;

  return {
    total: all.length,
    cleared,
    escalated,
    pending,
    distribution: { low, medium, high },
  };
}
