import { describe, expect, it } from 'bun:test';
import '../../define/button.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipButton } from './button.js';

describe('twip-button', () => {
  it('renders a native button by default', async () => {
    const el = document.createElement('twip-button') as TwipButton;
    el.textContent = 'Click me';
    const { element, cleanup } = await mount(el);
    const button = element.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('type')).toBe('button');
    cleanup();
  });

  it('renders an anchor when href is provided', async () => {
    const el = document.createElement('twip-button') as TwipButton;
    el.href = '/somewhere';
    const { element, cleanup } = await mount(el);
    expect(element.shadowRoot?.querySelector('a')?.getAttribute('href')).toBe('/somewhere');
    cleanup();
  });

  it('does not fire twip-click when disabled', async () => {
    const el = document.createElement('twip-button') as TwipButton;
    el.disabled = true;
    const { element, cleanup } = await mount(el);
    let fired = 0;
    element.addEventListener('twip-click', () => {
      fired += 1;
    });
    element.shadowRoot?.querySelector('button')?.click();
    expect(fired).toBe(0);
    cleanup();
  });

  it('fires twip-click when enabled', async () => {
    const el = document.createElement('twip-button') as TwipButton;
    const { element, cleanup } = await mount(el);
    let fired = 0;
    element.addEventListener('twip-click', () => {
      fired += 1;
    });
    element.shadowRoot?.querySelector('button')?.click();
    expect(fired).toBe(1);
    cleanup();
  });

  it('reflects variant attribute', async () => {
    const el = document.createElement('twip-button') as TwipButton;
    el.variant = 'destructive';
    const { element, cleanup } = await mount(el);
    expect(element.getAttribute('variant')).toBe('destructive');
    cleanup();
  });
});
