import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Accordion',
  tags: ['autodocs'],
  render: () => html`
    <div class="max-w-lg space-y-6">
      <twip-accordion>
        <twip-accordion-item heading="What is Twip?" open>
          A framework-agnostic, MIT-licensed library of original web components styled with
          Tailwind.
        </twip-accordion-item>
        <twip-accordion-item heading="How do I install it?">
          <code>bun add @twip/components</code> (or npm / pnpm / yarn).
        </twip-accordion-item>
        <twip-accordion-item heading="Can I theme it?">
          Yes — override the <code>brand</code> color in your Tailwind config and everything
          updates.
        </twip-accordion-item>
      </twip-accordion>

      <twip-accordion multiple>
        <twip-accordion-item heading="Multiple expand: one">Body one</twip-accordion-item>
        <twip-accordion-item heading="Multiple expand: two">Body two</twip-accordion-item>
      </twip-accordion>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
