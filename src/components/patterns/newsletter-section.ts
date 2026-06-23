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
 * Newsletter or email signup section with a form slot.
 *
 * @element twip-newsletter-section
 * @slot eyebrow - Leading label, typically a `twip-badge`.
 * @slot heading - Custom heading when the `heading` attribute is not set.
 * @slot description - Custom description when the `description` attribute is not set.
 * @slot form - Signup form with `twip-input` and `twip-button`.
 * @slot aside - Optional secondary content beside the form.
 */
export class TwipNewsletterSection extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String })
  eyebrow: string | null = null;

  @property({ type: String })
  heading: string | null = null;

  @property({ type: String })
  description: string | null = null;

  @property({ type: String, reflect: true })
  size: TwipSectionSize = 'md';

  override render(): TemplateResult {
    return html`
      <section part="newsletter" class=${cx('bg-brand-50', SECTION_PADDING[this.size])}>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-xl text-center">
            ${renderSectionHeader({
              eyebrow: this.eyebrow,
              heading: this.heading,
              description: this.description,
            })}
            <div part="form" class="mt-8 empty:hidden">
              <slot name="form"></slot>
            </div>
            <div part="aside" class="mt-4 empty:hidden text-sm text-gray-500">
              <slot name="aside"></slot>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-newsletter-section': TwipNewsletterSection;
  }
}
