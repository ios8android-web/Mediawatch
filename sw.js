/* Sentinel service worker.
   Caches the app shell so it opens instantly and works with no signal.
   Never caches news or engine requests — those must always be live. */

var CACHE = "sentinel-v12";
var SHELL = ["./", "./index.html", "./manifest.json",
             "./icon-180.png", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", function (e) {
  /* cache:"reload" bypasses the browser HTTP cache. GitHub Pages sends a
     10-minute max-age, so a plain fetch here would re-cache the OLD build. */
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(SHELL.map(function (u) {
      return fetch(new Request(u, { cache: "reload" }))
        .then(function (res) { if (res.ok) return c.put(u, res); })
        .catch(function () {});
    }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);
  var sameOrigin = url.origin === self.location.origin;
  var isFont = url.hostname.indexOf("fonts.g") > -1;

  /* news sources, relays and LLM engines always go to the network */
  if (!sameOrigin && !isFont) return;

  if (isFont) {
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      });
    }));
    return;
  }

  /* App shell: genuinely network first. Without cache:"reload" the browser
     serves its own 10-minute cached copy and a published update stays
     invisible — which is exactly the stale-app problem this fixes. */
  e.respondWith(
    fetch(new Request(req.url, { cache: "reload", credentials: "same-origin" }))
      .then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      })
      .catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || caches.match("./index.html");
        });
      })
  );
});
