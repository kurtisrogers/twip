import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Patterns/Split',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const MediaRight: Story = {
  render: () => html`
    <twip-split-section
      eyebrow="Why Twip"
      heading="Built for the modern web"
      description="Custom elements that work everywhere, styled with the utility classes you already know."
      media-position="right"
    >
      <twip-badge slot="eyebrow" tone="blue" variant="soft">Why Twip</twip-badge>
      <ul slot="content" class="space-y-2 text-sm text-gray-600">
        <li>✓ Framework agnostic</li>
        <li>✓ Tree-shakeable ESM bundles</li>
        <li>✓ Accessible by default</li>
      </ul>
      <twip-button slot="actions">Learn more</twip-button>
      <twip-card slot="media" padding="none">
        <div class="aspect-video bg-gradient-to-tr from-brand-50 to-brand-200 p-8">
          <p class="text-sm text-brand-800">Feature illustration</p>
        </div>
      </twip-card>
    </twip-split-section>
  `,
};

export const MediaLeft: Story = {
  render: () => html`
    <twip-split-section
      heading="Design with confidence"
      description="Consistent patterns mean your landing pages always look polished."
      media-position="left"
    >
      <twip-alert slot="content" tone="success" heading="Pro tip">
        Combine split sections with hero and CTA patterns for a complete landing page.
      </twip-alert>
      <div slot="media" class="rounded-xl bg-gray-100 p-12 text-center text-gray-500">
        Media placeholder
      </div>
    </twip-split-section>
  `,
};
