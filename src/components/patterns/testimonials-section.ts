import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';
import {
  SECTION_PADDING,
  gridColumnsClass,
  renderSectionHeader,
  type TwipSectionColumns,
  type TwipSectionSize,
} from './section-shared.js';

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Testimonials grid for social proof quotes and reviews.
 *
 * @element twip-testimonials-section
 * @slot eyebrow - Leading label, typically a `twip-badge`.
 * @slot heading - Custom heading when the `heading` attribute is not set.
 * @slot description - Custom description when the `description` attribute is not set.
 * @slot - Testimonial cards, typically `twip-card` with `twip-avatar` and `twip-rating`.
 */
export class TwipTestimonialsSection extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String })
  eyebrow: string | null = null;

  @property({ type: String })
  heading: string | null = null;

  @property({ type: String })
  description: string | null = null;

  @property({ type: Number, reflect: true })
  columns: TwipSectionColumns = 3;

  @property({ type: String, reflect: true })
  size: TwipSectionSize = 'md';

  override render(): TemplateResult {
    return html`
      <section part="testimonials" class=${cx('bg-gray-50', SECTION_PADDING[this.size])}>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          ${renderSectionHeader({
            eyebrow: this.eyebrow,
            heading: this.heading,
            description: this.description,
          })}
          <div part="grid" class=${cx('mt-12 grid gap-6', gridColumnsClass(this.columns))}>
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-testimonials-section': TwipTestimonialsSection;
  }
}
