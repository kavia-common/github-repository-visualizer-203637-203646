import React from "react";

// PUBLIC_INTERFACE
export default function InsightsPanel({ repo, selectedPath }) {
  /** Right-side panel showing derived and mock insights for the selected repository. */
  if (!repo) {
    return (
      <aside className="Card" aria-label="Insights">
        <div className="Card-header">
          <div>
            <div className="Card-title">Insights</div>
            <div className="Card-subtitle">No repository loaded</div>
          </div>
        </div>
        <div className="Card-body">
          <div className="HelpText">Load a repository to see insights.</div>
        </div>
      </aside>
    );
  }

  const insights = repo.insights || {};

  return (
    <aside className="Card" aria-label="Insights">
      <div className="Card-header">
        <div>
          <div className="Card-title">Insights</div>
          <div className="Card-subtitle">Signals from mock repository data</div>
        </div>
      </div>

      <div className="Card-body Stack">
        <div className="HelpText">{insights.summary || "No insights available."}</div>

        <div>
          <div className="Card-title" style={{ fontSize: 12 }}>
            Highlights
          </div>
          {Array.isArray(insights.highlights) && insights.highlights.length > 0 ? (
            <ul className="List">
              {insights.highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          ) : (
            <div className="HelpText">No highlights.</div>
          )}
        </div>

        <div>
          <div className="Card-title" style={{ fontSize: 12 }}>
            Hotspots
          </div>
          {Array.isArray(insights.hotspots) && insights.hotspots.length > 0 ? (
            <div className="Stack">
              {insights.hotspots.map((hs) => (
                <div key={hs.path} className="Kpi" style={{ padding: 10 }}>
                  <div className="Kpi-label">{hs.reason}</div>
                  <div className="HelpText" style={{ marginTop: 6 }}>
                    <strong>Path:</strong>{" "}
                    <span style={{ fontFamily: "var(--mono)" }}>{hs.path}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="HelpText">No hotspots.</div>
          )}
        </div>

        {selectedPath ? (
          <div className="Kpi">
            <div className="Kpi-label">Currently selected</div>
            <div className="HelpText" style={{ marginTop: 6, fontFamily: "var(--mono)" }}>
              {selectedPath}
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
