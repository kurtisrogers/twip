import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  render: () => html`
    <div class="flex gap-6 p-12">
      <twip-tooltip content="Top tooltip" placement="top">
        <twip-button variant="secondary">Top</twip-button>
      </twip-tooltip>
      <twip-tooltip content="Right tooltip" placement="right">
        <twip-button variant="secondary">Right</twip-button>
      </twip-tooltip>
      <twip-tooltip content="Bottom tooltip" placement="bottom">
        <twip-button variant="secondary">Bottom</twip-button>
      </twip-tooltip>
      <twip-tooltip content="Left tooltip" placement="left">
        <twip-button variant="secondary">Left</twip-button>
      </twip-tooltip>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Placements: Story = {};
