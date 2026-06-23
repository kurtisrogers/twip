import tailwindCss from './tailwind.css?inline';

let cachedSheet: CSSStyleSheet | null = null;

/**
 * Returns a shared, constructable Tailwind stylesheet.
 *
 * Components adopt this sheet on their shadow root rather than inlining
 * Tailwind utilities per component. This keeps the runtime cost flat as
 * the catalog grows: a single parsed CSSStyleSheet shared by every
 * component instance via `adoptedStyleSheets`.
 *
 * Falls back to an inline <style> for older runtimes (Safari < 16.4)
 * that do not support constructable stylesheets.
 */
export function getTailwindSheet(): CSSStyleSheet | null {
  if (typeof CSSStyleSheet === 'undefined') {
    return null;
  }
  if (cachedSheet) {
    return cachedSheet;
  }
  try {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(tailwindCss);
    cachedSheet = sheet;
    return sheet;
  } catch {
    return null;
  }
}

export function getTailwindCssText(): string {
  return tailwindCss;
}
