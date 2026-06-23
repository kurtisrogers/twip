import { describe, expect, it } from 'bun:test';
import '../../define/checkbox.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipCheckbox } from './checkbox.js';

describe('twip-checkbox', () => {
  it('toggles on click and dispatches twip-checkbox-change', async () => {
    const el = document.createElement('twip-checkbox') as TwipCheckbox;
    const { element, cleanup } = await mount(el);
    const events: Array<{ checked: boolean }> = [];
    element.addEventListener('twip-checkbox-change', (event: Event) => {
      events.push((event as CustomEvent<{ checked: boolean }>).detail);
    });
    element.shadowRoot?.querySelector('button')?.click();
    expect(element.checked).toBe(true);
    expect(events.length).toBe(1);
    expect(events[0]?.checked).toBe(true);
    cleanup();
  });

  it('does not toggle when disabled', async () => {
    const el = document.createElement('twip-checkbox') as TwipCheckbox;
    el.disabled = true;
    const { element, cleanup } = await mount(el);
    element.shadowRoot?.querySelector('button')?.click();
    expect(element.checked).toBe(false);
    cleanup();
  });

  it('reports aria-checked="mixed" when indeterminate', async () => {
    const el = document.createElement('twip-checkbox') as TwipCheckbox;
    el.indeterminate = true;
    const { element, cleanup } = await mount(el);
    const box = element.shadowRoot?.querySelector('button');
    expect(box?.getAttribute('aria-checked')).toBe('mixed');
    cleanup();
  });
});
