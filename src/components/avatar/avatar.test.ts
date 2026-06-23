import { describe, expect, it } from 'bun:test';
import '../../define/avatar.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipAvatar } from './avatar.js';

describe('twip-avatar', () => {
  it('renders initials when no src is provided', async () => {
    const el = document.createElement('twip-avatar') as TwipAvatar;
    el.name = 'Ada Lovelace';
    const { element, cleanup } = await mount(el);
    expect(element.shadowRoot?.textContent).toContain('AL');
    cleanup();
  });

  it('renders the image element when src is provided', async () => {
    const el = document.createElement('twip-avatar') as TwipAvatar;
    el.src = '/avatar.png';
    el.alt = 'Profile';
    const { element, cleanup } = await mount(el);
    expect(element.shadowRoot?.querySelector('img')?.getAttribute('src')).toBe(
      '/avatar.png',
    );
    cleanup();
  });
});
