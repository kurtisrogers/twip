import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { patternParameters } from './patterns/shared.js';

const meta: Meta = {
  title: 'Patterns/Introduction',
  tags: ['autodocs'],
  parameters: patternParameters,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => html`
    <div class="mx-auto max-w-3xl px-6 py-16">
      <p class="text-sm font-semibold text-brand-600">Patterns</p>
      <h1 class="mt-2 text-4xl font-bold tracking-tight text-gray-900">Section patterns</h1>
      <p class="mt-4 text-lg text-gray-600">
        Pre-built landing-page sections that compose Twip primitives into common layouts.
        Import <code class="text-sm">@twip/components/define/patterns</code> then browse the
        sections in this sidebar group.
      </p>
      <twip-features-section
        class="mt-12"
        heading="Available sections"
        description="Hero, features, CTA, FAQ, testimonials, stats, pricing, team, and more."
        columns="3"
        size="sm"
      >
        <twip-card>
          <div slot="header" class="font-semibold text-gray-900">Hero</div>
          <p class="text-sm text-gray-600">
            Stacked or split hero with actions and media slots.
          </p>
        </twip-card>
        <twip-card>
          <div slot="header" class="font-semibold text-gray-900">Features</div>
          <p class="text-sm text-gray-600">
            Configurable column grids for capability highlights.
          </p>
        </twip-card>
        <twip-card>
          <div slot="header" class="font-semibold text-gray-900">Pricing</div>
          <p class="text-sm text-gray-600">
            Tier cards composed from twip-card and twip-button.
          </p>
        </twip-card>
      </twip-features-section>
    </div>
  `,
};
