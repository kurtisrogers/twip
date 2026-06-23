/**
 * Bun test preload script.
 *
 * Installs a jsdom DOM environment as the global runtime so Lit
 * components can render in `bun:test`. We use jsdom rather than
 * happy-dom because Lit's template parsing leans on subtle HTML5
 * attribute-parsing behavior that happy-dom does not fully replicate
 * for multi-binding attribute lists.
 *
 * Wired up via `bunfig.toml` -> `[test].preload`.
 */
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true,
});

const { window } = dom;

const globals: Record<string, unknown> = {
  window,
  document: window.document,
  navigator: window.navigator,
  HTMLElement: window.HTMLElement,
  HTMLDialogElement: window.HTMLDialogElement,
  HTMLInputElement: window.HTMLInputElement,
  HTMLButtonElement: window.HTMLButtonElement,
  HTMLSlotElement: window.HTMLSlotElement,
  HTMLTemplateElement: window.HTMLTemplateElement,
  Document: window.Document,
  DocumentFragment: window.DocumentFragment,
  Element: window.Element,
  Node: window.Node,
  ShadowRoot: window.ShadowRoot,
  customElements: window.customElements,
  CSSStyleSheet: window.CSSStyleSheet,
  CSSRule: window.CSSRule,
  Event: window.Event,
  CustomEvent: window.CustomEvent,
  MouseEvent: window.MouseEvent,
  KeyboardEvent: window.KeyboardEvent,
  Node_: window.Node,
  getComputedStyle: window.getComputedStyle.bind(window),
  requestAnimationFrame: (cb: FrameRequestCallback) =>
    setTimeout(() => cb(performance.now()), 16) as unknown as number,
  cancelAnimationFrame: (id: number) => clearTimeout(id),
};

for (const [key, value] of Object.entries(globals)) {
  Object.defineProperty(globalThis, key, {
    value,
    configurable: true,
    writable: true,
  });
}

class ResizeObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
(globalThis as { ResizeObserver?: unknown }).ResizeObserver = ResizeObserverStub;

if (!('showModal' in window.HTMLDialogElement.prototype)) {
  Object.defineProperty(window.HTMLDialogElement.prototype, 'showModal', {
    configurable: true,
    value(this: HTMLDialogElement) {
      this.setAttribute('open', '');
    },
  });
  Object.defineProperty(window.HTMLDialogElement.prototype, 'close', {
    configurable: true,
    value(this: HTMLDialogElement) {
      this.removeAttribute('open');
      this.dispatchEvent(new window.Event('close'));
    },
  });
}
