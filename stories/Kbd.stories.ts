import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Kbd',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-y-4">
      <div class="flex items-center gap-3">
        <span>Open command palette:</span>
        <twip-kbd .keys=${['Ctrl', 'K']}></twip-kbd>
      </div>
      <div class="flex items-center gap-3">
        <span>Save:</span>
        <twip-kbd .keys=${['Cmd', 'S']} size="sm"></twip-kbd>
      </div>
      <div class="flex items-center gap-3">
        <span>Single key:</span>
        <twip-kbd size="lg">Enter</twip-kbd>
      </div>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
