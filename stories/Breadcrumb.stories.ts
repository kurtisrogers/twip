import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Breadcrumb',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-y-4">
      <twip-breadcrumb>
        <twip-breadcrumb-item href="/">Home</twip-breadcrumb-item>
        <twip-breadcrumb-item href="/library">Library</twip-breadcrumb-item>
        <twip-breadcrumb-item>Data</twip-breadcrumb-item>
      </twip-breadcrumb>
      <twip-breadcrumb separator="slash">
        <twip-breadcrumb-item href="/">Projects</twip-breadcrumb-item>
        <twip-breadcrumb-item href="/projects/twip">Twip</twip-breadcrumb-item>
        <twip-breadcrumb-item>Settings</twip-breadcrumb-item>
      </twip-breadcrumb>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
