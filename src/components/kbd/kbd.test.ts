import { describe, expect, it } from 'bun:test';
import '../../define/kbd.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipKbd } from './kbd.js';

describe('twip-kbd', () => {
  it('renders one kbd per key when keys array is provided', async () => {
    const el = document.createElement('twip-kbd') as TwipKbd;
    el.keys = ['Cmd', 'K'];
    const { element, cleanup } = await mount(el);
    const kbds = element.shadowRoot?.querySelectorAll('kbd');
    expect(kbds?.length).toBe(2);
    expect(kbds?.[0]?.textContent?.trim()).toBe('Cmd');
    cleanup();
  });
});
