#!/bin/bash
# Double-click this after changing photos_web/ (or editing the site).
# It updates the photos, then uploads the site to GitHub.

cd "$(dirname "$0")" || exit 1

pause() { echo; read -r -p "Press Enter to close this window." _; }

echo "Updating photos…"
echo
if ! python3 -c "import PIL" 2>/dev/null; then
  echo "Installing Pillow (one-time)…"
  python3 -m pip install --user pillow >/dev/null 2>&1 \
    || python3 -m pip install --user --break-system-packages pillow >/dev/null 2>&1
fi

if ! python3 update_site.py; then
  echo
  echo "The photo update failed. Nothing was uploaded."
  pause; exit 1
fi

echo
if [ -z "$(git status --porcelain)" ]; then
  echo "Nothing changed, so there's nothing to upload."
  pause; exit 0
fi

git add -A
git commit -q -m "Update site $(date '+%Y-%m-%d %H:%M')"

echo "Uploading to GitHub…"
if git push -u origin main; then
  echo
  echo "Done. The live site updates within a minute or two:"
  echo "https://sch312413.github.io/photography/"
else
  echo
  echo "Upload failed. Your changes are saved locally and will go up next time."
  echo "If GitHub asked you to sign in, sign in and double-click this again."
fi
pause
