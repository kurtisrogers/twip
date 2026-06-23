import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Badge',
  tags: ['autodocs'],
  render: () => html`
    <div class="flex flex-wrap items-center gap-2">
      <twip-badge tone="gray">Gray</twip-badge>
      <twip-badge tone="red">Red</twip-badge>
      <twip-badge tone="green">Green</twip-badge>
      <twip-badge tone="blue">Blue</twip-badge>
      <twip-badge tone="indigo" variant="solid">Solid</twip-badge>
      <twip-badge tone="purple" variant="outline">Outline</twip-badge>
      <twip-badge tone="pink" rounded>Pill</twip-badge>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Gallery: Story = {};
