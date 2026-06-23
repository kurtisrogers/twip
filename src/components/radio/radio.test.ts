import { describe, expect, it } from 'bun:test';
import '../../define/radio.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipRadio } from './radio.js';
import type { TwipRadioGroup } from './radio-group.js';

describe('twip-radio-group', () => {
  it('selecting a child radio updates the group value', async () => {
    const group = document.createElement('twip-radio-group') as TwipRadioGroup;
    const a = document.createElement('twip-radio') as TwipRadio;
    a.value = 'a';
    const b = document.createElement('twip-radio') as TwipRadio;
    b.value = 'b';
    group.appendChild(a);
    group.appendChild(b);
    const { element, cleanup } = await mount(group);
    await a.updateComplete;
    await b.updateComplete;

    const events: Array<{ value: string }> = [];
    element.addEventListener('twip-radio-group-change', (e: Event) => {
      events.push((e as CustomEvent<{ value: string }>).detail);
    });

    b.shadowRoot?.querySelector('button')?.click();
    await element.updateComplete;
    await a.updateComplete;
    await b.updateComplete;

    expect(element.value).toBe('b');
    expect(a.checked).toBe(false);
    expect(b.checked).toBe(true);
    expect(events[0]?.value).toBe('b');
    cleanup();
  });
});
