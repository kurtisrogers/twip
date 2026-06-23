import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Input',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-y-4" style="max-width: 24rem">
      <twip-input label="Email" type="email" placeholder="you@example.com" required>
      </twip-input>
      <twip-input label="Username" help-text="3–24 characters."></twip-input>
      <twip-input label="Password" type="password" error-text="Too short."></twip-input>
      <twip-input label="Disabled" disabled value="locked"></twip-input>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Gallery: Story = {};
