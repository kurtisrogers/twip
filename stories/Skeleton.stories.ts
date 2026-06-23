import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Skeleton',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-y-6 max-w-md">
      <twip-skeleton lines="3"></twip-skeleton>
      <div class="flex items-center gap-3">
        <twip-skeleton shape="circle" width="2.5rem"></twip-skeleton>
        <twip-skeleton style="flex:1"></twip-skeleton>
      </div>
      <twip-skeleton shape="rect" width="100%" height="160px"></twip-skeleton>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
