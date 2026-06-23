import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { patternParameters } from './shared.js';

const meta: Meta = {
  title: 'Patterns/Team',
  tags: ['autodocs'],
  parameters: patternParameters,
};
export default meta;
type Story = StoryObj;

const member = (name: string, role: string) => html`
  <div class="text-center">
    <twip-avatar name=${name} size="xl" class="mx-auto"></twip-avatar>
    <p class="mt-3 text-sm font-semibold text-gray-900">${name}</p>
    <p class="text-sm text-gray-500">${role}</p>
  </div>
`;

export const Grid: Story = {
  render: () => html`
    <twip-team-section
      eyebrow="Team"
      heading="Meet the people behind Twip"
      description="A small team building tools for developers everywhere."
      columns="4"
    >
      ${member('Ada Lovelace', 'Founder & CEO')}
      ${member('Grace Hopper', 'Head of Engineering')}
      ${member('Linus Torvalds', 'Lead Developer')}
      ${member('Tim Berners-Lee', 'Design Lead')}
    </twip-team-section>
  `,
};
