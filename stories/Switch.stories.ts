import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Switch',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-y-3">
      <twip-switch label="Email notifications"></twip-switch>
      <twip-switch label="Marketing updates" checked></twip-switch>
      <twip-switch label="Disabled" disabled></twip-switch>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
