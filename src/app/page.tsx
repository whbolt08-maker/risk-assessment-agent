"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header, Sidebar } from "@/components/layout";
import {
  ShieldCheck,
  ShieldAlert,
  Clock,
  FileText,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface Assessment {
  id: string;
  timestamp: string;
  input: {
    organizationName: string;
    businessUnit: string;
  };
  overallScore: number;
  riskLevel: string;
  decision: string;
}

interface DashboardData {
  stats: {
    total: number;
    cleared: number;
    escalated: number;
    pending: number;
    distribution: { low: number; medium: number; high: number };
  };
  recentAssessments: Assessment[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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

  const stats = data?.stats;
  const recent = data?.recentAssessments || [];
  const dist = data?.stats.distribution;

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto bg-background p-6">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold tracking-tight">
              Risk Assessment Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Overview of visit risk evaluations and agent decisions
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={FileText}
              label="Total Assessments"
              value={stats?.total ?? 0}
              color="text-foreground"
            />
            <StatCard
              icon={ShieldCheck}
              label="Cleared"
              value={stats?.cleared ?? 0}
              color="text-success"
            />
            <StatCard
              icon={ShieldAlert}
              label="Escalated to PR"
              value={stats?.escalated ?? 0}
              color="text-destructive"
            />
            <StatCard
              icon={Clock}
              label="Pending Review"
              value={stats?.pending ?? 0}
              color="text-warning"
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Recent Assessments */}
            <div className="col-span-2">
              <h2 className="font-serif text-lg font-semibold mb-4">
                Recent Assessments
              </h2>
              <div className="bg-card rounded-lg shadow-card divide-y divide-border">
                {recent.map((item) => (
                  <Link
                    key={item.id}
                    href={`/detail/${item.id}`}
                    className="flex items-center justify-between px-5 py-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.input.organizationName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.input.businessUnit} &middot;{" "}
                        {new Date(item.timestamp).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <div className="text-right">
                        <span className="text-sm font-semibold">
                          {item.overallScore}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /10
                        </span>
                      </div>
                      <div className="w-20 h-1.5 bg-accent rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.overallScore < 4
                              ? "bg-success"
                              : item.overallScore <= 6.5
                              ? "bg-warning"
                              : "bg-destructive"
                          }`}
                          style={{ width: `${item.overallScore * 10}%` }}
                        />
                      </div>
                      <StatusBadge status={item.decision} />
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Risk Distribution */}
            <div>
              <h2 className="font-serif text-lg font-semibold mb-4">
                Risk Distribution
              </h2>
              <div className="bg-card rounded-lg shadow-card p-5">
                <div className="space-y-4">
                  <DistributionBar
                    label="Low Risk"
                    count={dist?.low ?? 0}
                    total={stats?.total ?? 1}
                    color="bg-success"
                  />
                  <DistributionBar
                    label="Medium Risk"
                    count={dist?.medium ?? 0}
                    total={stats?.total ?? 1}
                    color="bg-warning"
                  />
                  <DistributionBar
                    label="High Risk"
                    count={dist?.high ?? 0}
                    total={stats?.total ?? 1}
                    color="bg-destructive"
                  />
                </div>
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <span>
                      {stats
                        ? `${Math.round(((stats.cleared) / stats.total) * 100)}% auto-clear rate`
                        : "0% auto-clear rate"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Action */}
              <Link
                href="/new-assessment"
                className="mt-4 block w-full bg-primary text-primary-foreground text-center py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
              >
                New Assessment
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof FileText;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-card rounded-lg shadow-card p-5">
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className={`font-serif text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Cleared: "bg-success/10 text-success",
    Escalated: "bg-destructive/10 text-destructive",
    Pending: "bg-warning/10 text-warning",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-sm ${styles[status] || styles.Pending}`}
    >
      {status}
    </span>
  );
}

function DistributionBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm">{label}</span>
        <span className="text-xs text-muted-foreground">
          {count} ({pct}%)
        </span>
      </div>
      <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
