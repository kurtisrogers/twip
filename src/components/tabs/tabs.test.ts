import { describe, expect, it } from 'bun:test';
import '../../define/tabs.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipTabs } from './tabs.js';

describe('twip-tabs', () => {
  it('renders tabs from slotted descriptors and shows the first by default', async () => {
    const el = document.createElement('twip-tabs') as TwipTabs;
    el.innerHTML = `
      <button slot="tabs" data-tab-id="a" label="A"></button>
      <button slot="tabs" data-tab-id="b" label="B"></button>
      <div data-tab-id="a">Panel A</div>
      <div data-tab-id="b">Panel B</div>
    `;
    const { element, cleanup } = await mount(el);
    await (element as unknown as { updateComplete: Promise<void> }).updateComplete;
    expect(element.value).toBe('a');
    cleanup();
  });
});
