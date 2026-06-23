import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { TwipToaster } from '../src/components/toast/toaster.js';

let counter = 0;

function notify(tone: 'info' | 'success' | 'warning' | 'danger'): void {
  const toaster = document.querySelector('twip-toaster') as TwipToaster | null;
  if (!toaster) return;
  counter += 1;
  toaster.notify({
    tone,
    heading: `${tone[0]!.toUpperCase()}${tone.slice(1)} #${counter}`,
    description: 'This is an example toast notification.',
    duration: 4000,
  });
}

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  render: () => html`
    <div class="space-x-2">
      <twip-button @click=${() => notify('info')}>Info</twip-button>
      <twip-button variant="secondary" @click=${() => notify('success')}
        >Success</twip-button
      >
      <twip-button variant="soft" @click=${() => notify('warning')}>Warning</twip-button>
      <twip-button variant="destructive" @click=${() => notify('danger')}
        >Danger</twip-button
      >
    </div>
    <twip-toaster placement="top-end"></twip-toaster>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
