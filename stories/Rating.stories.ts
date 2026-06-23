import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Rating',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-y-4">
      <twip-rating value="3"></twip-rating>
      <twip-rating value="4.5" step="0.5"></twip-rating>
      <twip-rating value="2" interactive></twip-rating>
      <twip-rating value="0" max="10" interactive size="lg"></twip-rating>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
