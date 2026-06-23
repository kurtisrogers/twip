import { describe, expect, it } from 'bun:test';
import '../../define/textarea.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipTextarea } from './textarea.js';

describe('twip-textarea', () => {
  it('renders a textarea with the supplied label', async () => {
    const el = document.createElement('twip-textarea') as TwipTextarea;
    el.label = 'Notes';
    const { element, cleanup } = await mount(el);
    expect(element.shadowRoot?.querySelector('label')?.textContent?.trim()).toBe('Notes');
    expect(element.shadowRoot?.querySelector('textarea')).toBeTruthy();
    cleanup();
  });

  it('updates value on input event', async () => {
    const el = document.createElement('twip-textarea') as TwipTextarea;
    const { element, cleanup } = await mount(el);
    const ta = element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
    ta.value = 'hello';
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    expect(element.value).toBe('hello');
    cleanup();
  });
});
