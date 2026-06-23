import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Textarea',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-y-4 max-w-md">
      <twip-textarea label="Bio" placeholder="Tell us about yourself"></twip-textarea>
      <twip-textarea
        label="Description"
        help-text="Markdown supported."
        rows="6"
      ></twip-textarea>
      <twip-textarea
        label="Required"
        required
        error-text="This field is required."
      ></twip-textarea>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
