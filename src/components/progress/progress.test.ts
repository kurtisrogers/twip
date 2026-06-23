import { describe, expect, it } from 'bun:test';
import '../../define/progress.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipProgress } from './progress.js';

describe('twip-progress', () => {
  it('reflects aria-valuenow when value is set', async () => {
    const el = document.createElement('twip-progress') as TwipProgress;
    el.value = 40;
    el.max = 100;
    const { element, cleanup } = await mount(el);
    const bar = element.shadowRoot?.querySelector('[role="progressbar"]');
    expect(bar?.getAttribute('aria-valuenow')).toBe('40');
    cleanup();
  });

  it('omits aria-valuenow when indeterminate', async () => {
    const el = document.createElement('twip-progress') as TwipProgress;
    const { element, cleanup } = await mount(el);
    const bar = element.shadowRoot?.querySelector('[role="progressbar"]');
    expect(bar?.hasAttribute('aria-valuenow')).toBe(false);
    cleanup();
  });
});
