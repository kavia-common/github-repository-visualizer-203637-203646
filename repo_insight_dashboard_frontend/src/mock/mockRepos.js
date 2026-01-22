/**
 * Mock repository dataset used by the UI (no backend).
 * We keep both a tree structure and a flat map for quick path lookups.
 */

/**
 * @typedef {Object} TreeNode
 * @property {"dir"|"file"} type
 * @property {string} name
 * @property {string} path
 * @property {TreeNode[]} [children]
 */

/**
 * @typedef {Object} RepoMock
 * @property {string} key - "owner/repo"
 * @property {Object} overview
 * @property {Object.<string, number>} languages
 * @property {TreeNode} tree
 * @property {Object.<string, {path: string, content: string, language: string, size: number}>} filesByPath
 * @property {Object} insights
 */

function file(path, content, language) {
  return { type: "file", name: path.split("/").pop(), path, content, language };
}

function dir(path, children) {
  return { type: "dir", name: path === "/" ? "/" : path.split("/").pop(), path, children };
}

function buildFilesByPath(tree) {
  /** Build a flat map of files for O(1) lookup when selecting in the explorer. */
  const map = {};
  function walk(node) {
    if (node.type === "file") {
      map[node.path] = {
        path: node.path,
        content: node.content,
        language: node.language,
        size: node.content.length,
      };
      return;
    }
    (node.children || []).forEach(walk);
  }
  walk(tree);
  return map;
}

const tree = dir("/", [
  file("/README.md", `# Repo Insight Demo

This is a *mock* repository used to demonstrate:

- Repository overview
- Language usage
- Interactive file explorer
- File viewer with light syntax highlighting
- Insights panel

Try selecting files in the explorer.
`, "markdown"),

  dir("/src", [
    file(
      "/src/index.js",
      `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
`,
      "javascript"
    ),
    file(
      "/src/App.js",
      `export default function App() {
  return "Hello Repo Insight";
}
`,
      "javascript"
    ),
    dir("/src/components", [
      file(
        "/src/components/FileExplorer.js",
        `// Explorer component (mock)
export function FileExplorer() {
  return null;
}
`,
        "javascript"
      ),
    ]),
  ]),

  dir("/docs", [
    file(
      "/docs/architecture.md",
      `# Architecture Notes

This is a frontend-only app that loads mock JSON data.

## Goals

- Fast interaction
- Clear state transitions
- Accessible UI
`,
      "markdown"
    ),
  ]),

  dir("/.github", [
    file(
      "/.github/workflows/ci.yml",
      `name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "mock"
`,
      "yaml"
    ),
  ]),

  file(
    "/package.json",
    `{
  "name": "repo-insight-demo",
  "private": true,
  "dependencies": {
    "react": "^18.2.0"
  }
}
`,
    "json"
  ),
]);

/** @type {RepoMock} */
const demoRepo = {
  key: "kavia-ai/repo-insight-demo",
  overview: {
    name: "repo-insight-demo",
    owner: "kavia-ai",
    description:
      "Frontend-only dashboard demo using mock GitHub repository data (no backend).",
    stars: 128,
    forks: 24,
    openIssues: 7,
    defaultBranch: "main",
    lastUpdated: "2026-01-20",
  },
  languages: {
    JavaScript: 58.4,
    CSS: 14.2,
    Markdown: 17.1,
    YAML: 5.3,
    JSON: 5.0,
  },
  tree,
  filesByPath: buildFilesByPath(tree),
  insights: {
    summary:
      "This mock repo is structured to exercise explorer + viewer interactions and showcase a few insights.",
    highlights: [
      "Balanced language mix, with documentation present.",
      "A small /docs folder suggests intentional internal documentation.",
      "CI workflow exists under .github/workflows.",
    ],
    hotspots: [
      { path: "/src/App.js", reason: "Entry point for UI behavior." },
      { path: "/src/components/FileExplorer.js", reason: "Tree rendering logic lives here (in a real repo)." },
    ],
  },
};

export const MOCK_REPOS = {
  [demoRepo.key]: demoRepo,
};

// PUBLIC_INTERFACE
export function getMockRepoByKey(key) {
  /** Get a mock repo by "owner/repo" key. Returns null if missing. */
  if (!key) return null;
  return MOCK_REPOS[key] || null;
}
