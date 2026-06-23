import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Patterns/Pricing',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const tier = (name: string, price: string, features: string[], highlighted = false) => html`
  <twip-card padding="lg" elevation=${highlighted ? 'lg' : 'sm'}>
    <div slot="header" class="flex items-center justify-between">
      <span class="font-semibold text-gray-900">${name}</span>
      ${highlighted ? html`<twip-badge tone="indigo">Popular</twip-badge>` : ''}
    </div>
    <p class="mt-2 text-3xl font-bold text-gray-900">
      ${price}<span class="text-sm font-normal text-gray-500">/mo</span>
    </p>
    <ul class="mt-4 space-y-2 text-sm text-gray-600">
      ${features.map((f) => html`<li>✓ ${f}</li>`)}
    </ul>
    <div slot="footer">
      <twip-button variant=${highlighted ? 'primary' : 'secondary'} class="w-full">
        Get started
      </twip-button>
    </div>
  </twip-card>
`;

export const ThreeTier: Story = {
  render: () => html`
    <twip-pricing-section
      eyebrow="Pricing"
      heading="Plans for every team"
      description="Start free and scale as you grow. No hidden fees."
      columns="3"
    >
      ${tier('Starter', '$0', ['5 components', 'Community support', 'MIT license'])}
      ${tier('Pro', '$29', ['All components', 'All patterns', 'Priority support'], true)}
      ${tier('Enterprise', '$99', ['Custom theming', 'SLA', 'Dedicated support'])}
    </twip-pricing-section>
  `,
};
