import React, { useEffect, useMemo, useReducer } from "react";
import "./App.css";
import { MOCK_REPOS, getMockRepoByKey } from "./mock/mockRepos";
import { normalizeRepoInputToKey } from "./utils/repoParsing";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import MainPanel from "./components/MainPanel";

const RECENT_REPOS_STORAGE_KEY = "repo_insight_recent_repos_v1";

function loadRecentRepos() {
  try {
    const raw = window.localStorage.getItem(RECENT_REPOS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.slice(0, 8) : [];
  } catch {
    return [];
  }
}

function persistRecentRepos(recentRepos) {
  try {
    window.localStorage.setItem(
      RECENT_REPOS_STORAGE_KEY,
      JSON.stringify(recentRepos.slice(0, 8))
    );
  } catch {
    // If storage is unavailable (private mode, quota, etc.), we just skip persistence.
  }
}

const initialState = {
  theme: "light",
  repoInput: "",
  activeRepoKey: Object.keys(MOCK_REPOS)[0] || "",
  recentRepos: [],
  expandedPaths: new Set(["/"]),
  selectedPath: "",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.theme };
    case "SET_REPO_INPUT":
      return { ...state, repoInput: action.value, error: "" };
    case "LOAD_RECENTS":
      return { ...state, recentRepos: action.recentRepos || [] };
    case "SET_ERROR":
      return { ...state, error: action.error || "" };
    case "SELECT_REPO": {
      const nextKey = action.repoKey;
      const nextRecent = [
        nextKey,
        ...state.recentRepos.filter((k) => k !== nextKey),
      ].slice(0, 8);

      return {
        ...state,
        activeRepoKey: nextKey,
        repoInput: nextKey,
        recentRepos: nextRecent,
        expandedPaths: new Set(["/"]),
        selectedPath: "",
        error: "",
      };
    }
    case "TOGGLE_PATH": {
      const next = new Set(state.expandedPaths);
      if (next.has(action.path)) next.delete(action.path);
      else next.add(action.path);
      return { ...state, expandedPaths: next };
    }
    case "SELECT_PATH":
      return { ...state, selectedPath: action.path, error: "" };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
function App() {
  /** Root application component for the Repo Insight Dashboard (frontend-only, mock data). */
  const [state, dispatch] = useReducer(reducer, initialState);

  const activeRepo = useMemo(
    () => getMockRepoByKey(state.activeRepoKey),
    [state.activeRepoKey]
  );

  // Load recents on boot.
  useEffect(() => {
    const recents = loadRecentRepos();
    dispatch({ type: "LOAD_RECENTS", recentRepos: recents });

    // If the most recent exists in our mock dataset, select it.
    if (recents.length > 0 && getMockRepoByKey(recents[0])) {
      dispatch({ type: "SELECT_REPO", repoKey: recents[0] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply theme to root element.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  // Persist recents whenever they change.
  useEffect(() => {
    persistRecentRepos(state.recentRepos);
  }, [state.recentRepos]);

  const repoTree = activeRepo?.tree || null;

  const selectedFile = useMemo(() => {
    if (!activeRepo || !state.selectedPath) return null;
    return activeRepo.filesByPath[state.selectedPath] || null;
  }, [activeRepo, state.selectedPath]);

  function onSubmitRepoInput() {
    const key = normalizeRepoInputToKey(state.repoInput);
    if (!key) {
      dispatch({
        type: "SET_ERROR",
        error: "Enter a repository like “owner/repo” or a GitHub URL.",
      });
      return;
    }

    if (!getMockRepoByKey(key)) {
      dispatch({
        type: "SET_ERROR",
        error:
          "Repository not found in mock dataset. Try “kavia-ai/repo-insight-demo”.",
      });
      return;
    }

    dispatch({ type: "SELECT_REPO", repoKey: key });
  }

  return (
    <div className="App">
      <TopBar
        theme={state.theme}
        onToggleTheme={() =>
          dispatch({
            type: "SET_THEME",
            theme: state.theme === "light" ? "dark" : "light",
          })
        }
      />

      <div className="App-shell">
        <Sidebar
          repoInput={state.repoInput}
          onRepoInputChange={(v) =>
            dispatch({ type: "SET_REPO_INPUT", value: v })
          }
          onRepoInputSubmit={onSubmitRepoInput}
          recentRepos={state.recentRepos}
          onPickRecent={(key) => dispatch({ type: "SELECT_REPO", repoKey: key })}
          activeRepoKey={state.activeRepoKey}
          repo={activeRepo}
          tree={repoTree}
          expandedPaths={state.expandedPaths}
          selectedPath={state.selectedPath}
          onTogglePath={(path) => dispatch({ type: "TOGGLE_PATH", path })}
          onSelectPath={(path) => dispatch({ type: "SELECT_PATH", path })}
          error={state.error}
        />

        <MainPanel
          repo={activeRepo}
          selectedPath={state.selectedPath}
          selectedFile={selectedFile}
          onSelectPath={(path) => dispatch({ type: "SELECT_PATH", path })}
        />
      </div>
    </div>
  );
}

export default App;
