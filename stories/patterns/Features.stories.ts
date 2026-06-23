import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Patterns/Features',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const featureCard = (title: string, body: string) => html`
  <twip-card>
    <div slot="header" class="flex items-center gap-2">
      <twip-badge tone="indigo" variant="soft">${title.charAt(0)}</twip-badge>
      <span class="font-semibold text-gray-900">${title}</span>
    </div>
    <p class="text-sm text-gray-600">${body}</p>
  </twip-card>
`;

export const Grid: Story = {
  render: () => html`
    <twip-features-section
      eyebrow="Features"
      heading="Everything you need to build"
      description="Composable primitives and section patterns that work in any framework."
      columns="3"
    >
      ${featureCard(
        'Tree-shakeable',
        'Import only the components you use. Each ships as its own ESM chunk.',
      )}
      ${featureCard(
        'Accessible',
        'Built on web standards with keyboard navigation and ARIA baked in.',
      )}
      ${featureCard(
        'Themeable',
        'Re-skin globally via Tailwind config or per-instance with ::part selectors.',
      )}
    </twip-features-section>
  `,
};

export const Bento: Story = {
  render: () => html`
    <twip-bento-section
      eyebrow="Showcase"
      heading="A bento grid of capabilities"
      description="Mix and match cards for asymmetric feature layouts."
    >
      <twip-card class="sm:col-span-2" padding="lg">
        <div slot="header" class="font-semibold text-gray-900">Design system</div>
        <p class="text-sm text-gray-600">
          Consistent spacing, typography, and color tokens across every component.
        </p>
      </twip-card>
      <twip-card padding="lg">
        <div slot="header" class="font-semibold text-gray-900">Dark mode</div>
        <p class="text-sm text-gray-600">Class-based dark mode support via Tailwind.</p>
      </twip-card>
      <twip-card padding="lg">
        <div slot="header" class="font-semibold text-gray-900">Forms</div>
        <p class="text-sm text-gray-600">Input, select, checkbox, and more.</p>
      </twip-card>
      <twip-card class="sm:col-span-2" padding="lg">
        <div slot="header" class="font-semibold text-gray-900">Patterns</div>
        <p class="text-sm text-gray-600">
          Pre-built section layouts for heroes, pricing, FAQs, and more.
        </p>
      </twip-card>
    </twip-bento-section>
  `,
};
