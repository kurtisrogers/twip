import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';
import {
  SECTION_PADDING,
  renderSectionHeader,
  type TwipSectionAlign,
  type TwipSectionSize,
} from './section-shared.js';

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * General-purpose content section for prose, articles, or long-form copy.
 *
 * @element twip-content-section
 * @slot eyebrow - Leading label, typically a `twip-badge`.
 * @slot heading - Custom heading when the `heading` attribute is not set.
 * @slot description - Custom description when the `description` attribute is not set.
 * @slot - Main content body.
 */
export class TwipContentSection extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String })
  eyebrow: string | null = null;

  @property({ type: String })
  heading: string | null = null;

  @property({ type: String })
  description: string | null = null;

  @property({ type: String, reflect: true })
  align: TwipSectionAlign = 'left';

  @property({ type: String, reflect: true })
  size: TwipSectionSize = 'md';

  @property({ type: Boolean, reflect: true })
  narrow = false;

  override render(): TemplateResult {
    const maxWidth = this.narrow ? 'max-w-2xl' : 'max-w-4xl';

    return html`
      <section part="content" class=${cx('bg-white', SECTION_PADDING[this.size])}>
        <div class=${cx('mx-auto px-4 sm:px-6 lg:px-8', maxWidth)}>
          ${renderSectionHeader({
            eyebrow: this.eyebrow,
            heading: this.heading,
            description: this.description,
            align: this.align,
            className: this.align === 'left' ? 'mx-0' : undefined,
          })}
          <div part="body" class="prose prose-gray mt-8 max-w-none empty:hidden">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-content-section': TwipContentSection;
  }
}
