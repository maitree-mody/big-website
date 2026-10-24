# Barnard Investment Group: website

A static site (plain HTML/CSS/JS, no build step). Hosts free on GitHub Pages.

## Updating content (no coding)

Almost everything lives in **`data.js`**:

| To change… | Edit in `data.js` |
|---|---|
| Events | `events`: add a `{ date: "YYYY-MM-DD", ... }` line. Future dates show as "Upcoming", past ones move to the archive automatically. Every event gets its own page (`event.html?e=...`). |
| Event recap & photos | On that event's line, add `recap: "..."` (the write-up) and `photos: ["assets/events/x-1.jpg", ...]`. Put the images in `assets/events/`. |
| E-Board | `eboard`: name, role, major, experience, LinkedIn. Headshots (square) go in `assets/eboard/`. |
| Page banner photos | the `data-bg="..."` attribute at the top of each page (campus photos live in `assets/campus/`) |
| E-Board application button | Paste the form link into `links.eboardApplication` (leave `""` to hide it). |
| Firm logo grid (home page) | `firms`; logo files go in `assets/logos/` |

Pages: `index.html` (home), `about.html`, `events.html`, `event.html` (one template for every event), `team.html`, `newsletter.html`, `join.html`. The header and footer are shared, in `main.js`.

## Newsletter cards

The "Latest issues" cards come from `newsletter.js`, generated from Substack by:

```
python3 scripts/update_newsletter.py
```

Once on GitHub, `.github/workflows/update-newsletter.yml` runs it daily, so the cards stay current on their own.

## After editing CSS or JS

Each page loads `styles.css?v=...`, `main.js?v=...` etc. Bump that number (any new value) when you change those files, or visitors' browsers may keep showing the old version for up to 10 minutes:

```
V=$(date +%Y%m%d%H%M); sed -i '' -E "s#(styles.css|data.js|newsletter.js|main.js)\?v=[0-9]+#\1?v=$V#g" *.html
```

## Preview locally

```
python3 -m http.server 8765
```
then open http://localhost:8765

## Deploy (GitHub Pages)

Push to a GitHub repo → Settings → Pages → Deploy from branch `main` / root.
To use a custom domain (e.g. barnardinvestmentgroup.com), add it under Settings → Pages and point the domain's DNS at GitHub.
