import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Patterns/Steps',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const WithStepper: Story = {
  render: () => html`
    <twip-steps-section
      eyebrow="How it works"
      heading="Get started in three steps"
      description="From install to production in minutes."
    >
      <twip-stepper
        slot="stepper"
        .steps=${[
          { id: '1', label: 'Install', description: 'Add the package to your project' },
          { id: '2', label: 'Import', description: 'Register the components you need' },
          { id: '3', label: 'Build', description: 'Compose patterns and ship' },
        ]}
        current="1"
      ></twip-stepper>
    </twip-steps-section>
  `,
};

export const WithCards: Story = {
  render: () => html`
    <twip-steps-section
      heading="Three simple steps"
      description="No complex setup required."
    >
      <twip-card padding="lg">
        <twip-badge tone="indigo" variant="soft">Step 1</twip-badge>
        <p class="mt-2 font-semibold text-gray-900">Install Twip</p>
        <p class="mt-1 text-sm text-gray-600">bun add @twip/components</p>
      </twip-card>
      <twip-card padding="lg">
        <twip-badge tone="indigo" variant="soft">Step 2</twip-badge>
        <p class="mt-2 font-semibold text-gray-900">Register components</p>
        <p class="mt-1 text-sm text-gray-600">import '@twip/components/define/patterns'</p>
      </twip-card>
      <twip-card padding="lg">
        <twip-badge tone="indigo" variant="soft">Step 3</twip-badge>
        <p class="mt-2 font-semibold text-gray-900">Compose & ship</p>
        <p class="mt-1 text-sm text-gray-600">Drop section patterns into your pages.</p>
      </twip-card>
    </twip-steps-section>
  `,
};
