import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { TwipSelect } from '../src/components/select/select.js';

const meta: Meta = {
  title: 'Components/Select',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-y-4 max-w-md">
      <twip-select
        label="Country"
        placeholder="Select a country"
        .options=${[
          { label: 'Canada', value: 'ca' },
          { label: 'United Kingdom', value: 'uk' },
          { label: 'United States', value: 'us' },
        ]}
        @twip-select-change=${(e: Event) =>
          console.warn('selected', (e.target as TwipSelect).value)}
      ></twip-select>
      <twip-select
        label="Plan"
        value="pro"
        .options=${[
          { label: 'Free', value: 'free' },
          { label: 'Pro', value: 'pro' },
          { label: 'Enterprise', value: 'ent', disabled: true },
        ]}
      ></twip-select>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
