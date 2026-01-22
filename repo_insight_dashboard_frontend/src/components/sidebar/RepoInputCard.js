import React from "react";

// PUBLIC_INTERFACE
export default function RepoInputCard({
  repoInput,
  onRepoInputChange,
  onRepoInputSubmit,
  recentRepos,
  onPickRecent,
  activeRepoKey,
  error,
}) {
  /** Sidebar card for repository selection and recent repositories. */
  return (
    <section className="Card" aria-label="Repository selector">
      <div className="Card-header">
        <div>
          <div className="Card-title">Repository</div>
          <div className="Card-subtitle">Enter owner/repo or GitHub URL</div>
        </div>
      </div>

      <div className="Card-body Stack">
        <div className="Row">
          <label className="srOnly" htmlFor="repoInput">
            Repository
          </label>
          <input
            id="repoInput"
            className="Input"
            value={repoInput}
            onChange={(e) => onRepoInputChange(e.target.value)}
            placeholder="kavia-ai/repo-insight-demo"
            onKeyDown={(e) => {
              if (e.key === "Enter") onRepoInputSubmit();
            }}
            aria-describedby="repoHelp"
          />
          <button type="button" className="Button Button-primary" onClick={onRepoInputSubmit}>
            Load
          </button>
        </div>

        <div id="repoHelp" className="HelpText">
          Demo dataset includes: <strong>kavia-ai/repo-insight-demo</strong>
        </div>

        {error ? <div className="ErrorText" role="alert">{error}</div> : null}

        {recentRepos && recentRepos.length > 0 ? (
          <div className="Stack" aria-label="Recent repositories">
            <div className="Card-title" style={{ fontSize: 12 }}>
              Recent
            </div>
            <div className="RecentList">
              {recentRepos.map((key) => (
                <button
                  key={key}
                  type="button"
                  className="Pill"
                  data-active={key === activeRepoKey ? "true" : "false"}
                  onClick={() => onPickRecent(key)}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
