import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const steps = [
  { id: 'account', label: 'Account', description: 'Sign in' },
  { id: 'profile', label: 'Profile', description: 'About you' },
  { id: 'billing', label: 'Billing', description: 'Payment info' },
  { id: 'review', label: 'Review', description: 'Confirm' },
];

const meta: Meta = {
  title: 'Components/Stepper',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-y-8">
      <twip-stepper .steps=${steps} current="1"></twip-stepper>
      <twip-stepper .steps=${steps} current="3" orientation="vertical"></twip-stepper>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
