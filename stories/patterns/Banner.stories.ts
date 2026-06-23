import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { patternParameters } from './shared.js';

const meta: Meta = {
  title: 'Patterns/Banner',
  tags: ['autodocs'],
  parameters: patternParameters,
};
export default meta;
type Story = StoryObj;

export const Announcement: Story = {
  render: () => html`
    <twip-banner-section tone="brand">
      <span>
        🎉 Section patterns are here!
        <a href="#" class="ml-1 font-semibold underline">Browse patterns →</a>
      </span>
      <twip-button slot="actions" variant="secondary" size="sm">Dismiss</twip-button>
    </twip-banner-section>
  `,
};

export const Info: Story = {
  render: () => html`
    <twip-banner-section tone="info">
      Scheduled maintenance on Sunday 2–4 AM UTC.
    </twip-banner-section>
  `,
};
