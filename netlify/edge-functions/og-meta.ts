/**
 * Netlify Edge Function — og-meta  (v2)
 *
 * Intercepts GET requests to:
 *   /          → static home-page OG tags
 *   /events/*  → dynamic event-specific OG tags (fetched from API)
 *
 * ONLY modifies the response for known social-crawler user-agents.
 * Regular users receive the untouched SPA HTML.
 *
 * Runtime: Deno (Netlify Edge Runtime) — no Node.js APIs.
 * Type: Context is inlined below to avoid needing @netlify/edge-functions package.
 */

// ── Inline type so we don't need @netlify/edge-functions installed ─────────────
interface Context {
  next(opts?: { sendConditionalRequest?: boolean }): Promise<Response>;
  ip: string;
  geo: Record<string, unknown>;
  site: { id: string; name: string; url: string };
  deploy: { id: string; context: string; published: boolean };
  account: { id: string };
  cookies: { get(name: string): string | undefined; set(name: string, value: string): void };
  params: Record<string, string>;
  rewrite(url: string | URL): Promise<Response>;
  redirect(url: string | URL, status?: number): Response;
  json(data: unknown, init?: ResponseInit): Response;
  log(...args: unknown[]): void;
}

// ── Constants ──────────────────────────────────────────────────────────────────
const API_BASE  = "https://technova.indiesoft.cloud";
const SITE_URL  = "https://technova26.netlify.app";
const SITE_NAME = "TechNova'26";

const DEFAULT_IMAGE = `${SITE_URL}/hero1.png`;
const DEFAULT_TITLE = "TechNova'26 — Annual Technical Fest";
const DEFAULT_DESC  =
  "TechNova 2026 — The premier annual Technical Fest at DCRUST Murthal. Explore events, register your team, and celebrate innovation.";

// ── Crawler user-agent detection ───────────────────────────────────────────────
const CRAWLER_PATTERNS = [
  /facebookexternalhit/i,
  /facebot/i,
  /twitterbot/i,
  /whatsapp/i,
  /linkedinbot/i,
  /discordbot/i,
  /telegrambot/i,
  /slackbot/i,
  /pinterest/i,
  /applebot/i,
  /googlebot/i,
  /bingbot/i,
  /rogerbot/i,
  /embedly/i,
  /quora\s*link\s*preview/i,
  /outbrain/i,
  /screaming\s*frog/i,
  /skypeuripreview/i,
  /iframely/i,
  /vkshare/i,
];

function isCrawler(userAgent: string): boolean {
  if (!userAgent) return false;
  return CRAWLER_PATTERNS.some((re) => re.test(userAgent));
}

