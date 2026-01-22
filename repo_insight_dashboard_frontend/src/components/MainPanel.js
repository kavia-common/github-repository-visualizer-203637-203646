import React from "react";
import FileViewer from "./main/FileViewer";
import InsightsPanel from "./main/InsightsPanel";

// PUBLIC_INTERFACE
export default function MainPanel({ repo, selectedPath, selectedFile, onSelectPath }) {
  /** Main content area: file viewer + insights. */
  return (
    <main className="MainPanel" aria-label="Repository main panel">
      <FileViewer
        repo={repo}
        selectedPath={selectedPath}
        selectedFile={selectedFile}
        onSelectPath={onSelectPath}
      />
      <InsightsPanel repo={repo} selectedPath={selectedPath} />
    </main>
  );
}
