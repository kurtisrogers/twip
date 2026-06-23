import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { patternParameters } from './shared.js';

const meta: Meta = {
  title: 'Patterns/Contact',
  tags: ['autodocs'],
  parameters: patternParameters,
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <twip-contact-section
      eyebrow="Contact"
      heading="Get in touch"
      description="We'd love to hear from you. Send us a message and we'll respond within 24 hours."
    >
      <form slot="form" class="space-y-4">
        <twip-input label="Name" placeholder="Jane Doe"></twip-input>
        <twip-input type="email" label="Email" placeholder="jane@example.com"></twip-input>
        <twip-textarea
          label="Message"
          placeholder="How can we help?"
          rows="4"
        ></twip-textarea>
        <twip-button type="submit">Send message</twip-button>
      </form>
      <twip-card slot="info" padding="lg">
        <div slot="header" class="font-semibold text-gray-900">Office</div>
        <p class="text-sm text-gray-600">
          123 Component Street<br />
          San Francisco, CA 94102<br /><br />
          <strong>Hours:</strong> Mon–Fri, 9am–5pm PT
        </p>
      </twip-card>
    </twip-contact-section>
  `,
};
