import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';
import { SECTION_PADDING, type TwipSectionSize } from './section-shared.js';

export type TwipSplitMediaPosition = 'left' | 'right';

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Two-column split layout for content beside media.
 *
 * @element twip-split-section
 * @slot eyebrow - Leading label, typically a `twip-badge`.
 * @slot heading - Custom heading when the `heading` attribute is not set.
 * @slot description - Custom description when the `description` attribute is not set.
 * @slot content - Additional body content below the description.
 * @slot actions - Action buttons, typically `twip-button`.
 * @slot media - Image, video, or illustration.
 */
export class TwipSplitSection extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String })
  eyebrow: string | null = null;

  @property({ type: String })
  heading: string | null = null;

  @property({ type: String })
  description: string | null = null;

  @property({ type: String, reflect: true, attribute: 'media-position' })
  mediaPosition: TwipSplitMediaPosition = 'right';

  @property({ type: String, reflect: true })
  size: TwipSectionSize = 'md';

  override render(): TemplateResult {
    const mediaFirst = this.mediaPosition === 'left';

    const textContent = html`
      <div part="content" class="flex flex-col justify-center gap-6">
        <div class="empty:hidden">
          <slot name="eyebrow">
            ${this.eyebrow
              ? html`<p class="text-sm font-semibold text-brand-600">${this.eyebrow}</p>`
              : ''}
          </slot>
        </div>
        ${this.heading
          ? html`<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              ${this.heading}
            </h2>`
          : html`<div class="empty:hidden">
              <slot name="heading"></slot>
            </div>`}
        ${this.description
          ? html`<p class="text-lg text-gray-600">${this.description}</p>`
          : html`<div class="empty:hidden text-lg text-gray-600">
              <slot name="description"></slot>
            </div>`}
        <div part="body" class="empty:hidden text-gray-600">
          <slot name="content"></slot>
        </div>
        <div part="actions" class="flex flex-wrap gap-3 empty:hidden">
          <slot name="actions"></slot>
        </div>
      </div>
    `;

    const mediaContent = html`
      <div part="media" class="empty:hidden">
        <slot name="media"></slot>
      </div>
    `;

    return html`
      <section part="split" class=${cx('bg-white', SECTION_PADDING[this.size])}>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            ${mediaFirst ? mediaContent : textContent}
            ${mediaFirst ? textContent : mediaContent}
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-split-section': TwipSplitSection;
  }
}
