import { useEffect } from "react";
import type { ApiEvent } from "./events";
import { getEventImageUrl } from "./events";

const DEFAULT_TITLE = "Technova'2k26";
const DEFAULT_DESC = "TechNova 2026 – The annual techno-cultural fest. Register for exciting events!";

function setMeta(property: string, content: string, isName = false) {
  const attr = isName ? "name" : "property";
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(property: string, isName = false) {
  const attr = isName ? "name" : "property";
  const el = document.querySelector(`meta[${attr}="${property}"]`);
  if (el) el.remove();
}

/** Sets dynamic OG / Twitter meta tags for a given event page. Resets on unmount. */
export function useEventMeta(event: ApiEvent | null) {
  useEffect(() => {
    if (!event) return;

    const title = `${event.title} – Technova'2k26`;
    const description =
      event.description
        ? event.description.slice(0, 200) + (event.description.length > 200 ? "…" : "")
        : DEFAULT_DESC;
    const imageUrl = getEventImageUrl(event.imagePath) || `${window.location.origin}/technova-img1.JPG`;
    const pageUrl = window.location.href;

    // Page title
    document.title = title;

    // Open Graph
    setMeta("og:type", "website");
    setMeta("og:site_name", "Technova 2026");
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:image", imageUrl);
    setMeta("og:image:width", "794");   // A4 at 96dpi width
    setMeta("og:image:height", "1123"); // A4 at 96dpi height
    setMeta("og:url", pageUrl);

    // Twitter / X
    setMeta("twitter:card", "summary_large_image", true);
    setMeta("twitter:title", title, true);
    setMeta("twitter:description", description, true);
    setMeta("twitter:image", imageUrl, true);

    return () => {
      // Reset on unmount
      document.title = DEFAULT_TITLE;
      removeMeta("og:type");
      removeMeta("og:site_name");
      removeMeta("og:title");
      removeMeta("og:description");
      removeMeta("og:image");
      removeMeta("og:image:width");
      removeMeta("og:image:height");
      removeMeta("og:url");
      removeMeta("twitter:card", true);
      removeMeta("twitter:title", true);
      removeMeta("twitter:description", true);
      removeMeta("twitter:image", true);
    };
  }, [event]);
}
