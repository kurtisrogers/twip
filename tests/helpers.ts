import type { LitElement } from 'lit';

/**
 * Mount an element into the live document, wait for first Lit render,
 * and return it. The teardown returned restores the document body.
 */
export async function mount<T extends Element>(
  el: T,
): Promise<{ element: T; cleanup: () => void }> {
  document.body.appendChild(el);
  if ('updateComplete' in el) {
    await (el as unknown as LitElement).updateComplete;
  }
  return {
    element: el,
    cleanup: () => {
      el.remove();
    },
  };
}

/** Yield to a microtask + animation frame so DOM mutations settle. */
export function tick(): Promise<void> {
  return new Promise((resolve) => {
    queueMicrotask(() => resolve());
  });
}
