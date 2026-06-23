import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Dropdown',
  tags: ['autodocs'],
  render: () => html`
    <twip-dropdown>
      <twip-button slot="trigger" variant="secondary">Options</twip-button>
      <button
        role="menuitem"
        class="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
      >
        Edit
      </button>
      <button
        role="menuitem"
        class="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
      >
        Duplicate
      </button>
      <button
        role="menuitem"
        class="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </twip-dropdown>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
