import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';
import {
  SECTION_PADDING,
  alignClass,
  type TwipSectionAlign,
  type TwipSectionSize,
} from './section-shared.js';

export type TwipHeroLayout = 'stacked' | 'split';

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Hero section with optional eyebrow, headline, description, actions, and media.
 *
 * @element twip-hero-section
 * @slot eyebrow - Leading label, typically a `twip-badge`.
 * @slot heading - Custom heading when the `heading` attribute is not set.
 * @slot description - Custom description when the `description` attribute is not set.
 * @slot actions - Primary and secondary calls to action, typically `twip-button`.
 * @slot media - Hero image, screenshot, or illustration.
 */
export class TwipHeroSection extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String })
  eyebrow: string | null = null;

  @property({ type: String })
  heading: string | null = null;

  @property({ type: String })
  description: string | null = null;

  @property({ type: String, reflect: true })
  align: TwipSectionAlign = 'center';

  @property({ type: String, reflect: true })
  layout: TwipHeroLayout = 'stacked';

  @property({ type: String, reflect: true })
  size: TwipSectionSize = 'lg';

  override render(): TemplateResult {
    const isSplit = this.layout === 'split';
    const alignCls = alignClass(this.align);
    const itemsAlign = this.align === 'center' ? 'items-center' : 'items-start';
    const actionsAlign = this.align === 'center' ? 'justify-center' : 'justify-start';

    const content = html`
      <div
        part="content"
        class=${cx('flex flex-col gap-6', itemsAlign, alignCls, isSplit && 'lg:max-w-xl')}
      >
        <div class="empty:hidden">
          <slot name="eyebrow">
            ${this.eyebrow
              ? html`<p class="text-sm font-semibold text-brand-600">${this.eyebrow}</p>`
              : nothing}
          </slot>
        </div>
        ${this.heading
          ? html`<h1
              class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              ${this.heading}
            </h1>`
          : html`<div class="empty:hidden">
              <slot name="heading"></slot>
            </div>`}
        ${this.description
          ? html`<p class="max-w-2xl text-lg text-gray-600 sm:text-xl">
              ${this.description}
            </p>`
          : html`<div class="empty:hidden max-w-2xl text-lg text-gray-600 sm:text-xl">
              <slot name="description"></slot>
            </div>`}
        <div part="actions" class=${cx('flex flex-wrap gap-3 empty:hidden', actionsAlign)}>
          <slot name="actions"></slot>
        </div>
      </div>
    `;

    return html`
      <section part="hero" class=${cx('bg-white', SECTION_PADDING[this.size])}>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          ${isSplit
            ? html`<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                ${content}
                <div part="media" class="empty:hidden">
                  <slot name="media"></slot>
                </div>
              </div>`
            : html`<div
                class="mx-auto flex max-w-3xl flex-col gap-8 ${itemsAlign} ${alignCls}"
              >
                ${content}
                <div part="media" class="w-full empty:hidden">
                  <slot name="media"></slot>
                </div>
              </div>`}
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-hero-section': TwipHeroSection;
  }
}
