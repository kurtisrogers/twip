import { describe, expect, it } from 'bun:test';
import '../../define/tooltip.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipTooltip } from './tooltip.js';

describe('twip-tooltip', () => {
  it('renders content in a role=tooltip element', async () => {
    const el = document.createElement('twip-tooltip') as TwipTooltip;
    el.content = 'Help text';
    const { element, cleanup } = await mount(el);
    const tip = element.shadowRoot?.querySelector('[role="tooltip"]');
    expect(tip?.textContent?.trim()).toBe('Help text');
    cleanup();
  });
});
