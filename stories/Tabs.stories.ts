import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { TwipTabsVariant } from '../src/components/tabs/tabs.js';

interface Args {
  variant: TwipTabsVariant;
}

const meta: Meta<Args> = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['underline', 'pill', 'segmented'] },
  },
  args: { variant: 'underline' },
  render: ({ variant }) => html`
    <twip-tabs .variant=${variant}>
      <button slot="tabs" data-tab-id="overview" label="Overview"></button>
      <button slot="tabs" data-tab-id="settings" label="Settings"></button>
      <button slot="tabs" data-tab-id="billing" label="Billing"></button>
      <div data-tab-id="overview">Overview content</div>
      <div data-tab-id="settings">Settings content</div>
      <div data-tab-id="billing">Billing content</div>
    </twip-tabs>
  `,
};
export default meta;
type Story = StoryObj<Args>;
export const Underline: Story = { args: { variant: 'underline' } };
export const Pill: Story = { args: { variant: 'pill' } };
export const Segmented: Story = { args: { variant: 'segmented' } };
