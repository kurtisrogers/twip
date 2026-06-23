import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { patternParameters } from './shared.js';

const meta: Meta = {
  title: 'Patterns/CTA',
  tags: ['autodocs'],
  parameters: patternParameters,
};
export default meta;
type Story = StoryObj;

export const Brand: Story = {
  render: () => html`
    <twip-cta-section
      variant="brand"
      heading="Ready to dive in?"
      description="Start building with Twip today. No framework lock-in, no runtime dependencies beyond Lit."
    >
      <twip-button slot="actions" variant="secondary" size="lg">Get started</twip-button>
      <twip-button slot="actions" variant="outline" size="lg">Contact sales</twip-button>
    </twip-cta-section>
  `,
};

export const Bordered: Story = {
  render: () => html`
    <twip-cta-section
      variant="bordered"
      heading="Try Twip for free"
      description="Open source and MIT licensed. Use it in personal and commercial projects."
      align="center"
    >
      <twip-button slot="actions">Sign up</twip-button>
      <twip-button slot="actions" variant="ghost">Learn more</twip-button>
    </twip-cta-section>
  `,
};

export const Soft: Story = {
  render: () => html`
    <twip-cta-section
      variant="soft"
      heading="Join the community"
      description="Star the repo, open issues, and contribute patterns back to the library."
    >
      <twip-button slot="actions" variant="primary">View on GitHub</twip-button>
    </twip-cta-section>
  `,
};
