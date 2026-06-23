import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Patterns/Stats',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const stat = (value: string, label: string) => html`
  <div>
    <p class="text-3xl font-bold text-brand-600">${value}</p>
    <p class="mt-1 text-sm text-gray-600">${label}</p>
  </div>
`;

export const Default: Story = {
  render: () => html`
    <twip-stats-section
      heading="Trusted at scale"
      description="Numbers that speak for themselves."
      columns="4"
      divided
    >
      ${stat('10k+', 'Downloads')} ${stat('28', 'Components')} ${stat('17', 'Patterns')}
      ${stat('99.9%', 'Uptime')}
    </twip-stats-section>
  `,
};
