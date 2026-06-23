import { describe, expect, it } from 'bun:test';
import '../../define/empty-state.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipEmptyState } from './empty-state.js';

describe('twip-empty-state', () => {
  it('renders heading and description', async () => {
    const el = document.createElement('twip-empty-state') as TwipEmptyState;
    el.heading = 'No projects';
    el.description = 'Create one to get started.';
    const { element, cleanup } = await mount(el);
    expect(element.shadowRoot?.querySelector('h3')?.textContent?.trim()).toBe(
      'No projects',
    );
    expect(element.shadowRoot?.querySelector('p')?.textContent?.trim()).toBe(
      'Create one to get started.',
    );
    cleanup();
  });
});
