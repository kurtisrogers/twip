import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';
import {
  SECTION_PADDING,
  renderSectionHeader,
  type TwipSectionSize,
} from './section-shared.js';

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Pricing plans grid for tiered product offerings.
 *
 * @element twip-pricing-section
 * @slot eyebrow - Leading label, typically a `twip-badge`.
 * @slot heading - Custom heading when the `heading` attribute is not set.
 * @slot description - Custom description when the `description` attribute is not set.
 * @slot - Pricing tier cards, typically `twip-card` with `twip-button`.
 */
export class TwipPricingSection extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String })
  eyebrow: string | null = null;

  @property({ type: String })
  heading: string | null = null;

  @property({ type: String })
  description: string | null = null;

  @property({ type: Number, reflect: true })
  columns: 2 | 3 = 3;

  @property({ type: String, reflect: true })
  size: TwipSectionSize = 'lg';

  override render(): TemplateResult {
    const gridClass =
      this.columns === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

    return html`
      <section part="pricing" class=${cx('bg-white', SECTION_PADDING[this.size])}>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          ${renderSectionHeader({
            eyebrow: this.eyebrow,
            heading: this.heading,
            description: this.description,
          })}
          <div part="grid" class=${cx('mt-12 grid gap-8', gridClass)}>
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-pricing-section': TwipPricingSection;
  }
}
