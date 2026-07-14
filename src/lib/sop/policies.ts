/**
 * SOP 合规政策参考文档
 * 模拟飞书云文档中的内部合规政策，供风险评估 Agent 检索引用
 */

export interface PolicyDocument {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export interface PolicySection {
  id: string;
  title: string;
  content: string;
  keywords: string[];
}

export const sopDocuments: PolicyDocument[] = [
  {
    id: "SOP-001",
    title: "International Visitor Management Policy",
    category: "visit-management",
    lastUpdated: "2024-06-15",
    sections: [
      {
        id: "SOP-001-01",
        title: "1. Purpose & Scope",
        content:
          "This policy governs all international visitor requests to ByteDance offices globally. It applies to visits from media organizations, government agencies, academic institutions, corporate partners, NGOs, and other external entities. All visits must be assessed for risk prior to approval.",
        keywords: ["purpose", "scope", "international", "visitor", "policy"],
      },
      {
        id: "SOP-001-02",
        title: "2. Risk Assessment Requirement",
        content:
          "Every inbound visit request from an international organization must undergo a structured risk assessment before confirmation. The assessment evaluates three dimensions: organization sensitivity, business unit sensitivity, and visit purpose specificity. A composite risk score determines whether the visit may be auto-cleared or requires PR department escalation.",
        keywords: ["risk assessment", "evaluation", "scoring", "escalation"],
      },
      {
        id: "SOP-001-03",
        title: "3. Approval Authority",
        content:
          "Low-risk visits (score < 4.0) may be auto-cleared by the system. Medium-risk visits (4.0 - 6.5) require manager-level approval. High-risk visits (score > 6.5) must be escalated to the PR department for review. All decisions are logged for audit purposes.",
        keywords: ["approval", "authority", "threshold", "auto-clear", "escalation"],
      },
    ],
  },
  {
    id: "SOP-002",
    title: "Organization Sensitivity Classification",
    category: "organization-classification",
    lastUpdated: "2024-05-20",
    sections: [
      {
        id: "SOP-002-01",
        title: "1. Tier 1 — High Sensitivity (Score: 7-10)",
        content:
          "Organizations classified as Tier 1 High Sensitivity include: major international press outlets with investigative divisions (e.g., Reuters, BBC, AP), government intelligence or regulatory agencies, organizations with known adversarial positioning toward the company, and NGOs focused on surveillance or human rights advocacy. Visits from these organizations carry inherent reputational risk and require heightened scrutiny.",
        keywords: ["tier 1", "high sensitivity", "press", "government", "NGO", "investigative"],
      },
      {
        id: "SOP-002-02",
        title: "2. Tier 2 — Moderate Sensitivity (Score: 4-6)",
        content:
          "Tier 2 organizations include: mainstream media without investigative focus, academic institutions with technology research programs, corporate partners in regulated industries, and industry associations. These visits are generally routine but may require context-specific review depending on the business unit and stated purpose.",
        keywords: ["tier 2", "moderate", "academic", "corporate", "media"],
      },
      {
        id: "SOP-002-03",
        title: "3. Tier 3 — Low Sensitivity (Score: 1-3)",
        content:
          "Tier 3 organizations include: established corporate partners with existing agreements, accredited educational institutions on routine visits, trade organizations, and cultural exchange programs. These visits are considered low-risk and may be auto-cleared provided no other risk factors are elevated.",
        keywords: ["tier 3", "low sensitivity", "routine", "partner", "educational"],
      },
    ],
  },
  {
    id: "SOP-003",
    title: "Business Unit Sensitivity Matrix",
    category: "business-unit",
    lastUpdated: "2024-04-10",
    sections: [
      {
        id: "SOP-003-01",
        title: "1. High Sensitivity Units (Score: 7-10)",
        content:
          "Business units classified as high sensitivity include: AI Research Labs (access to proprietary models and training data), Content Moderation & Trust Safety (algorithmic decision-making processes), Government Relations & Policy (regulatory engagement), and Data Infrastructure (user data handling systems). Visits to these units involving technical interviews or facility tours require elevated review.",
        keywords: ["high sensitivity", "AI research", "content moderation", "data", "government relations"],
      },
      {
        id: "SOP-003-02",
        title: "2. Moderate Sensitivity Units (Score: 4-6)",
        content:
          "Moderate sensitivity units include: Product & Engineering (general product demonstrations), International Operations (market-specific strategies), Marketing & Brand (campaign previews), and Commercial & Partnerships (deal discussions). Standard visits to these units are manageable with routine protocols.",
        keywords: ["moderate", "product", "engineering", "international", "marketing"],
      },
      {
        id: "SOP-003-03",
        title: "3. Low Sensitivity Units (Score: 1-3)",
        content:
          "Low sensitivity units include: General Office Tours (lobby, common areas, cafeteria), Corporate Social Responsibility programs, Employee Facilities & Wellness, and Public-facing Showrooms. These areas involve minimal proprietary information exposure.",
        keywords: ["low sensitivity", "office tour", "CSR", "facilities", "showroom"],
      },
    ],
  },
  {
    id: "SOP-004",
    title: "Visit Purpose Assessment Guidelines",
    category: "visit-purpose",
    lastUpdated: "2024-03-28",
    sections: [
      {
        id: "SOP-004-01",
        title: "1. High Specificity / Elevated Risk Purposes",
        content:
          "Visit purposes classified as elevated risk include: requests for interviews with named technical staff about algorithms or data practices, requests to access research labs or server rooms, investigative journalism assignments, requests for internal data or metrics, and visits related to ongoing regulatory inquiries. These purposes significantly increase the risk profile regardless of other factors.",
        keywords: ["interview", "algorithm", "data", "investigative", "lab access", "regulatory"],
      },
      {
        id: "SOP-004-02",
        title: "2. Moderate Specificity Purposes",
        content:
          "Moderate risk purposes include: general technology demonstrations, product feature overviews, panel discussions on industry trends, academic collaboration discussions, and partnership exploration meetings. These are standard business activities that require normal precautions.",
        keywords: ["demonstration", "product", "panel", "academic", "partnership"],
      },
      {
        id: "SOP-004-03",
        title: "3. Low Specificity / Routine Purposes",
        content:
          "Low risk purposes include: courtesy visits, general office tours, cultural exchange events, recruiting presentations, and pre-arranged ceremonial events. These visits have minimal information exposure risk.",
        keywords: ["courtesy", "tour", "cultural", "recruiting", "ceremonial"],
      },
    ],
  },
  {
    id: "SOP-005",
    title: "Escalation Protocol & PR Notification",
    category: "escalation",
    lastUpdated: "2024-07-01",
    sections: [
      {
        id: "SOP-005-01",
        title: "1. Escalation Trigger Conditions",
        content:
          "Automatic escalation to the PR department is triggered when: (a) the composite risk score exceeds 6.5, OR (b) any single dimension scores 8 or above, OR (c) the visiting organization is classified as Tier 1 AND the visit purpose involves technical interviews or lab access. When triggered, the system generates a structured alert containing all assessment details.",
        keywords: ["escalation", "trigger", "threshold", "alert", "PR"],
      },
      {
        id: "SOP-005-02",
        title: "2. PR Notification Content",
        content:
          "The escalation notification to PR must include: visiting organization name and classification tier, inviting business unit and contact person, visit purpose summary, composite risk score with dimensional breakdown, relevant policy references that were matched, and recommended handling approach. PR reviewers should receive a fully-informed brief, not a cold request.",
        keywords: ["notification", "content", "brief", "policy reference", "recommendation"],
      },
      {
        id: "SOP-005-03",
        title: "3. Response Time Expectations",
        content:
          "PR department is expected to acknowledge escalated cases within 4 business hours. Final disposition (approve with conditions, deny, or request additional information) should be provided within 24 business hours. The system tracks response times for performance monitoring.",
        keywords: ["response time", "SLA", "acknowledgment", "disposition"],
      },
    ],
  },
  {
    id: "SOP-006",
    title: "Audit & Record-Keeping Requirements",
    category: "audit",
    lastUpdated: "2024-02-15",
    sections: [
      {
        id: "SOP-006-01",
        title: "1. Assessment Records",
        content:
          "Every risk assessment must be logged with: unique assessment ID, timestamp, all input parameters, retrieved policy references, dimensional scores, composite score, and final disposition. Records must be retained for a minimum of 3 years per compliance requirements.",
        keywords: ["audit", "record", "retention", "log", "assessment ID"],
      },
      {
        id: "SOP-006-02",
        title: "2. Decision Traceability",
        content:
          "All decisions (auto-cleared or escalated) must include a machine-readable rationale explaining which factors contributed to the score. This enables post-hoc review and scoring weight refinement. The audit trail should allow reconstruction of any decision from its original inputs.",
        keywords: ["traceability", "rationale", "reconstruct", "weight", "review"],
      },
    ],
  },
];

/**
 * 根据关键词检索相关 SOP 政策条款
 * 模拟飞书云文档的检索能力
 */
export function retrieveRelevantPolicies(
  businessUnit: string,
  organizationType: string,
  visitPurpose: string
): PolicySection[] {
  const allSections: PolicySection[] = [];
  const searchText = `${businessUnit} ${organizationType} ${visitPurpose}`.toLowerCase();

  for (const doc of sopDocuments) {
    for (const section of doc.sections) {
      const keywordMatch = section.keywords.some((kw) =>
        searchText.includes(kw.toLowerCase())
      );
      const contentMatch = section.content
        .toLowerCase()
        .split(" ")
        .some((word) => searchText.includes(word) && word.length > 4);

      if (keywordMatch || contentMatch) {
        allSections.push({
          ...section,
          title: `[${doc.id}] ${section.title}`,
        });
      }
    }
  }

  // 确保至少返回一些核心政策
  if (allSections.length < 2) {
    const defaultSections = [
      sopDocuments[0].sections[1], // Risk Assessment Requirement
      sopDocuments[4].sections[0], // Escalation Trigger
    ];
    for (const s of defaultSections) {
      if (!allSections.find((existing) => existing.id === s.id)) {
        allSections.push({ ...s, title: `[${sopDocuments[0].id}] ${s.title}` });
      }
    }
  }

  return allSections.slice(0, 5);
}
