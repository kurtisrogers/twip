import { describe, expect, it } from 'bun:test';
import '../../define/badge.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipBadge } from './badge.js';

describe('twip-badge', () => {
  it('renders default soft gray badge', async () => {
    const el = document.createElement('twip-badge') as TwipBadge;
    el.textContent = 'New';
    const { element, cleanup } = await mount(el);
    const span = element.shadowRoot?.querySelector('span');
    expect(span?.className).toContain('bg-gray-100');
    cleanup();
  });

  it('honors solid variant', async () => {
    const el = document.createElement('twip-badge') as TwipBadge;
    el.variant = 'solid';
    el.tone = 'red';
    const { element, cleanup } = await mount(el);
    const span = element.shadowRoot?.querySelector('span');
    expect(span?.className).toContain('bg-red-600');
    cleanup();
  });
});
