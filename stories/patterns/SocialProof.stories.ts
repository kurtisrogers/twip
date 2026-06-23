import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { patternParameters } from './shared.js';

const meta: Meta = {
  title: 'Patterns/SocialProof',
  tags: ['autodocs'],
  parameters: patternParameters,
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <twip-social-proof-section heading="Rated 4.9/5 by over 2,000 developers">
      <twip-avatar slot="avatars" name="Ada Lovelace" size="sm"></twip-avatar>
      <twip-avatar slot="avatars" name="Grace Hopper" size="sm"></twip-avatar>
      <twip-avatar slot="avatars" name="Linus Torvalds" size="sm"></twip-avatar>
      <twip-avatar slot="avatars" name="Tim Berners-Lee" size="sm"></twip-avatar>
      <twip-rating slot="rating" value="4.9" readonly></twip-rating>
      <twip-button slot="actions" variant="ghost" size="sm">Read reviews →</twip-button>
    </twip-social-proof-section>
  `,
};
