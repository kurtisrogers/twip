import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-y-3">
      <twip-checkbox label="Subscribe to newsletter"></twip-checkbox>
      <twip-checkbox label="Auto-renew subscription" checked></twip-checkbox>
      <twip-checkbox label="Indeterminate" indeterminate></twip-checkbox>
      <twip-checkbox label="Disabled" disabled></twip-checkbox>
      <twip-checkbox
        label="With help text"
        help-text="We'll never share your address."
      ></twip-checkbox>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
