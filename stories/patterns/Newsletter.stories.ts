import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { patternParameters } from './shared.js';

const meta: Meta = {
  title: 'Patterns/Newsletter',
  tags: ['autodocs'],
  parameters: patternParameters,
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <twip-newsletter-section
      eyebrow="Newsletter"
      heading="Stay in the loop"
      description="Get the latest component releases, patterns, and tips delivered to your inbox."
    >
      <form slot="form" class="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <twip-input
          type="email"
          placeholder="you@example.com"
          label="Email"
          class="sm:min-w-64"
        ></twip-input>
        <twip-button type="submit" class="sm:self-end">Subscribe</twip-button>
      </form>
      <span slot="aside">We respect your privacy. Unsubscribe at any time.</span>
    </twip-newsletter-section>
  `,
};
