export type CustomElementCtor = CustomElementConstructor;

/**
 * Registers a custom element under the given tag, idempotently.
 *
 * If a different constructor is already registered under the tag, this
 * function logs a warning and keeps the existing definition rather than
 * throwing — useful when the same module graph is loaded twice (e.g.
 * from multiple bundles on the same page).
 */
export function defineElement(tag: string, ctor: CustomElementCtor): void {
  if (typeof customElements === 'undefined') {
    return;
  }
  const existing = customElements.get(tag);
  if (existing) {
    if (existing !== ctor) {
      console.warn(
        `[twip] Tag <${tag}> is already defined by a different constructor; skipping re-registration.`,
      );
    }
    return;
  }
  customElements.define(tag, ctor);
}
