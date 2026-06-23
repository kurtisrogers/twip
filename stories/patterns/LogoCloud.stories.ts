import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Patterns/LogoCloud',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const logo = (name: string) => html`
  <span class="text-lg font-bold text-gray-400">${name}</span>
`;

export const Default: Story = {
  render: () => html`
    <twip-logo-cloud-section heading="Trusted by innovative teams" bordered>
      ${logo('Acme')} ${logo('Globex')} ${logo('Initech')} ${logo('Umbrella')}
      ${logo('Stark')}
    </twip-logo-cloud-section>
  `,
};
