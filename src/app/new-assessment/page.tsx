"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header, Sidebar } from "@/components/layout";
import { AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

const BUSINESS_UNITS = [
  "AI Research Labs",
  "Content Moderation & Trust Safety",
  "Government Relations & Policy",
  "Data Infrastructure",
  "Product & Engineering",
  "International Operations",
  "Marketing & Brand",
  "Commercial & Partnerships",
  "Corporate Social Responsibility",
  "General Office & Facilities",
];

const ORG_TYPES = [
  "International Press Outlet",
  "Government Agency",
  "Academic Institution",
  "Corporate Partner",
  "NGO",
  "Media Company",
];

export default function NewAssessmentPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    businessUnit: "",
    organizationType: "",
    organizationName: "",
    visitorName: "",
    visitorRole: "",
    visitPurpose: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        router.push(`/detail/${json.data.id}`);
      }
    } catch {
      // handle error
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = Object.values(form).every((v) => v.trim().length > 0);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto bg-background p-6">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold tracking-tight">
              New Visit Assessment
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Submit a structured visit request for AI-powered risk evaluation
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Form */}
            <div className="col-span-2 space-y-8">
              {/* Section 01 */}
              <section>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-serif text-4xl font-bold text-muted-foreground/30">
                    01
                  </span>
                  <div>
                    <h2 className="text-base font-semibold">
                      Inviting Business Unit
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Select the ByteDance department hosting the visit
                    </p>
                  </div>
                </div>
                <select
                  value={form.businessUnit}
                  onChange={(e) => update("businessUnit", e.target.value)}
                  className="w-full bg-muted border-none rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none"
                >
                  <option value="">Select business unit...</option>
                  {BUSINESS_UNITS.map((bu) => (
                    <option key={bu} value={bu}>
                      {bu}
                    </option>
                  ))}
                </select>
              </section>

              {/* Section 02 */}
              <section>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-serif text-4xl font-bold text-muted-foreground/30">
                    02
                  </span>
                  <div>
                    <h2 className="text-base font-semibold">
                      Visiting Organization Profile
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Details about the visiting organization and personnel
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <select
                    value={form.organizationType}
                    onChange={(e) =>
                      update("organizationType", e.target.value)
                    }
                    className="w-full bg-muted border-none rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none"
                  >
                    <option value="">Organization type...</option>
                    {ORG_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Organization name"
                      value={form.organizationName}
                      onChange={(e) =>
                        update("organizationName", e.target.value)
                      }
                      className="bg-muted border-none rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/40"
                    />
                    <input
                      type="text"
                      placeholder="Visitor name"
                      value={form.visitorName}
                      onChange={(e) => update("visitorName", e.target.value)}
                      className="bg-muted border-none rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Department / Role of visitor"
                    value={form.visitorRole}
                    onChange={(e) => update("visitorRole", e.target.value)}
                    className="w-full bg-muted border-none rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/40"
                  />
                </div>
              </section>

              {/* Section 03 */}
              <section>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-serif text-4xl font-bold text-muted-foreground/30">
                    03
                  </span>
                  <div>
                    <h2 className="text-base font-semibold">Visit Purpose</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Describe the stated purpose of the visit
                    </p>
                  </div>
                </div>
                <textarea
                  rows={4}
                  placeholder="e.g., Request for tour of AI research labs and interview with technical leads regarding content moderation algorithms..."
                  value={form.visitPurpose}
                  onChange={(e) => update("visitPurpose", e.target.value)}
                  className="w-full bg-muted border-none rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/40 resize-none"
                />
              </section>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={!isValid || submitting}
                  className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Assessing...
                    </>
                  ) : (
                    "Submit for Assessment"
                  )}
                </button>
                <button className="px-6 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent transition-colors">
                  Save Draft
                </button>
              </div>
            </div>

            {/* Preview Panel */}
            <div>
              <div className="bg-card rounded-lg shadow-card p-5 sticky top-6">
                <h3 className="font-serif text-base font-semibold mb-4">
                  Assessment Preview
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Real-time risk estimation based on your inputs
                </p>

                <PreviewScore form={form} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function PreviewScore({ form }: { form: Record<string, string> }) {
  const { score, level, factors } = estimateRisk(form);

  return (
    <div className="space-y-4">
      {/* Score bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground">Risk Score</span>
          <span className="text-sm font-semibold">
            {score.toFixed(1)}
            <span className="text-muted-foreground font-normal">/10</span>
          </span>
        </div>
        <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              score < 4
                ? "bg-success"
                : score <= 6.5
                  ? "bg-warning"
                  : "bg-destructive"
            }`}
            style={{ width: `${score * 10}%` }}
          />
        </div>
      </div>

      {/* Level */}
      <div className="flex items-center gap-2">
        {score > 6.5 ? (
          <AlertTriangle className="w-4 h-4 text-destructive" />
        ) : (
          <CheckCircle className="w-4 h-4 text-success" />
        )}
        <span
          className={`text-sm font-medium ${score > 6.5 ? "text-destructive" : "text-success"}`}
        >
          {level}
        </span>
      </div>

      {/* Decision */}
      <div className="bg-accent/50 rounded-md p-3">
        <p className="text-xs font-medium text-muted-foreground mb-1">
          Decision
        </p>
        <p className="text-sm font-medium">
          {score > 6.5 ? "Escalate to PR" : "Auto-clear"}
        </p>
      </div>

      {/* Risk factors */}
      {factors.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Triggered Factors
          </p>
          <ul className="space-y-1.5">
            {factors.map((f, i) => (
              <li key={i} className="text-xs text-foreground/80 flex items-start gap-1.5">
                <span className="text-muted-foreground mt-0.5">-</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function estimateRisk(form: Record<string, string>) {
  const orgScores: Record<string, number> = {
    "International Press Outlet": 8,
    "Government Agency": 9,
    NGO: 7,
    "Media Company": 6,
    "Academic Institution": 4,
    "Corporate Partner": 3,
  };
  const buScores: Record<string, number> = {
    "AI Research Labs": 9,
    "Content Moderation & Trust Safety": 8,
    "Government Relations & Policy": 7,
    "Data Infrastructure": 8,
    "Product & Engineering": 5,
    "International Operations": 5,
    "Marketing & Brand": 4,
    "Commercial & Partnerships": 4,
    "Corporate Social Responsibility": 2,
    "General Office & Facilities": 1,
  };

  const orgScore = orgScores[form.organizationType] || 5;
  const buScore = buScores[form.businessUnit] || 5;

  const lower = form.visitPurpose.toLowerCase();
  const highKw = [
    "interview", "algorithm", "data", "investigat", "lab", "server",
    "moderation", "training data", "regulatory",
  ];
  const medKw = [
    "demonstration", "product", "panel", "collaboration", "partnership",
    "technology", "research",
  ];
  const highMatches = highKw.filter((k) => lower.includes(k));
  const medMatches = medKw.filter((k) => lower.includes(k));

  let purposeScore = 2;
  if (highMatches.length >= 2) purposeScore = 8;
  else if (highMatches.length === 1) purposeScore = 6;
  else if (medMatches.length >= 1) purposeScore = 4;

  const score = orgScore * 0.4 + buScore * 0.3 + purposeScore * 0.3;
  const level = score < 4 ? "Low Risk" : score <= 6.5 ? "Medium Risk" : "High Risk";

  const factors: string[] = [];
  if (orgScore >= 7)
    factors.push(`${form.organizationType || "Organization"} classified as high sensitivity`);
  if (buScore >= 7)
    factors.push(`${form.businessUnit || "Business unit"} has elevated sensitivity`);
  if (purposeScore >= 6)
    factors.push("Visit purpose contains elevated-risk indicators");
  if (highMatches.length > 0)
    factors.push(`Keywords detected: ${highMatches.slice(0, 3).join(", ")}`);

  return { score, level, factors };
}
