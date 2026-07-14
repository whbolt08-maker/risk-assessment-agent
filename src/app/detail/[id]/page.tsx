"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header, Sidebar } from "@/components/layout";
import {
  ArrowLeft,
  Download,
  ShieldAlert,
  ShieldCheck,
  Clock,
  Send,
  BookOpen,
  AlertTriangle,
  MapPin,
  Users,
  UtensilsCrossed,
  Timer,
  MessageSquare,
} from "lucide-react";

interface DimensionScore {
  dimension: string;
  score: number;
  maxScore: number;
  rationale: string;
}

interface Policy {
  id: string;
  title: string;
  content: string;
}

interface EscalationDetails {
  department: string;
  notifiedAt: string;
  recipients: string[];
  status: string;
}

interface Assessment {
  id: string;
  timestamp: string;
  input: {
    businessUnit: string;
    organizationType: string;
    organizationName: string;
    visitorName: string;
    visitorRole: string;
    visitPurpose: string;
    meetingRoom?: string;
    mealRequired?: boolean;
    duration?: string;
    visitorCount?: number;
    hostName?: string;
    hostFeishuId?: string;
  };
  dimensionScores: DimensionScore[];
  overallScore: number;
  riskLevel: string;
  decision: string;
  decisionRationale: string;
  matchedPolicies: Policy[];
  escalationDetails?: EscalationDetails;
}

