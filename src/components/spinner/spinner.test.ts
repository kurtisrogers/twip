import { describe, expect, it } from 'bun:test';
import '../../define/spinner.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipSpinner } from './spinner.js';

describe('twip-spinner', () => {
  it('renders a status role with a default label', async () => {
    const el = document.createElement('twip-spinner') as TwipSpinner;
    const { element, cleanup } = await mount(el);
    const status = element.shadowRoot?.querySelector('[role="status"]');
    expect(status?.getAttribute('aria-label')).toBe('Loading');
    cleanup();
  });
});
