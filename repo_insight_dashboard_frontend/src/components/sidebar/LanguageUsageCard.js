import React, { useMemo } from "react";

function clampPct(n) {
  const v = Number.isFinite(n) ? n : 0;
  return Math.max(0, Math.min(100, v));
}

// PUBLIC_INTERFACE
export default function LanguageUsageCard({ repo }) {
  /** Sidebar card that shows language usage distribution (mock). */
  const rows = useMemo(() => {
    if (!repo?.languages) return [];
    return Object.entries(repo.languages)
      .map(([name, pct]) => ({ name, pct: clampPct(pct) }))
      .sort((a, b) => b.pct - a.pct);
  }, [repo]);

  return (
    <section className="Card" aria-label="Language usage">
      <div className="Card-header">
        <div>
          <div className="Card-title">Language usage</div>
          <div className="Card-subtitle">Estimated by bytes (mock)</div>
        </div>
      </div>
      <div className="Card-body">
        {rows.length === 0 ? (
          <div className="HelpText">No language data available.</div>
        ) : (
          <div className="Bars">
            {rows.map((r) => (
              <div key={r.name} className="BarRow">
                <div>
                  <div className="BarLabel">
                    <span>{r.name}</span>
                    <span>{r.pct.toFixed(1)}%</span>
                  </div>
                  <div className="BarTrack" aria-hidden="true">
                    <div className="BarFill" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
                <div className="BarPct" aria-label={`${r.name} percentage`}>
                  {r.pct.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
