import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Progress',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-y-4 max-w-md">
      <twip-progress value="35" label="Uploading" show-value></twip-progress>
      <twip-progress value="80" tone="success" label="Sync" show-value></twip-progress>
      <twip-progress value="65" tone="warning" size="lg"></twip-progress>
      <twip-progress label="Indeterminate"></twip-progress>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
