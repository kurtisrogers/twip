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
 * Contact form section with side-by-side form and info slots.
 *
 * @element twip-contact-section
 * @slot eyebrow - Leading label, typically a `twip-badge`.
 * @slot heading - Custom heading when the `heading` attribute is not set.
 * @slot description - Custom description when the `description` attribute is not set.
 * @slot form - Contact form with `twip-input`, `twip-textarea`, and `twip-button`.
 * @slot info - Contact details, office hours, or a `twip-card` with address info.
 */
export class TwipContactSection extends TwipElement {
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
      <section part="contact" class=${cx('bg-gray-50', SECTION_PADDING[this.size])}>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          ${renderSectionHeader({
            eyebrow: this.eyebrow,
            heading: this.heading,
            description: this.description,
          })}
          <div class="mt-12 grid gap-12 lg:grid-cols-2">
            <div part="form" class="empty:hidden">
              <slot name="form"></slot>
            </div>
            <div part="info" class="empty:hidden">
              <slot name="info"></slot>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-contact-section': TwipContactSection;
  }
}
