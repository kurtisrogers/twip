import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Card',
  tags: ['autodocs'],
  render: () => html`
    <twip-card style="max-width: 28rem">
      <div slot="header" class="font-semibold text-gray-900">Project</div>
      <p class="text-sm text-gray-600">
        A surface container with optional header and footer sections. Use it to group
        related content with consistent spacing and elevation.
      </p>
      <div slot="footer" class="flex justify-end gap-2">
        <twip-button variant="ghost">Cancel</twip-button>
        <twip-button>Save</twip-button>
      </div>
    </twip-card>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
