import React from "react";

function formatDate(s) {
  try {
    const d = new Date(s);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return s;
  }
}

// PUBLIC_INTERFACE
export default function RepoOverviewCard({ repo }) {
  /** Sidebar card that summarizes repository metadata (mock). */
  if (!repo) {
    return (
      <section className="Card" aria-label="Repository overview">
        <div className="Card-header">
          <div>
            <div className="Card-title">Overview</div>
            <div className="Card-subtitle">No repository loaded</div>
          </div>
        </div>
        <div className="Card-body">
          <div className="EmptyState">
            <strong>Select a repository</strong>
            <div className="HelpText">Use the input above to load a mock repository.</div>
          </div>
        </div>
      </section>
    );
  }

  const o = repo.overview;

  return (
    <section className="Card" aria-label="Repository overview">
      <div className="Card-header">
        <div>
          <div className="Card-title">Overview</div>
          <div className="Card-subtitle">
            {o.owner}/{o.name} • default: {o.defaultBranch}
          </div>
        </div>
        <span className="Badge" title="Last updated (mock)">
          Updated {formatDate(o.lastUpdated)}
        </span>
      </div>

      <div className="Card-body Stack">
        <div className="HelpText">{o.description}</div>

        <div className="KpiGrid" aria-label="Repository statistics">
          <div className="Kpi">
            <div className="Kpi-label">Stars</div>
            <div className="Kpi-value">{o.stars}</div>
          </div>
          <div className="Kpi">
            <div className="Kpi-label">Forks</div>
            <div className="Kpi-value">{o.forks}</div>
          </div>
          <div className="Kpi">
            <div className="Kpi-label">Open issues</div>
            <div className="Kpi-value">{o.openIssues}</div>
          </div>
          <div className="Kpi">
            <div className="Kpi-label">Files</div>
            <div className="Kpi-value">{Object.keys(repo.filesByPath || {}).length}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
