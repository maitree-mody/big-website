#!/usr/bin/env python3
"""Refresh newsletter.js with the latest Substack posts and the events they announce.

Substack doesn't allow browsers to fetch posts directly, so the site reads a
small generated file instead. Run this (or let the GitHub Action run it):

    python3 scripts/update_newsletter.py

Events are read from the newsletter's usual format: a heading, then a line like
"📅 Date: Friday, October 30 🕒 Time: 10:00 AM – 12:00 PM 📍 Location: One Bryant Park".
Events listed by hand in data.js take priority over ones found here.
"""
import datetime as dt
import html
import json
import re
import urllib.request
from pathlib import Path

PUB = "https://barnardinvestmentgroup.substack.com"
COUNT = 3          # issues shown as cards on the Newsletter page
EVENT_SCAN = 6     # recent issues scanned for event announcements
OUT = Path(__file__).resolve().parent.parent / "newsletter.js"

# Headings that appear in every issue and say nothing about it
SKIP = re.compile(r"general body ?!|where to find us|join us on quad|important policy|events?$|^$", re.I)
MONTHS = {m: i for i, m in enumerate(["january", "february", "march", "april", "may", "june", "july",
                                       "august", "september", "october", "november", "december"], 1)}


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (BIG website)"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.load(r)


def clean(text):
    text = html.unescape(re.sub(r"<[^>]+>", "", text or ""))
    text = re.sub(r"[☀-➿\U0001F000-\U0001FAFF️‍]", "", text)
    text = re.sub(r"\[[^\]]*\]", "", text)
    return re.sub(r"\s+", " ", text).strip(" -–—!")


def event_type(title):
    t = title.lower()
    if "site visit" in t:
        return "site-visit"
    if re.search(r"general body|gbm|social|dinner|mixer", t):
        return "community"
    if re.search(r"workshop|info(rmation)? session|webinar|office hours|resume|technical", t):
        return "workshop"
    return "speaker"


CAMPUS = re.compile(r"milstein|diana|barnard hall|altschul|milbank|sulzberger|lefrak", re.I)


def is_big_event(title, location):
    """Keep BIG's own events; the newsletter also advertises other organizations' opportunities."""
    return bool(re.search(r"\bBIG\b|site visit|general body|\bGBM\b", title, re.I) or CAMPUS.search(location))


def parse_events(body_html, posted, url):
    """Find 'heading + 📅 Date/🕒 Time/📍 Location' blocks in one issue."""
    events = []
    parts = re.split(r"<h[1-4][^>]*>(.*?)</h[1-4]>", body_html or "", flags=re.S)
    for title_html, block in zip(parts[1::2], parts[2::2]):
        text = html.unescape(re.sub(r"<[^>]+>", " ", block))
        m = re.search(r"Date\s*:\s*(?:[A-Za-z]+,\s*)?([A-Za-z]+)\s+(\d{1,2})(?:,\s*(\d{4}))?", text)
        if not m or m.group(1).lower() not in MONTHS:
            continue
        month, day = MONTHS[m.group(1).lower()], int(m.group(2))
        year = int(m.group(3)) if m.group(3) else posted.year + (1 if month < posted.month - 6 else 0)
        title = clean(title_html)
        if not title:
            continue

        def field(name):
            f = re.search(name + r"\s*:\s*(.+?)(?=[\U0001F000-\U0001FAFF☀-➿]|\s{2,}|$)", text)
            if not f:
                return ""
            value = re.split(r"(?<=[a-z0-9)])(?=[A-Z][a-z])", f.group(1).strip())[0]  # "LL001Join us..." -> "LL001"
            return clean(value)

        location = field("Location")
        location = re.split(r"\s\(|\s(?:This|Join|We|Our|Please)\b", location)[0].strip(" .")
        if not is_big_event(title, location):
            continue
        flat = clean(text)
        after = flat.split(location, 1)[1] if location and location in flat else ""
        after = re.sub(r"^[^A-Za-z]*(?:\(.*?\))?\s*(?:Registration\s*:\s*\S+(?: Here)?!?)?\s*", "", after)
        for _ in range(2):  # drop leftover "(Address) Registration: Click here!" fragments
            after = re.sub(r"^[^.!?(]{0,90}?\)\s*", "", after)
            after = re.sub(r"^Registration\s*:\s*(?:Click|Register)\s+Here!?\s*", "", after, flags=re.I)
        desc = re.split(r"(?<=[.!?])\s", after)[0] if after[:1].isupper() else ""
        events.append({
            "date": f"{year:04d}-{month:02d}-{day:02d}",
            "time": field("Time").replace(" - ", " – "),
            "type": event_type(title),
            "title": title,
            "location": location,
            "description": re.sub(r"\s*Registration\s*:.*$", "", desc)[:220],
            "link": url,
            "source": "newsletter",
        })
    return events


def main():
    archive = get(f"{PUB}/api/v1/archive?sort=new&limit={max(COUNT, EVENT_SCAN)}")
    posts, events = [], {}
    for i, p in enumerate(archive):
        full = get(f"{PUB}/api/v1/posts/{p['slug']}")
        body = full.get("body_html") or ""
        posted = dt.date.fromisoformat(p["post_date"][:10])
        for e in parse_events(body, posted, p["canonical_url"]):
            events.setdefault((e["date"], re.sub(r"[^a-z]", "", e["title"].lower())), e)  # newest issue wins
        if i >= COUNT:
            continue
        headings = [clean(h) for h in re.findall(r"<h[1-3][^>]*>(.*?)</h[1-3]>", body, re.S)]
        highlights = []
        for h in headings:
            if not SKIP.search(h) and h not in highlights:
                highlights.append(h)
        title = re.sub(r"^\d+/\d+\s*", "", clean(p["title"])).replace("Barnard Investment Group - ", "").replace("Barnard Investment Group: ", "")
        posts.append({
            "date": p["post_date"][:10],
            "title": title or "Weekly Newsletter",
            "subtitle": clean(p.get("subtitle")),
            "url": p["canonical_url"],
            "highlights": highlights[:4],
        })
    found = sorted(events.values(), key=lambda e: e["date"])
    OUT.write_text("// Generated by scripts/update_newsletter.py; do not edit by hand\n"
                   "window.BIG_NEWSLETTER = " + json.dumps(posts, indent=2, ensure_ascii=False) + ";\n"
                   "window.BIG_NEWSLETTER_EVENTS = " + json.dumps(found, indent=2, ensure_ascii=False) + ";\n")
    print(f"Wrote {len(posts)} posts and {len(found)} events to {OUT.name}")


if __name__ == "__main__":
    main()
