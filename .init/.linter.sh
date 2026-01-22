#!/bin/bash
cd /home/kavia/workspace/code-generation/github-repository-visualizer-203637-203646/repo_insight_dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

