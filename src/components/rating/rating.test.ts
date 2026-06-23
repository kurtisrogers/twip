import { describe, expect, it } from 'bun:test';
import '../../define/rating.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipRating } from './rating.js';

describe('twip-rating', () => {
  it('renders max stars', async () => {
    const el = document.createElement('twip-rating') as TwipRating;
    el.max = 4;
    el.value = 2;
    const { element, cleanup } = await mount(el);
    const stars = element.shadowRoot?.querySelectorAll('span.relative');
    expect(stars?.length).toBe(4);
    cleanup();
  });

  it('uses role=slider when interactive', async () => {
    const el = document.createElement('twip-rating') as TwipRating;
    el.interactive = true;
    const { element, cleanup } = await mount(el);
    const root = element.shadowRoot?.querySelector('span[part="rating"]');
    expect(root?.getAttribute('role')).toBe('slider');
    cleanup();
  });
});
