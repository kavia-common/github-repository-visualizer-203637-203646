import React, { memo, useMemo } from "react";

function getIcon(node, expanded) {
  if (node.type === "dir") return expanded ? "▾" : "▸";
  return "•";
}

function countChildren(node) {
  if (node.type !== "dir") return 0;
  return (node.children || []).length;
}

const TreeNode = memo(function TreeNode({
  node,
  depth,
  expandedPaths,
  selectedPath,
  onTogglePath,
  onSelectPath,
}) {
  const isDir = node.type === "dir";
  const isExpanded = isDir ? expandedPaths.has(node.path) : false;
  const isSelected = node.type === "file" && selectedPath === node.path;

  const children = isDir ? node.children || [] : [];

  const sortedChildren = useMemo(() => {
    if (!isDir) return [];
    const dirs = children.filter((c) => c.type === "dir").sort((a, b) => a.name.localeCompare(b.name));
    const files = children.filter((c) => c.type === "file").sort((a, b) => a.name.localeCompare(b.name));
    return [...dirs, ...files];
  }, [children, isDir]);

  return (
    <div>
      <div
        className="TreeItem"
        data-selected={isSelected ? "true" : "false"}
        onClick={() => {
          if (isDir) onTogglePath(node.path);
          else onSelectPath(node.path);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (isDir) onTogglePath(node.path);
            else onSelectPath(node.path);
          }
        }}
        aria-label={node.type === "dir" ? `Folder ${node.name}` : `File ${node.name}`}
      >
        {Array.from({ length: depth }).map((_, i) => (
          <span key={i} className="TreeIndent" aria-hidden="true" />
        ))}
        <span aria-hidden="true">{getIcon(node, isExpanded)}</span>
        <span className="TreeName">{node.name}</span>
        <span className="TreeMeta">{isDir ? `${countChildren(node)} items` : ""}</span>
      </div>

      {isDir && isExpanded
        ? sortedChildren.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              depth={depth + 1}
              expandedPaths={expandedPaths}
              selectedPath={selectedPath}
              onTogglePath={onTogglePath}
              onSelectPath={onSelectPath}
            />
          ))
        : null}
    </div>
  );
});

// PUBLIC_INTERFACE
export default function FileExplorer({
  root,
  expandedPaths,
  selectedPath,
  onTogglePath,
  onSelectPath,
}) {
  /** Render a collapsible repository tree starting at root. */
  return (
    <div>
      <TreeNode
        node={root}
        depth={0}
        expandedPaths={expandedPaths}
        selectedPath={selectedPath}
        onTogglePath={onTogglePath}
        onSelectPath={onSelectPath}
      />
    </div>
  );
}
