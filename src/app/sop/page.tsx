import { sopDocuments, type PolicyDocument, type PolicySection } from "@/lib/sop/policies";
import { FileText, Calendar, ChevronRight } from "lucide-react";

export const metadata = {
  title: "SOP Document Center",
};

const categoryLabels: Record<string, string> = {
  "visit-management": "Visit Management",
  "organization-classification": "Organization Classification",
  "business-unit": "Business Unit",
  "visit-purpose": "Visit Purpose",
  escalation: "Escalation Protocol",
  audit: "Audit & Compliance",
};

const categoryColors: Record<string, string> = {
  "visit-management": "bg-primary/10 text-primary",
  "organization-classification": "bg-accent text-accent-foreground",
  "business-unit": "bg-muted text-muted-foreground",
  "visit-purpose": "bg-primary/5 text-primary/80",
  escalation: "bg-destructive/10 text-destructive",
  audit: "bg-muted text-muted-foreground",
};

export default function SOPPage() {
  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-3">
          SOP Document Center
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Internal compliance and visit management policies. These documents are
          automatically retrieved by the assessment agent based on visit inputs.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-lg p-4 shadow-card">
          <div className="text-3xl font-serif font-bold">{sopDocuments.length}</div>
          <div className="text-sm text-muted-foreground">Total Documents</div>
        </div>
        <div className="bg-card rounded-lg p-4 shadow-card">
          <div className="text-3xl font-serif font-bold">
            {sopDocuments.reduce((sum: number, p: PolicyDocument) => sum + p.sections.length, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Sections</div>
        </div>
        <div className="bg-card rounded-lg p-4 shadow-card">
          <div className="text-3xl font-serif font-bold">
            {new Set(sopDocuments.map((p: PolicyDocument) => p.category)).size}
          </div>
          <div className="text-sm text-muted-foreground">Categories</div>
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-4">
        {sopDocuments.map((policy: PolicyDocument, idx: number) => (
          <article
            key={policy.id}
            className="bg-card rounded-lg shadow-card overflow-hidden"
          >
            {/* Document Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">
                        {policy.id}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          categoryColors[policy.category] || "bg-muted text-muted-foreground"
                        }`}
                      >
                        {categoryLabels[policy.category] || policy.category}
                      </span>
                    </div>
                    <h2 className="font-serif text-xl font-bold">
                      {policy.title}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-1.5 text-sm text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Last updated: {policy.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground shrink-0">
                  {policy.sections.length} sections
                </span>
              </div>
            </div>

            {/* Sections */}
            <div className="divide-y divide-border">
              {policy.sections.map((section: PolicySection, sIdx: number) => (
                <div key={sIdx} className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {policy.id}-{String(sIdx + 1).padStart(3, "0")}
                    </span>
                    <h3 className="font-semibold text-base">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {section.content}
                  </p>
                  {section.keywords && section.keywords.length > 0 && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Keywords
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {section.keywords.map((keyword: string, kIdx: number) => (
                          <span
                            key={kIdx}
                            className="text-xs px-2.5 py-1 rounded-full bg-card border border-border text-muted-foreground"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-muted rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Note:</span> These SOP documents are
          automatically referenced by the Risk Assessment Agent when evaluating
          visit requests. The agent retrieves relevant sections based on the
          visiting organization type, business unit, and visit purpose to ensure
          compliance with internal policies.
        </p>
      </div>
    </div>
  );
}
