import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Radio',
  tags: ['autodocs'],
  render: () => html`
    <twip-radio-group label="Notification preference" value="email">
      <twip-radio value="email" label="Email"></twip-radio>
      <twip-radio value="sms" label="SMS" help-text="Carrier rates apply."></twip-radio>
      <twip-radio value="none" label="Don't notify me"></twip-radio>
    </twip-radio-group>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
