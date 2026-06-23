import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { TwipButtonSize, TwipButtonVariant } from '../src/components/button/button.js';

interface Args {
  variant: TwipButtonVariant;
  size: TwipButtonSize;
  disabled: boolean;
  loading: boolean;
  fullWidth: boolean;
  label: string;
}

const meta: Meta<Args> = {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'soft', 'outline', 'ghost', 'destructive'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    label: 'Button',
  },
  render: ({ variant, size, disabled, loading, fullWidth, label }) => html`
    <twip-button
      .variant=${variant}
      .size=${size}
      ?disabled=${disabled}
      ?loading=${loading}
      ?full-width=${fullWidth}
    >
      ${label}
    </twip-button>
  `,
};
export default meta;

type Story = StoryObj<Args>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Soft: Story = { args: { variant: 'soft' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Destructive: Story = { args: { variant: 'destructive' } };
export const Loading: Story = { args: { loading: true, label: 'Saving…' } };
