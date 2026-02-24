`/**
 * Netlify Edge Function — og
 *
 * Intercepts GET requests to / and /events/:id from social-media crawlers
 * and injects Open Graph + Twitter Card meta tags so that WhatsApp, Facebook,
 * Twitter, LinkedIn, and Discord show proper link previews.
 *
 * ⚠️  Only modifies the response for known crawler user-agents.
 *     Regular browsers receive the untouched SPA (no hydration mismatch).
 *
 * Runs on Deno (Netlify Edge Runtime) — no Node.js APIs.
 */

import type { Context } from "@netlify/edge-functions";

// ── Constants ──────────────────────────────────────────────────────────────────
const SITE_URL  = "https://technova26.netlify.app"; // ← update to your real domain
const API_BASE  = "https://technova.indiesoft.cloud";
const SITE_NAME = "TechNova'26";

const DEFAULT_IMAGE = `${SITE_URL}/hero1.png`;
const DEFAULT_TITLE = "TechNova'26 — Annual Technical Fest";
const DEFAULT_DESC  =
  "TechNova 2026 — The premier annual Technical Fest at DCRUST Murthal. Explore events, register your team, and celebrate innovation.";

// ── Social-crawler user-agent substrings (case-insensitive) ───────────────────
const CRAWLER_PATTERNS: RegExp[] = [
  /facebookexternalhit/i,
  /facebot/i,
  /twitterbot/i,
  /linkedinbot/i,
  /whatsapp/i,
  /discordbot/i,
  /slackbot/i,
  /telegrambot/i,
  /applebot/i,
  /googlebot/i,
  /bingbot/i,
  /Nuzzel/i,
  /flipboard/i,
  /pinterest/i,
  /embedly/i,
];

function isCrawler(req: Request): boolean {
  const ua = req.headers.get("user-agent") ?? "";
  return CRAWLER_PATTERNS.some((p) => p.test(ua));
}

// ── Types ──────────────────────────────────────────────────────────────────────
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
  maxTeaSize?  : number; // API typo variant
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Resolve image URL — supports full URLs and API-relative paths */
function resolveImage(imagePath: string | undefined): string {
  if (!imagePath) return DEFAULT_IMAGE;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${API_BASE}/${imagePath.replace(/^\//, "")}`;
}

/** Truncate to max chars, appending ellipsis */
function truncate(text: string, max = 200): string {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

/** Format ISO date string to readable text (Deno-safe, no locale API) */
function fmtDate(dateStr: string | undefined): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  } catch {
    return "";
  }
}

/** Build rich OG description for an event */
function buildDesc(event: ApiEvent): string {
  const parts: string[] = [];
  if (event.description) parts.push(truncate(event.description, 180));

  const details: string[] = [];
  if (event.department) details.push(`🏛 ${event.department}`);
  const d = fmtDate(event.date);
  if (d) details.push(`📅 ${d}`);
  if (event.venue) details.push(`📍 ${event.venue}`);

  const maxTeam = event.maxTeamSize ?? event.maxTeaSize;
  if (event.minTeamSize != null && maxTeam != null) {
    details.push(
      event.minTeamSize === maxTeam
        ? `👥 Team of ${event.minTeamSize}`
        : `👥 ${event.minTeamSize}–${maxTeam} members`
    );
  }
  if (details.length) parts.push(details.join("  |  "));
  return parts.join("\n") || DEFAULT_DESC;
}

/** Escape HTML attribute special characters */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

interface OgData {
  title       : string;
  description : string;
  image       : string;
  imageAlt    : string;
  imageWidth  : string;
  imageHeight : string;
  url         : string;
}

/** Build the <meta> block to inject */
function buildMetaBlock(og: OgData): string {
  return `
  <!-- og.ts: Netlify Edge Function OG injection -->
  <title>${esc(og.title)}</title>
  <meta name="description"           content="${esc(og.description)}" />
  <meta property="og:type"           content="website" />
  <meta property="og:site_name"      content="${esc(SITE_NAME)}" />
  <meta property="og:title"          content="${esc(og.title)}" />
  <meta property="og:description"    content="${esc(og.description)}" />
  <meta property="og:image"          content="${esc(og.image)}" />
  <meta property="og:image:width"    content="${og.imageWidth}" />
  <meta property="og:image:height"   content="${og.imageHeight}" />
  <meta property="og:image:alt"      content="${esc(og.imageAlt)}" />
  <meta property="og:url"            content="${esc(og.url)}" />
  <meta name="twitter:card"          content="summary_large_image" />
  <meta name="twitter:title"         content="${esc(og.title)}" />
  <meta name="twitter:description"   content="${esc(og.description)}" />
  <meta name="twitter:image"         content="${esc(og.image)}" />
  <meta name="twitter:image:alt"     content="${esc(og.imageAlt)}" />`;
}

