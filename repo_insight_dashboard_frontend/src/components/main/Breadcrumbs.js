import React, { useMemo } from "react";

function splitPath(path) {
  if (!path) return [];
  const parts = path.split("/").filter(Boolean);
  // include root crumb
  return ["/", ...parts];
}

function buildPaths(parts) {
  const out = [];
  let current = "";
  for (const p of parts) {
    if (p === "/") {
      out.push({ label: "/", path: "/" });
      current = "";
      continue;
    }
    current += `/${p}`;
    out.push({ label: p, path: current });
  }
  return out;
}

// PUBLIC_INTERFACE
export default function Breadcrumbs({ selectedPath, onSelectPath }) {
  /** Breadcrumb navigation for the currently selected file path. */
  const crumbs = useMemo(() => buildPaths(splitPath(selectedPath)), [selectedPath]);

  if (!selectedPath) {
    return (
      <div className="Breadcrumbs" aria-label="Breadcrumbs">
        <span>Select a file from the explorer.</span>
      </div>
    );
  }

  return (
    <div className="Breadcrumbs" aria-label="Breadcrumbs">
      {crumbs.map((c, idx) => (
        <React.Fragment key={c.path}>
          <button type="button" className="CrumbButton" onClick={() => onSelectPath(c.path)}>
            {c.label}
          </button>
          {idx < crumbs.length - 1 ? <span className="CrumbSep">/</span> : null}
        </React.Fragment>
      ))}
    </div>
  );
}
