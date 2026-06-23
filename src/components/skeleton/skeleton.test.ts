import { describe, expect, it } from 'bun:test';
import '../../define/skeleton.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipSkeleton } from './skeleton.js';

describe('twip-skeleton', () => {
  it('renders multiple lines when shape=text and lines>1', async () => {
    const el = document.createElement('twip-skeleton') as TwipSkeleton;
    el.shape = 'text';
    el.lines = 3;
    const { element, cleanup } = await mount(el);
    const bars = element.shadowRoot?.querySelectorAll('.shimmer');
    expect(bars?.length).toBe(3);
    cleanup();
  });
});
