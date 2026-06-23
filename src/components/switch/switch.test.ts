import { describe, expect, it } from 'bun:test';
import '../../define/switch.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipSwitch } from './switch.js';

describe('twip-switch', () => {
  it('toggles checked on click and fires twip-switch-change', async () => {
    const el = document.createElement('twip-switch') as TwipSwitch;
    const { element, cleanup } = await mount(el);
    const events: Array<{ checked: boolean }> = [];
    element.addEventListener('twip-switch-change', (event: Event) => {
      events.push((event as CustomEvent<{ checked: boolean }>).detail);
    });
    element.shadowRoot?.querySelector('button')?.click();
    expect(element.checked).toBe(true);
    expect(events.length).toBe(1);
    expect(events[0]?.checked).toBe(true);
    cleanup();
  });

  it('does not toggle when disabled', async () => {
    const el = document.createElement('twip-switch') as TwipSwitch;
    el.disabled = true;
    const { element, cleanup } = await mount(el);
    element.shadowRoot?.querySelector('button')?.click();
    expect(element.checked).toBe(false);
    cleanup();
  });
});
