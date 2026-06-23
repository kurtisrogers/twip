import { describe, expect, it } from 'bun:test';
import '../../define/select.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipSelect } from './select.js';

describe('twip-select', () => {
  it('renders options from the options property', async () => {
    const el = document.createElement('twip-select') as TwipSelect;
    el.options = [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
    ];
    const { element, cleanup } = await mount(el);
    const opts = element.shadowRoot?.querySelectorAll('option');
    expect(opts?.length).toBe(2);
    expect(opts?.[0]?.getAttribute('value')).toBe('1');
    cleanup();
  });

  it('dispatches twip-select-change on change', async () => {
    const el = document.createElement('twip-select') as TwipSelect;
    el.options = [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
    ];
    const { element, cleanup } = await mount(el);
    const seen: string[] = [];
    element.addEventListener('twip-select-change', (e: Event) => {
      seen.push((e as CustomEvent<{ value: string }>).detail.value);
    });
    const native = element.shadowRoot!.querySelector('select') as HTMLSelectElement;
    native.value = '2';
    native.dispatchEvent(new Event('change', { bubbles: true }));
    expect(seen[0]).toBe('2');
    expect(element.value).toBe('2');
    cleanup();
  });
});
