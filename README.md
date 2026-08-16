# Sentinel AI

Keyword news scan with AI summaries and in-app alerts. One HTML file, no build step,
no installation on any computer. Everything below is done from the iPhone.

---

## Part 1 — Get a key (3 minutes)

1. Safari → **console.groq.com** → sign in with Google
2. **API Keys** → **Create API Key** → copy the `gsk_…` string
3. Keep it somewhere for a moment. You paste it in at Part 3.

Optional but recommended — a second key so a rate limit doesn't stop you:
Safari → **aistudio.google.com** → **Get API key** → copy the `AIza…` string.

---

## Part 2 — Publish it (10 minutes, Safari only)

1. **github.com** → sign up (free)
2. **+** (top right) → **New repository**
   - Name: `mediawatch`
   - **Public** (required — Pages does not work on free private repos)
   - Tick **Add a README file**
   - **Create repository**
3. For each of the seven files in this folder:
   - **Add file** → **Upload files**
   - Attach the file → **Commit changes**
   - Upload all seven: `index.html`, `manifest.json`, `sw.js`, and the four `icon-*.png`
4. **Settings** → **Pages** (left menu)
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)** → **Save**
5. Wait about two minutes. The page shows your address:
   `https://YOURNAME.github.io/mediawatch/`

---

## Part 3 — Install it

1. Open that address in **Safari** (not Chrome — only Safari can install to the home screen)
2. Share button → scroll down → **Add to Home Screen** → **Add**
3. Open it from the new icon
4. **SETUP** → paste your Groq key. Paste the Gemini key too if you made one.
5. **WATCH** → replace the six placeholder keywords with what you actually track.
   Tap **ALERT** on the ones that should raise the top strip.
6. **FEED** → **Scan now**

First scan takes roughly 20–40 seconds. Sources are fetched in parallel and anything
that does not answer within 8 seconds is skipped, so a dead feed costs seconds rather
than stalling the whole scan.
GDELT and Google News for each keyword, then summarises in batches of eight.

---

## Updating it later

Edit `index.html` on github.com from your phone, commit, and reopen the app.
No rebuild, no resubmission, no review.

---

## Reading the feed

FEED has two layouts. **Cards** is the default — full summaries, one item per screen,
with a coloured left edge on anything flagged (solid amber for FLASH, muted amber for
PRIORITY) and source/category/priority shown as small tags rather than a line of text.
A **Newest / Urgency** control sorts Cards either by time or by priority first; switch
to **Timeline** for a chronological ticker across every category at once, grouped by
day with a time-of-day stamp on each line — Timeline always stays strictly
chronological, so the sort control is hidden there. Both layouts respect the category
chips the same way.

Each item carries a two-character grade — source reliability A–F, then information
credibility 1–6. **These are the model's guess, not an assessment.** Treat them as a
sorting aid and verify before use.

Items marked **headline only** came from GDELT or Google News, which hand back a
headline with no article body — the summary is one grounded sentence, not padding.
Tap **Expand from source** to fetch the actual article and get a proper summary from
real text. This is best-effort: page extraction is a blunt strip of the HTML, so a
badly structured page can pull in menu text alongside the story, and some sites block
it outright. If it fails, the original headline summary is kept, nothing is lost.

`FLASH` and `PRIORITY` items, and anything matching an ALERT keyword, raise the strip
at the top of every tab until you mark them read.

---

## When something breaks

| Symptom | Cause | Fix |
|---|---|---|
| Every feed reads "unreachable" | All three relays are down | SETUP → **Test relays**. Add a working one in the field below. |
| Some feeds read "timed out" | Slow source | Normal. It is skipped and the scan carries on. |
| One feed reads "unreachable" | That address changed | Switch it off or replace it |
| "All engines unavailable" | No key, or both rate limited | Check SETUP → Keys |
| Headlines appear with no summary | Engines failed mid-scan | Scan again; headlines are kept either way |
| Nothing new found | Keywords too narrow | Widen a term in WATCH |

---

## Worth knowing

- **Data stays on the device.** Keywords, keys and articles live in this browser only.
  Nothing is sent anywhere except to the news sources and the engine you chose.
  Installing on a second device gives you a second, separate watchlist.
- **Your keyword list is the sensitive part**, not the app. Groq is the default primary
  because it does not train on what you send it. Google's free tier may.
- **The repository is public.** Anyone with the address can open the app — they get an
  empty one with no keys, but they can read the file. Do not commit a keyword you would
  not want read, and never type a key into the file itself.
- **No background refresh.** iOS does not permit it for home-screen apps. Scans run
  when you open it. That matches the in-app-only alerts by design.
- **Do not use Private Browsing** — it discards stored data on close.
