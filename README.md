# Media Watch

Keyword news sweep with AI summaries and in-app alerts. One HTML file, no build step,
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
6. **FEED** → **Sweep now**

First sweep takes one to three minutes. It reads nine outlet feeds, then queries
GDELT and Google News for each keyword, then summarises in batches of eight.

---

## Updating it later

Edit `index.html` on github.com from your phone, commit, and reopen the app.
No rebuild, no resubmission, no review.

---

## Reading the feed

Each item carries a two-character grade — source reliability A–F, then information
credibility 1–6. **These are the model's guess, not an assessment.** Treat them as a
sorting aid and verify before use.

`FLASH` and `PRIORITY` items, and anything matching an ALERT keyword, raise the strip
at the top of every tab until you mark them read.

---

## When something breaks

| Symptom | Cause | Fix |
|---|---|---|
| Every feed reads "unreachable" | The fetch relay is down | SETUP → Fetch relay → try `https://corsproxy.io/?` |
| One feed reads "unreachable" | That address changed | Switch it off or replace it |
| "All engines unavailable" | No key, or both rate limited | Check SETUP → Keys |
| Headlines appear with no summary | Engines failed mid-sweep | Sweep again; headlines are kept either way |
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
- **No background refresh.** iOS does not permit it for home-screen apps. Sweeps run
  when you open it. That matches the in-app-only alerts by design.
- **Do not use Private Browsing** — it discards stored data on close.
