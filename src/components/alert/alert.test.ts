import { describe, expect, it } from 'bun:test';
import '../../define/alert.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipAlert } from './alert.js';

describe('twip-alert', () => {
  it('shows the heading when provided', async () => {
    const el = document.createElement('twip-alert') as TwipAlert;
    el.heading = 'Hello';
    const { element, cleanup } = await mount(el);
    expect(element.shadowRoot?.textContent).toContain('Hello');
    cleanup();
  });

  it('dispatches twip-alert-dismiss on dismiss click', async () => {
    const el = document.createElement('twip-alert') as TwipAlert;
    el.dismissible = true;
    el.heading = 'Bye';
    const { element, cleanup } = await mount(el);
    let count = 0;
    element.addEventListener('twip-alert-dismiss', () => {
      count += 1;
    });
    const button = element.shadowRoot?.querySelector('button');
    button?.click();
    expect(count).toBe(1);
    cleanup();
  });
});