/** Strip any existing OG / Twitter / title tags from the HTML */
function stripExistingOg(html: string): string {
  return html
    // <meta property="og:*" … />
    .replace(/<meta\s[^>]*property="og:[^"]*"[^>]*\/?>/gi, "")
    // <meta name="twitter:*" … />
    .replace(/<meta\s[^>]*name="twitter:[^"]*"[^>]*\/?>/gi, "")
    // <meta name="description" … />
    .replace(/<meta\s[^>]*name="description"[^>]*\/?>/gi, "")
    // <title>…</title>
    .replace(/<title>[^<]*<\/title>/gi, "")
    // our own injection comment (idempotent re-runs)
    .replace(/<!--\s*og\.ts:[^>]*-->/gi, "");
}

/** Fetch event data from the API (3 s timeout) */
async function fetchEvent(eventId: string): Promise<ApiEvent> {
  try {
    const res = await fetch(`${API_BASE}/api/events/${eventId}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) return (await res.json()) as ApiEvent;
  } catch {
    /* API unreachable — will use default OG */
  }
  return {};
}

/** Rewrite HTML with injected OG meta block */
function rewriteHtml(html: string, og: OgData): string {
  const cleaned = stripExistingOg(html);
  const block   = buildMetaBlock(og);
  // Inject just before </head>
  if (cleaned.includes("</head>")) {
    return cleaned.replace("</head>", `${block}\n  </head>`);
  }
  // Fallback: append to top of <html>
  return cleaned.replace("<html", `${block}\n<html`);
}

// ── Handler ────────────────────────────────────────────────────────────────────
export default async function handler(req: Request, context: Context) {
  // ── Only GET requests need OG injection ──────────────────────────────────────
  if (req.method !== "GET") return context.next();

  const url      = new URL(req.url);
  const pathname = url.pathname;

  // ── Determine which "page type" this is ──────────────────────────────────────
  const isHome   = pathname === "/" || pathname === "";
  const evtMatch = pathname.match(/^\/events\/([^/]+)/);
  const isEvent  = Boolean(evtMatch);

  // We only handle / and /events/*
  if (!isHome && !isEvent) return context.next();

  // ── For normal browser visits, pass through immediately ──────────────────────
  // This is the KEY constraint: social crawlers get rewritten HTML;
  // regular users get the untouched SPA with no performance overhead.
  if (!isCrawler(req)) return context.next();

  // ── Fetch the upstream index.html from Netlify ────────────────────────────────
  const upstream    = await context.next();
  const contentType = upstream.headers.get("content-type") ?? "";
  if (!upstream.ok || !contentType.includes("text/html")) return upstream;

  const html = await upstream.text();

  // ── Build OG data ─────────────────────────────────────────────────────────────
  let og: OgData;

  if (isHome) {
    og = {
      title      : DEFAULT_TITLE,
      description: DEFAULT_DESC,
      image      : DEFAULT_IMAGE,
      imageAlt   : SITE_NAME,
      imageWidth : "1200",
      imageHeight: "630",
      url        : `${SITE_URL}/`,
    };
  } else {
    // Event page
    const eventId = evtMatch![1];
    const event   = await fetchEvent(eventId);
    const hasData = Boolean(event.title);

    const image      = resolveImage(event.imagePath);
    // A4 posters are portrait; hero image is landscape
    const isPortrait = Boolean(event.imagePath);

    og = {
      title      : hasData ? `${event.title} — ${SITE_NAME}` : DEFAULT_TITLE,
      description: hasData ? buildDesc(event) : DEFAULT_DESC,
      image,
      imageAlt   : hasData ? `${event.title} — event poster` : SITE_NAME,
      imageWidth : isPortrait ? "794"  : "1200",
      imageHeight: isPortrait ? "1123" : "630",
      url        : `${SITE_URL}${pathname}`,
    };
  }

  // ── Rewrite and return ────────────────────────────────────────────────────────
  const rewritten = rewriteHtml(html, og);

  return new Response(rewritten, {
    status : 200,   // always 200 — prevents HTTP 206 Partial Content
    headers: {
      "content-type"  : "text/html; charset=UTF-8",
      "accept-ranges" : "none",  // prevents 206 byte-range responses
      // Allow crawlers to cache for 5 min; revalidate up to 60 s stale
      "cache-control" : "public, max-age=300, stale-while-revalidate=60",
    },
  });
}
