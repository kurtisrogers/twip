import { describe, expect, it } from 'bun:test';
import '../../define/card.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipCard } from './card.js';

describe('twip-card', () => {
  it('renders a section', async () => {
    const el = document.createElement('twip-card') as TwipCard;
    const { element, cleanup } = await mount(el);
    expect(element.shadowRoot?.querySelector('section')).toBeTruthy();
    cleanup();
  });

  it('hides header when no slotted header content', async () => {
    const el = document.createElement('twip-card') as TwipCard;
    const { element, cleanup } = await mount(el);
    const header = element.shadowRoot?.querySelector('header');
    expect(header?.hasAttribute('hidden')).toBe(true);
    cleanup();
  });
});
