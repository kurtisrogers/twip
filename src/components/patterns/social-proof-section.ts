import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';
import {
  SECTION_PADDING,
  alignClass,
  type TwipSectionAlign,
  type TwipSectionSize,
} from './section-shared.js';

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Social proof strip with avatar stack, rating, and supporting copy.
 *
 * @element twip-social-proof-section
 * @slot avatars - Avatar stack, typically multiple `twip-avatar` elements.
 * @slot rating - Star rating, typically a `twip-rating`.
 * @slot - Supporting text or testimonial snippet.
 * @slot actions - Optional action link or button.
 */
export class TwipSocialProofSection extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String })
  heading: string | null = null;

  @property({ type: String, reflect: true })
  align: TwipSectionAlign = 'center';

  @property({ type: String, reflect: true })
  size: TwipSectionSize = 'sm';

  override render(): TemplateResult {
    const alignCls = alignClass(this.align);
    const itemsAlign = this.align === 'center' ? 'items-center' : 'items-start';

    return html`
      <section part="social-proof" class=${cx('bg-white', SECTION_PADDING[this.size])}>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class=${cx('mx-auto flex max-w-xl flex-col gap-4', itemsAlign, alignCls)}>
            <div part="avatars" class="flex -space-x-2 empty:hidden">
              <slot name="avatars"></slot>
            </div>
            <div part="rating" class="empty:hidden">
              <slot name="rating"></slot>
            </div>
            ${this.heading
              ? html`<p class="text-sm font-medium text-gray-900">${this.heading}</p>`
              : html`<div class="empty:hidden text-sm font-medium text-gray-900">
                  <slot></slot>
                </div>`}
            <div part="actions" class="empty:hidden">
              <slot name="actions"></slot>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-social-proof-section': TwipSocialProofSection;
  }
}
