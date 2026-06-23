import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { patternParameters } from './shared.js';

const meta: Meta = {
  title: 'Patterns/Content',
  tags: ['autodocs'],
  parameters: patternParameters,
};
export default meta;
type Story = StoryObj;

export const Article: Story = {
  render: () => html`
    <twip-content-section
      eyebrow="Blog"
      heading="Introducing section patterns"
      description="Pre-built layouts that compose Twip primitives into landing-page sections."
      narrow
    >
      <p>
        Building landing pages from scratch is repetitive. Hero, features, pricing, FAQ —
        every product page needs the same sections with slightly different copy.
      </p>
      <p>
        Twip patterns give you the structure and spacing. Drop in your content, slot in the
        components you already know, and ship.
      </p>
      <twip-divider label="Key benefits"></twip-divider>
      <p>
        Each pattern is a standalone custom element with sensible defaults and flexible
        slots.
      </p>
    </twip-content-section>
  `,
};
