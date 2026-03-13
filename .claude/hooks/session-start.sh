#!/bin/bash
set -euo pipefail

# Only run in remote (web) sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Install tracker dependencies
npm install

# Install public-site dependencies
if [ -d "public-site" ]; then
  cd public-site
  npm install
  cd ..
fi
