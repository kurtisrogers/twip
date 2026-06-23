import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Avatar',
  tags: ['autodocs'],
  render: () => html`
    <div class="flex items-center gap-3">
      <twip-avatar size="xs" name="Ada Lovelace"></twip-avatar>
      <twip-avatar size="sm" name="Grace Hopper"></twip-avatar>
      <twip-avatar size="md" name="Linus Torvalds" status="online"></twip-avatar>
      <twip-avatar size="lg" name="Tim Berners-Lee" status="busy"></twip-avatar>
      <twip-avatar size="xl" name="Margaret Hamilton" status="away"></twip-avatar>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Sizes: Story = {};
