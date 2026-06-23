import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { patternParameters } from './shared.js';

const meta: Meta = {
  title: 'Patterns/Hero',
  tags: ['autodocs'],
  parameters: patternParameters,
};
export default meta;
type Story = StoryObj;

export const Centered: Story = {
  render: () => html`
    <twip-hero-section
      eyebrow="Now in beta"
      heading="Build beautiful interfaces faster"
      description="Twip gives you framework-agnostic web components styled with Tailwind. Drop them into any stack and ship."
      align="center"
    >
      <twip-badge slot="eyebrow" tone="indigo" variant="soft">Now in beta</twip-badge>
      <twip-button slot="actions" size="lg">Get started</twip-button>
      <twip-button slot="actions" variant="secondary" size="lg">View docs</twip-button>
      <twip-card slot="media" padding="none" elevation="lg">
        <div class="aspect-video bg-gradient-to-br from-brand-100 to-brand-200 p-8">
          <p class="text-sm text-brand-700">Product screenshot placeholder</p>
        </div>
      </twip-card>
    </twip-hero-section>
  `,
};

export const Split: Story = {
  render: () => html`
    <twip-hero-section
      layout="split"
      align="left"
      heading="Ship products your users love"
      description="Compose landing pages from battle-tested section patterns built on Twip primitives."
    >
      <twip-badge slot="eyebrow" tone="green" variant="soft">New release</twip-badge>
      <twip-button slot="actions">Start building</twip-button>
      <twip-button slot="actions" variant="outline">Browse components</twip-button>
      <twip-card slot="media" padding="lg" elevation="md">
        <div class="flex aspect-square items-center justify-center rounded-lg bg-gray-100">
          <twip-spinner size="lg"></twip-spinner>
        </div>
      </twip-card>
    </twip-hero-section>
  `,
};
