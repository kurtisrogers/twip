import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Slider',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-y-6 max-w-md">
      <twip-slider label="Volume" show-value value="35"></twip-slider>
      <twip-slider label="Brightness" min="0" max="200" step="10" value="120"></twip-slider>
      <twip-slider label="Disabled" disabled value="50"></twip-slider>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
