"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header, Sidebar } from "@/components/layout";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Assessment {
  id: string;
  timestamp: string;
  input: {
    organizationName: string;
    businessUnit: string;
    organizationType: string;
  };
  overallScore: number;
  riskLevel: string;
  decision: string;
}

export default function HistoryPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    fetch("/api/assessments")
      .then((r) => r.json())
      .then((res) => {
        setAssessments(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = assessments.filter((a) => {
    const matchFilter =
      filter === "All" || a.decision === filter;
    const matchSearch =
      !search ||
      a.input.organizationName.toLowerCase().includes(search.toLowerCase()) ||
      a.input.businessUnit.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const filters = ["All", "Cleared", "Escalated"];

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto bg-background p-6">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold tracking-tight">
              Assessment History
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Browse and search all visit risk assessments
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-lg shadow-card p-4 mb-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFilter(f);
                      setPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      filter === f
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search organization or unit..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="bg-muted border-none rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/40 w-64"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <p className="text-muted-foreground text-center py-12">Loading...</p>
          ) : (
            <>
              <div className="bg-card rounded-lg shadow-card overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-accent/50 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border">
                  <div className="col-span-3">Organization</div>
                  <div className="col-span-3">Business Unit</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-1">Score</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1 text-right">Action</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-border">
                  {paged.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-accent/30 transition-colors"
                    >
                      <div className="col-span-3">
                        <p className="text-sm font-medium truncate">
                          {item.input.organizationName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.input.organizationType}
                        </p>
                      </div>
                      <div className="col-span-3">
                        <p className="text-sm truncate">
                          {item.input.businessUnit}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.timestamp).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div className="col-span-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">
                            {item.overallScore}
                          </span>
                          <div className="w-10 h-1.5 bg-accent rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                item.overallScore < 4
                                  ? "bg-success"
                                  : item.overallScore <= 6.5
                                    ? "bg-warning"
                                    : "bg-destructive"
                              }`}
                              style={{
                                width: `${item.overallScore * 10}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <StatusBadge status={item.decision} />
                      </div>
                      <div className="col-span-1 text-right">
                        <Link
                          href={`/detail/${item.id}`}
                          className="text-xs font-medium text-primary hover:underline"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 px-1">
                  <p className="text-xs text-muted-foreground">
                    Showing {(page - 1) * perPage + 1}-
                    {Math.min(page * perPage, filtered.length)} of{" "}
                    {filtered.length}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-1.5 rounded-md hover:bg-accent disabled:opacity-30 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                          page === i + 1
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                      className="p-1.5 rounded-md hover:bg-accent disabled:opacity-30 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
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
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded-sm ${styles[status] || styles.Pending}`}
    >
      {status}
    </span>
  );
}
