import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Pagination',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-y-4">
      <twip-pagination total-pages="5" page="1"></twip-pagination>
      <twip-pagination total-pages="20" page="7"></twip-pagination>
      <twip-pagination total-pages="100" page="50" sibling-count="2"></twip-pagination>
      <twip-pagination total-pages="12" page="3" size="sm"></twip-pagination>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
