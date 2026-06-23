import { describe, expect, it } from 'bun:test';
import '../../define/slider.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipSlider } from './slider.js';

describe('twip-slider', () => {
  it('updates value on input event', async () => {
    const el = document.createElement('twip-slider') as TwipSlider;
    el.value = 10;
    const { element, cleanup } = await mount(el);
    const range = element.shadowRoot!.querySelector(
      'input[type="range"]',
    ) as HTMLInputElement;
    range.value = '42';
    range.dispatchEvent(new Event('input', { bubbles: true }));
    expect(element.value).toBe(42);
    cleanup();
  });
});
