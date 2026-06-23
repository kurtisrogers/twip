import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Patterns/Testimonials',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const testimonial = (name: string, role: string, quote: string) => html`
  <twip-card padding="lg">
    <twip-rating value="5" readonly class="mb-3"></twip-rating>
    <p class="text-sm text-gray-600">"${quote}"</p>
    <div class="mt-4 flex items-center gap-3">
      <twip-avatar name=${name} size="sm"></twip-avatar>
      <div>
        <p class="text-sm font-semibold text-gray-900">${name}</p>
        <p class="text-xs text-gray-500">${role}</p>
      </div>
    </div>
  </twip-card>
`;

export const Grid: Story = {
  render: () => html`
    <twip-testimonials-section
      eyebrow="Testimonials"
      heading="Loved by developers"
      description="Teams of all sizes use Twip to ship polished UIs faster."
      columns="3"
    >
      ${testimonial(
        'Ada Lovelace',
        'Engineering Lead',
        'Twip cut our UI build time in half. The patterns are a game changer.',
      )}
      ${testimonial(
        'Grace Hopper',
        'CTO',
        'Finally a component library that works everywhere without wrappers.',
      )}
      ${testimonial(
        'Linus Torvalds',
        'Founder',
        'Clean APIs, great defaults, and the section patterns saved us weeks.',
      )}
    </twip-testimonials-section>
  `,
};