export default function DetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/assessments?id=${id}`)
      .then((r) => r.json())
      .then((res) => {
        setAssessment(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 min-w-0 overflow-y-auto bg-background p-6 flex items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </main>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="flex h-screen flex-col">
        <Header />
        <div className="flex flex-1 min-h-0">
          <Sidebar />
          <main className="flex-1 min-w-0 overflow-y-auto bg-background p-6 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-medium">Assessment not found</p>
              <Link
                href="/history"
                className="text-sm text-primary hover:underline mt-2 inline-block"
              >
                Back to History
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const isEscalated = assessment.decision === "Escalated";

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto bg-background p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold tracking-tight">
                Assessment Report
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {assessment.id} &middot;{" "}
                {new Date(assessment.timestamp).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/history"
                className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to History
              </Link>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Decision Result */}
          <div
            className={`rounded-lg p-6 mb-8 ${
              isEscalated
                ? "bg-primary text-primary-foreground"
                : "bg-success/10 border border-success/20"
            }`}
          >
            <div className="flex items-start gap-4">
              {isEscalated ? (
                <ShieldAlert className="w-8 h-8 shrink-0 mt-0.5" />
              ) : (
                <ShieldCheck className="w-8 h-8 shrink-0 mt-0.5 text-success" />
              )}
              <div>
                <h2 className="text-xl font-serif font-bold mb-1">
                  {isEscalated
                    ? "Escalated to PR Department"
                    : "Visit Auto-Cleared"}
                </h2>
                <p
                  className={`text-sm ${isEscalated ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                >
                  {assessment.decisionRationale}
                </p>
                {isEscalated && (
                  <div className="flex items-center gap-4 mt-3">
                    <span className="flex items-center gap-1.5 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      Decision at{" "}
                      {new Date(assessment.timestamp).toLocaleTimeString(
                        "en-US",
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </span>
                    <span className="bg-primary-foreground/20 text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-sm">
                      Escalated
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Visit Information */}
            <div className="bg-card rounded-lg shadow-card p-5">
              <h3 className="font-serif text-base font-semibold mb-4">
                Visit Information
              </h3>
              <div className="space-y-3">
                <InfoRow
                  label="Inviting Business Unit"
                  value={assessment.input.businessUnit}
                />
                <InfoRow
                  label="Visiting Organization"
                  value={`${assessment.input.organizationName} (${assessment.input.organizationType})`}
                />
                <InfoRow
                  label="Visitor"
                  value={`${assessment.input.visitorName}, ${assessment.input.visitorRole}`}
                />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Visit Purpose
                  </p>
                  <blockquote className="border-l-2 border-border pl-3 text-sm italic text-foreground/80">
                    &ldquo;{assessment.input.visitPurpose}&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Visit Logistics */}
            <div className="bg-card rounded-lg shadow-card p-5">
              <h3 className="font-serif text-base font-semibold mb-4">
                Visit Logistics
              </h3>
              <div className="space-y-3">
                {assessment.input.meetingRoom && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Meeting Room</p>
                      <p className="text-sm font-medium">{assessment.input.meetingRoom}</p>
                    </div>
                  </div>
                )}
                {assessment.input.duration && (
                  <div className="flex items-center gap-3">
                    <Timer className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium">{assessment.input.duration}</p>
                    </div>
                  </div>
                )}
                {assessment.input.visitorCount !== undefined && (
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Visitors</p>
                      <p className="text-sm font-medium">{assessment.input.visitorCount} person(s)</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <UtensilsCrossed className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Meal Arrangement</p>
                    <p className="text-sm font-medium">{assessment.input.mealRequired ? "Yes — meal required" : "No meal needed"}</p>
                  </div>
                </div>
                {assessment.input.hostName && (
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Our Team Host</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{assessment.input.hostName}</p>
                        {assessment.input.hostFeishuId && (
                          <a
                            href={`https://applink.feishu.cn/client/chat/open?openId=${assessment.input.hostFeishuId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline bg-primary/5 px-2 py-0.5 rounded"
                          >
                            <MessageSquare className="w-3 h-3" />
                            Chat on Feishu
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Risk Scores */}
            <div className="bg-card rounded-lg shadow-card p-5">
              <h3 className="font-serif text-base font-semibold mb-4">
                Risk Scoring Breakdown
              </h3>
              <div className="space-y-4">
                {assessment.dimensionScores.map((dim) => (
                  <div key={dim.dimension}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm">{dim.dimension}</span>
                      <span className="text-sm font-semibold">
                        {dim.score}/{dim.maxScore}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-accent rounded-full overflow-hidden mb-1">
                      <div
                        className={`h-full rounded-full ${
                          dim.score < 4
                            ? "bg-success"
                            : dim.score <= 6.5
                              ? "bg-warning"
                              : "bg-destructive"
                        }`}
                        style={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {dim.rationale}
                    </p>
                  </div>
                ))}
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      Overall Risk Score
                    </span>
                    <span
                      className={`text-lg font-bold font-serif ${
                        assessment.overallScore < 4
                          ? "text-success"
                          : assessment.overallScore <= 6.5
                            ? "text-warning"
                            : "text-destructive"
                      }`}
                    >
                      {assessment.overallScore}/10
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy References */}
          {assessment.matchedPolicies.length > 0 && (
            <div className="bg-card rounded-lg shadow-card p-5 mb-8">
              <h3 className="font-serif text-base font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Referenced SOP Policies
              </h3>
              <div className="space-y-3">
                {assessment.matchedPolicies.map((policy) => (
                  <blockquote
                    key={policy.id}
                    className="border-l-2 border-border pl-4 py-2"
                  >
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      {policy.title}
                    </p>
                    <p className="text-sm text-foreground/80">
                      {policy.content}
                    </p>
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          {/* Escalation Details */}
          {assessment.escalationDetails && (
            <div className="bg-card rounded-lg shadow-card p-5">
              <h3 className="font-serif text-base font-semibold mb-4 flex items-center gap-2">
                <Send className="w-4 h-4" />
                Escalation Notification
              </h3>
              <div className="space-y-3">
                <InfoRow
                  label="Department"
                  value={assessment.escalationDetails.department}
                />
                <InfoRow
                  label="Notified At"
                  value={new Date(
                    assessment.escalationDetails.notifiedAt
                  ).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
                <InfoRow
                  label="Recipients"
                  value={assessment.escalationDetails.recipients.join(", ")}
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-24">
                    Status
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-sm ${
                      assessment.escalationDetails.status === "Acknowledged"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {assessment.escalationDetails.status}
                  </span>
                </div>
                <div className="mt-3 p-3 bg-accent/50 rounded-md">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground/80">
                      Structured alert sent to PR department containing visit
                      context, risk scoring breakdown, referenced SOP policies,
                      and recommended handling approach. PR reviewers received a
                      fully-informed brief for efficient disposition.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-xs text-muted-foreground w-24 shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-sm">{value}</span>
    </div>
  );
}
