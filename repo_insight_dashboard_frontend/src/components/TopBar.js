import React from "react";

// PUBLIC_INTERFACE
export default function TopBar({ theme, onToggleTheme }) {
  /** App top bar with brand + theme toggle. */
  return (
    <div className="TopBar">
      <div className="TopBar-inner">
        <div className="Brand" aria-label="Repo Insight Dashboard">
          <div className="Brand-mark" aria-hidden="true" />
          <div className="Brand-title">
            <strong>Repo Insight Dashboard</strong>
            <span>Mock GitHub repository visualizer (frontend-only)</span>
          </div>
        </div>

        <div className="Row">
          <span className="Badge" title="Data source">
            Static mock JSON
          </span>

          <button
            type="button"
            className="Button Button-primary"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            Theme: {theme === "light" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </div>
  );
}
