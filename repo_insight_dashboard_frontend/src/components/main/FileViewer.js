import React, { useMemo } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { highlightCode } from "../../utils/syntaxHighlight";

function languageLabel(language) {
  const l = String(language || "").toLowerCase();
  if (l === "javascript") return "JavaScript";
  if (l === "json") return "JSON";
  if (l === "markdown") return "Markdown";
  if (l === "yaml") return "YAML";
  return language || "Text";
}

// PUBLIC_INTERFACE
export default function FileViewer({ repo, selectedPath, selectedFile, onSelectPath }) {
  /** Main file viewer including breadcrumb navigation and syntax-highlighted code. */
  const highlighted = useMemo(() => {
    if (!selectedFile?.content) return "";
    return highlightCode(selectedFile.content, selectedFile.language);
  }, [selectedFile]);

  return (
    <section className="Card" aria-label="File viewer">
      <div className="Card-header">
        <div>
          <div className="Card-title">File</div>
          <div className="Card-subtitle">
            {repo ? `${repo.key}` : "No repository selected"}
          </div>
        </div>
      </div>

      <div className="Card-body Stack">
        <Breadcrumbs selectedPath={selectedPath} onSelectPath={onSelectPath} />

        {!selectedFile ? (
          <div className="EmptyState">
            <strong>No file selected</strong>
            <div className="HelpText">
              Use the Explorer to open a file. The viewer will render it here with light syntax
              highlighting.
            </div>
          </div>
        ) : (
          <div className="CodeFrame" aria-label="Code viewer">
            <div className="CodeHeader">
              <div className="CodeHeader-title">{selectedFile.path}</div>
              <div className="CodeHeader-meta">
                {languageLabel(selectedFile.language)} • {selectedFile.size.toLocaleString()} chars
              </div>
            </div>
            <pre
              className="CodeBlock"
              // highlightCode escapes HTML first, then adds span wrappers.
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
