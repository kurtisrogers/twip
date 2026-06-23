import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Spinner',
  tags: ['autodocs'],
  render: () => html`
    <div class="flex items-center gap-4">
      <twip-spinner size="xs"></twip-spinner>
      <twip-spinner size="sm"></twip-spinner>
      <twip-spinner size="md"></twip-spinner>
      <twip-spinner size="lg" tone="gray"></twip-spinner>
      <twip-spinner size="xl"></twip-spinner>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
