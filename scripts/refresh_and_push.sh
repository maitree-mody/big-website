#!/bin/zsh
# Runs from launchd (Mon + Thu): refresh newsletter.js from Substack and push if it changed.
# Substack blocks GitHub Actions IPs, so this runs locally instead.
export PATH=/opt/anaconda3/bin:/opt/homebrew/bin:/usr/bin:/bin
cd "$(dirname "$0")/.." || exit 1
echo "--- $(date)"
git pull -q --rebase || exit 1
python3 scripts/update_newsletter.py || exit 1
if ! git diff --quiet newsletter.js; then
  git commit -q -m "Refresh newsletter cards" newsletter.js && git push -q && echo "pushed"
else
  echo "no changes"
fi
