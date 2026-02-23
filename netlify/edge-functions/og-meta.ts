/**
 * Netlify Edge Function — og-meta
 *
 * Intercepts GET requests to /events/:id and injects event-specific
 * Open Graph + Twitter meta tags into the HTML response so that
 * WhatsApp / Facebook / Twitter crawlers (which don't execute JS)
 * get the correct social preview.
 *
 * Runs on Deno (Netlify Edge Runtime) — no Node.js APIs available.
 */

import type { Context } from "@netlify/edge-functions";

// ── Constants ─────────────────────────────────────────────────────────────────
const API_BASE  = "https://technova.indiesoft.cloud";
const SITE_URL  = "https://technova26.netlify.app";
const SITE_NAME = "TechNova'26";

const DEFAULT_IMAGE = `${SITE_URL}/hero1.png`;
const DEFAULT_TITLE = "TechNova'26 — Annual Technical fest";
const DEFAULT_DESC  =
  "TechNova 2026 — The premier annual Technical fest. Explore events, register your team, and celebrate innovation.";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ApiEvent {
  id?          : number | string;
  _id?         : number | string;
  title?       : string;
  description? : string;
  imagePath?   : string;
  department?  : string;
  date?        : string;
  venue?       : string;
  rules?       : string;
  minTeamSize? : number;
  maxTeamSize? : number;
  /** API occasionally sends this typo */
  maxTeaSize?  : number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Resolve image URL — supports full URLs and API-relative paths */
function resolveImageUrl(imagePath: string | undefined): string {
  if (!imagePath) return DEFAULT_IMAGE;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${API_BASE}/${imagePath.replace(/^\//, "")}`;
}

/** Truncate text to max characters */
function truncate(text: string | undefined, max = 200): string {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

/** Format an ISO date string to human-readable form (Deno-safe, no locale) */
function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const day   = d.getUTCDate();
    const month = months[d.getUTCMonth()];
    const year  = d.getUTCFullYear();
    const hh    = String(d.getUTCHours()).padStart(2, "0");
    const mm    = String(d.getUTCMinutes()).padStart(2, "0");
    return `${day} ${month} ${year}, ${hh}:${mm} UTC`;
  } catch {
    return "";
  }
}

/**
 * Build a rich OG description from all available event fields.
 * Social crawlers show only the first ~300 chars, so put the most
 * important info first.
 */
function buildDescription(event: ApiEvent): string {
  const parts: string[] = [];

  // 1. Event description (primary text, up to 160 chars)
  if (event.description) {
    parts.push(truncate(event.description, 160));
  }

  // 2. Key details line  e.g.  "🏛 CSE  |  📅 12 Mar 2026, 10:00 UTC  |  📍 Main Auditorium"
  const details: string[] = [];
  if (event.department) details.push(`🏛 ${event.department}`);
  const dateStr = formatDate(event.date);
  if (dateStr)          details.push(`📅 ${dateStr}`);
  if (event.venue)      details.push(`📍 ${event.venue}`);

  const maxTeam = event.maxTeamSize ?? event.maxTeaSize;
  if (event.minTeamSize != null && maxTeam != null) {
    if (event.minTeamSize === maxTeam) {
      details.push(`👥 Team of ${event.minTeamSize}`);
    } else {
      details.push(`👥 ${event.minTeamSize}–${maxTeam} members`);
    }
  }

  if (details.length) parts.push(details.join("  |  "));

  const result = parts.join("\n");
  return result || DEFAULT_DESC;
}

/** Escape HTML special characters for safe injection into attributes */
function esc(str: string): string {
  return str
    .replace(/&/g,  "&amp;")
    .replace(/"/g,  "&quot;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;");
}

/** Build the full block of <meta> tags to inject */
function buildMetaTags(event: ApiEvent, pageUrl: string): string {
  const hasEvent   = Boolean(event.title);
  const title      = hasEvent ? `${event.title} — ${SITE_NAME}` : DEFAULT_TITLE;
  const description = hasEvent ? buildDescription(event) : DEFAULT_DESC;
  const image      = resolveImageUrl(event.imagePath);
  const imageAlt   = hasEvent ? `${event.title} — event poster` : SITE_NAME;

  // Event images are A4 portrait posters; fall back to landscape OG dimensions
  // when using the default hero image.
  const isPortrait = Boolean(event.imagePath);
  const imgWidth   = isPortrait ? "794"  : "1200";
  const imgHeight  = isPortrait ? "1123" : "630";

  return `
  <!-- Dynamic OG injected by Netlify Edge Function -->
  <meta property="og:type"         content="website" />
  <meta property="og:site_name"    content="${esc(SITE_NAME)}" />
  <meta property="og:title"        content="${esc(title)}" />
  <meta property="og:description"  content="${esc(description)}" />
  <meta property="og:image"        content="${esc(image)}" />
  <meta property="og:image:width"  content="${imgWidth}" />
  <meta property="og:image:height" content="${imgHeight}" />
  <meta property="og:image:alt"    content="${esc(imageAlt)}" />
  <meta property="og:url"          content="${esc(pageUrl)}" />
  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image"       content="${esc(image)}" />
  <meta name="twitter:image:alt"   content="${esc(imageAlt)}" />`;
}

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req: Request, context: Context) {
  const url = new URL(req.url);

  // Extract event id from /events/:id  (and optional sub-paths like /register)
  const match   = url.pathname.match(/^\/events\/([^/]+)/);
  const eventId = match?.[1];

  if (!eventId) {
    // No id — let Netlify serve the normal SPA fallback
    return context.next();
  }

  // ── 1. Fetch the original HTML from Netlify (the built index.html) ─────────
  const htmlResponse = await context.next();

  // Only rewrite successful HTML responses
  const contentType = htmlResponse.headers.get("content-type") ?? "";
  if (!htmlResponse.ok || !contentType.includes("text/html")) {
    return htmlResponse;
  }

  let html = await htmlResponse.text();

  // ── 2. Fetch event data from the API ────────────────────────────────────────
  let event: ApiEvent = {};
  try {
    const apiRes = await fetch(`${API_BASE}/api/events/${eventId}`, {
      headers: { Accept: "application/json" },
      // 3-second timeout so a slow API doesn't delay crawlers
      signal: AbortSignal.timeout(3000),
    });
    if (apiRes.ok) {
      event = (await apiRes.json()) as ApiEvent;
    }
  } catch {
    // API unreachable — fall back to the default OG tags already in index.html
  }

  // ── 3. Remove any existing OG / Twitter tags baked into index.html ──────────
  // Prevents duplicate meta tags in the final HTML.
  html = html
    .replace(/<meta\s+property="og:[^"]*"[^>]*\/>/gi, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*\/>/gi, "")
    .replace(/<!--\s*Dynamic OG injected[^>]*-->/gi, "");

  // ── 4. Inject event-specific OG tags just before </head> ────────────────────
  const pageUrl  = `${SITE_URL}${url.pathname}`;
  const metaTags = buildMetaTags(event, pageUrl);
  html = html.replace("</head>", `${metaTags}\n  </head>`);

  return new Response(html, {
    status: 200, // Always 200 — fixes the 206 partial-content issue
    headers: {
      "content-type"  : "text/html;charset=UTF-8",
      "accept-ranges" : "none",   // Prevent byte-range requests → no 206
      "cache-control" : "public, max-age=300, stale-while-revalidate=60",
    },
  });
}
