import { describe, expect, it } from 'bun:test';
import '../../define/divider.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipDivider } from './divider.js';

describe('twip-divider', () => {
  it('renders a horizontal hr by default', async () => {
    const el = document.createElement('twip-divider') as TwipDivider;
    const { element, cleanup } = await mount(el);
    expect(element.shadowRoot?.querySelector('hr')).toBeTruthy();
    cleanup();
  });

  it('renders a vertical separator when orientation=vertical', async () => {
    const el = document.createElement('twip-divider') as TwipDivider;
    el.orientation = 'vertical';
    const { element, cleanup } = await mount(el);
    const sep = element.shadowRoot?.querySelector('[role="separator"]');
    expect(sep?.getAttribute('aria-orientation')).toBe('vertical');
    cleanup();
  });
});
