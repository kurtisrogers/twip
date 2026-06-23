import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Divider',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-y-6 max-w-md">
      <twip-divider></twip-divider>
      <twip-divider label="Or continue with"></twip-divider>
      <twip-divider border-style="dashed"></twip-divider>
      <div class="flex h-12 items-center gap-3">
        <span>Left</span>
        <twip-divider orientation="vertical"></twip-divider>
        <span>Right</span>
      </div>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
