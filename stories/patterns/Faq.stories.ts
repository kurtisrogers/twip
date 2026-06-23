import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { patternParameters } from './shared.js';

const meta: Meta = {
  title: 'Patterns/FAQ',
  tags: ['autodocs'],
  parameters: patternParameters,
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <twip-faq-section
      eyebrow="FAQ"
      heading="Frequently asked questions"
      description="Everything you need to know about Twip and how to use it in your project."
    >
      <twip-accordion>
        <twip-accordion-item heading="What is Twip?" open>
          A framework-agnostic component library of original web components styled with
          Tailwind CSS.
        </twip-accordion-item>
        <twip-accordion-item heading="How do I install it?">
          Run <code>bun add @twip/components</code> or use npm, pnpm, or yarn.
        </twip-accordion-item>
        <twip-accordion-item
          heading="Can I use patterns without registering all components?"
        >
          Yes. Import <code>@twip/components/define/patterns</code> for section patterns
          only, plus individual component define modules as needed.
        </twip-accordion-item>
        <twip-accordion-item heading="Does it work with React or Vue?">
          Absolutely. Custom elements work in any framework. Use the elements directly in
          your templates.
        </twip-accordion-item>
      </twip-accordion>
    </twip-faq-section>
  `,
};
