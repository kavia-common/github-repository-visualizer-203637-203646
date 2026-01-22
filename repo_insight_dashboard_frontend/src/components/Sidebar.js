import React from "react";
import RepoInputCard from "./sidebar/RepoInputCard";
import RepoOverviewCard from "./sidebar/RepoOverviewCard";
import LanguageUsageCard from "./sidebar/LanguageUsageCard";
import ExplorerCard from "./sidebar/ExplorerCard";

// PUBLIC_INTERFACE
export default function Sidebar(props) {
  /** Left sidebar container for repository controls and explorer. */
  return (
    <aside className="Sidebar" aria-label="Repository sidebar">
      <RepoInputCard
        repoInput={props.repoInput}
        onRepoInputChange={props.onRepoInputChange}
        onRepoInputSubmit={props.onRepoInputSubmit}
        recentRepos={props.recentRepos}
        onPickRecent={props.onPickRecent}
        activeRepoKey={props.activeRepoKey}
        error={props.error}
      />

      <RepoOverviewCard repo={props.repo} />

      <LanguageUsageCard repo={props.repo} />

      <ExplorerCard
        tree={props.tree}
        expandedPaths={props.expandedPaths}
        selectedPath={props.selectedPath}
        onTogglePath={props.onTogglePath}
        onSelectPath={props.onSelectPath}
      />
    </aside>
  );
}
