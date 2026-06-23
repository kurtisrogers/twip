import { describe, expect, it } from 'bun:test';
import '../../define/dropdown.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipDropdown } from './dropdown.js';

describe('twip-dropdown', () => {
  it('toggles open via show/hide', async () => {
    const el = document.createElement('twip-dropdown') as TwipDropdown;
    const { element, cleanup } = await mount(el);
    expect(element.open).toBe(false);
    element.show();
    expect(element.open).toBe(true);
    element.hide();
    expect(element.open).toBe(false);
    cleanup();
  });

  it('fires open and close events', async () => {
    const el = document.createElement('twip-dropdown') as TwipDropdown;
    const { element, cleanup } = await mount(el);
    let opened = 0;
    let closed = 0;
    element.addEventListener('twip-dropdown-open', () => {
      opened += 1;
    });
    element.addEventListener('twip-dropdown-close', () => {
      closed += 1;
    });
    element.show();
    element.hide();
    expect(opened).toBe(1);
    expect(closed).toBe(1);
    cleanup();
  });
});