// ── Type for API event ─────────────────────────────────────────────────────────
interface ApiEvent {
  id?          : number | string;
  _id?         : number | string;
  title?       : string;
  description? : string;
  imagePath?   : string;
  department?  : string;
  date?        : string;
  venue?       : string;
  minTeamSize? : number;
  maxTeamSize? : number;
  /** API typo variant */
  maxTeaSize?  : number;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function resolveImageUrl(imagePath: string | undefined): string {
  if (!imagePath) return DEFAULT_IMAGE;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${API_BASE}/${imagePath.replace(/^\//, "")}`;
}

function truncate(text: string | undefined, max = 200): string {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

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

function buildEventDescription(event: ApiEvent): string {
  const parts: string[] = [];
  if (event.description) {
    parts.push(truncate(event.description, 160));
  }
  const details: string[] = [];
  if (event.department) details.push(`🏛 ${event.department}`);
  const dateStr = formatDate(event.date);
  if (dateStr)         details.push(`📅 ${dateStr}`);
  if (event.venue)     details.push(`📍 ${event.venue}`);
  const maxTeam = event.maxTeamSize ?? event.maxTeaSize;
  if (event.minTeamSize != null && maxTeam != null) {
    if (event.minTeamSize === maxTeam) {
      details.push(`👥 Team of ${event.minTeamSize}`);
    } else {
      details.push(`👥 ${event.minTeamSize}–${maxTeam} members`);
    }
  }
  if (details.length) parts.push(details.join("  |  "));
  return parts.join("\n") || DEFAULT_DESC;
}

/** Escape HTML special chars for safe injection into attribute values */
function esc(str: string): string {
  return str
    .replace(/&/g,  "&amp;")
    .replace(/"/g,  "&quot;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;");
}

interface OgData {
  title      : string;
  description: string;
  image      : string;
  imageAlt   : string;
  imageWidth : string;
  imageHeight: string;
  url        : string;
}

function buildMetaBlock(og: OgData): string {
  return `
  <!-- OG injected by Netlify Edge Function (og-meta v2) -->
  <meta property="og:type"         content="website" />
  <meta property="og:site_name"    content="${esc(SITE_NAME)}" />
  <meta property="og:title"        content="${esc(og.title)}" />
  <meta property="og:description"  content="${esc(og.description)}" />
  <meta property="og:image"        content="${esc(og.image)}" />
  <meta property="og:image:width"  content="${og.imageWidth}" />
  <meta property="og:image:height" content="${og.imageHeight}" />
  <meta property="og:image:alt"    content="${esc(og.imageAlt)}" />
  <meta property="og:url"          content="${esc(og.url)}" />
  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content="${esc(og.title)}" />
  <meta name="twitter:description" content="${esc(og.description)}" />
  <meta name="twitter:image"       content="${esc(og.image)}" />
  <meta name="twitter:image:alt"   content="${esc(og.imageAlt)}" />`;
}

/**
 * Strip any existing static OG / Twitter / injected tags from the HTML
 * to prevent duplicate meta when we inject our own.
 */
function stripExistingMeta(html: string): string {
  return html
    // Remove all <meta property="og:..."> tags (self-closing variants)
    .replace(/<meta\s+property="og:[^"]*"[^>]*\/?>/gi, "")
    // Remove all <meta name="twitter:..."> tags
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*\/?>/gi, "")
    // Remove our own injected comment markers
    .replace(/<!--\s*OG injected by Netlify Edge Function[^>]*-->/gi, "")
    // Remove old comment marker format
    .replace(/<!--\s*Dynamic OG injected[^>]*-->/gi, "");
}

// ── Main handler ───────────────────────────────────────────────────────────────
export default async function handler(req: Request, context: Context): Promise<Response> {
  const url = new URL(req.url);
  const ua  = req.headers.get("user-agent") ?? "";

  // ── Gate: only do expensive work for crawlers ──────────────────────────────
  // Normal browsers get the unmodified SPA immediately.
  if (!isCrawler(ua)) {
    return context.next();
  }

  // Only process GET requests
  if (req.method !== "GET") {
    return context.next();
  }

  const pathname = url.pathname;

  // ── Determine page type ────────────────────────────────────────────────────
  const isHome     = pathname === "/" || pathname === "";
  const eventMatch = pathname.match(/^\/events\/([^/]+)/);
  const eventId    = eventMatch?.[1];

  if (!isHome && !eventId) {
    // Not a page we handle — pass through
    return context.next();
  }

  // ── Fetch the raw SPA HTML from Netlify ────────────────────────────────────
  const htmlResponse = await context.next();

  const contentType = htmlResponse.headers.get("content-type") ?? "";
  if (!htmlResponse.ok || !contentType.includes("text/html")) {
    return htmlResponse;
  }

  let html = await htmlResponse.text();

  // ── Build OG data ──────────────────────────────────────────────────────────
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
    // Fetch event data from API (3-second timeout so crawlers aren't held up)
    let event: ApiEvent = {};
    try {
      const apiRes = await fetch(`${API_BASE}/api/events/${eventId}`, {
        headers: { Accept: "application/json" },
        signal : AbortSignal.timeout(3000),
      });
      if (apiRes.ok) {
        event = (await apiRes.json()) as ApiEvent;
      }
    } catch {
      // API unreachable → fall back to site defaults
    }

    const hasEvent = Boolean(event.title);
    if (hasEvent) {
      const isPortrait = Boolean(event.imagePath); // event posters are portrait
      og = {
        title      : `${event.title} — ${SITE_NAME}`,
        description: buildEventDescription(event),
        image      : resolveImageUrl(event.imagePath),
        imageAlt   : `${event.title} — event poster`,
        imageWidth : isPortrait ? "794"  : "1200",
        imageHeight: isPortrait ? "1123" : "630",
        url        : `${SITE_URL}${pathname}`,
      };
    } else {
      // Event not found → use site defaults
      og = {
        title      : DEFAULT_TITLE,
        description: DEFAULT_DESC,
        image      : DEFAULT_IMAGE,
        imageAlt   : SITE_NAME,
        imageWidth : "1200",
        imageHeight: "630",
        url        : `${SITE_URL}${pathname}`,
      };
    }
  }

  // ── Inject meta tags ───────────────────────────────────────────────────────
  // 1. Strip any static OG tags baked into index.html to prevent duplication
  html = stripExistingMeta(html);

  // 2. Inject just before </head>
  const metaBlock = buildMetaBlock(og);
  html = html.replace("</head>", `${metaBlock}\n  </head>`);

  // ── Return the rewritten HTML ──────────────────────────────────────────────
  return new Response(html, {
    status : 200,          // Always 200 — prevents HTTP 206 partial-content
    headers: {
      "content-type"  : "text/html;charset=UTF-8",
      "accept-ranges" : "none",  // Prevent byte-range → no 206
      "cache-control" : "public, max-age=300, stale-while-revalidate=60",
      "x-robots-tag"  : "all",
    },
  });
}
