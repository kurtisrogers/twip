import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Alert',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-y-3">
      <twip-alert tone="info" heading="Heads up">
        Something informational happened.
      </twip-alert>
      <twip-alert tone="success" heading="Saved" dismissible>
        Your changes have been saved.
      </twip-alert>
      <twip-alert tone="warning" heading="Be careful">
        This action cannot be undone.
      </twip-alert>
      <twip-alert tone="danger" heading="Something went wrong" dismissible>
        We could not complete your request.
      </twip-alert>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Tones: Story = {};
