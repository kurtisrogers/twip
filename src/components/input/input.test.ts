import { describe, expect, it } from 'bun:test';
import '../../define/input.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipInput } from './input.js';

describe('twip-input', () => {
  it('renders a labeled input', async () => {
    const el = document.createElement('twip-input') as TwipInput;
    el.label = 'Email';
    const { element, cleanup } = await mount(el);
    expect(element.shadowRoot?.querySelector('label')?.textContent).toContain('Email');
    cleanup();
  });

  it('updates value on input event', async () => {
    const el = document.createElement('twip-input') as TwipInput;
    const { element, cleanup } = await mount(el);
    const input = element.shadowRoot?.querySelector('input');
    expect(input).toBeTruthy();
    if (input) {
      input.value = 'hello';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    expect(element.value).toBe('hello');
    cleanup();
  });

  it('shows error text when set', async () => {
    const el = document.createElement('twip-input') as TwipInput;
    el.errorText = 'Required field';
    const { element, cleanup } = await mount(el);
    await (element as unknown as { updateComplete: Promise<void> }).updateComplete;
    expect(element.shadowRoot?.textContent).toContain('Required field');
    cleanup();
  });
});
