import React from "react";
import FileExplorer from "../tree/FileExplorer";

// PUBLIC_INTERFACE
export default function ExplorerCard({
  tree,
  expandedPaths,
  selectedPath,
  onTogglePath,
  onSelectPath,
}) {
  /** Sidebar card that hosts the repository file explorer. */
  return (
    <section className="Card" aria-label="File explorer">
      <div className="Card-header">
        <div>
          <div className="Card-title">Explorer</div>
          <div className="Card-subtitle">Browse folders and files</div>
        </div>
      </div>

      <div className="Card-body">
        {!tree ? (
          <div className="HelpText">No tree available.</div>
        ) : (
          <div className="Explorer">
            <FileExplorer
              root={tree}
              expandedPaths={expandedPaths}
              selectedPath={selectedPath}
              onTogglePath={onTogglePath}
              onSelectPath={onSelectPath}
            />
          </div>
        )}
      </div>
    </section>
  );
}
