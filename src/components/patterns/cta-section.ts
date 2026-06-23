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

export type TwipCtaVariant = 'default' | 'brand' | 'soft' | 'bordered';

const VARIANT_CLASSES: Record<
  TwipCtaVariant,
  { section: string; heading: string; body: string }
> = {
  default: {
    section: 'bg-gray-50',
    heading: 'text-gray-900',
    body: 'text-gray-600',
  },
  brand: {
    section: 'bg-brand-600',
    heading: 'text-white',
    body: 'text-brand-100',
  },
  soft: {
    section: 'bg-brand-50',
    heading: 'text-gray-900',
    body: 'text-gray-600',
  },
  bordered: {
    section: 'bg-white',
    heading: 'text-gray-900',
    body: 'text-gray-600',
  },
};

function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${String(value)}`);
}

function variantClasses(variant: TwipCtaVariant): (typeof VARIANT_CLASSES)[TwipCtaVariant] {
  switch (variant) {
    case 'default':
    case 'brand':
    case 'soft':
    case 'bordered':
      return VARIANT_CLASSES[variant];
    default:
      return assertNever(variant);
  }
}

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Call-to-action band with configurable background treatment.
 *
 * @element twip-cta-section
 * @slot heading - Custom heading when the `heading` attribute is not set.
 * @slot description - Custom description when the `description` attribute is not set.
 * @slot actions - Action buttons, typically `twip-button`.
 */
export class TwipCtaSection extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String })
  heading: string | null = null;

  @property({ type: String })
  description: string | null = null;

  @property({ type: String, reflect: true })
  variant: TwipCtaVariant = 'brand';

  @property({ type: String, reflect: true })
  align: TwipSectionAlign = 'center';

  @property({ type: String, reflect: true })
  size: TwipSectionSize = 'md';

  override render(): TemplateResult {
    const styles = variantClasses(this.variant);
    const alignCls = alignClass(this.align);
    const itemsAlign = this.align === 'center' ? 'items-center' : 'items-start';
    const actionsAlign = this.align === 'center' ? 'justify-center' : 'justify-start';
    const isBordered = this.variant === 'bordered';

    return html`
      <section
        part="cta"
        class=${cx(
          SECTION_PADDING[this.size],
          styles.section,
          isBordered && 'border-y border-gray-200',
        )}
      >
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            class=${cx(
              'mx-auto flex max-w-2xl flex-col gap-6',
              itemsAlign,
              alignCls,
              isBordered && 'rounded-2xl border border-gray-200 bg-gray-50 p-8 sm:p-12',
            )}
          >
            ${this.heading
              ? html`<h2
                  class=${cx(
                    'text-3xl font-bold tracking-tight sm:text-4xl',
                    styles.heading,
                  )}
                >
                  ${this.heading}
                </h2>`
              : html`<div class="empty:hidden">
                  <slot name="heading"></slot>
                </div>`}
            ${this.description
              ? html`<p class=${cx('text-lg', styles.body)}>${this.description}</p>`
              : html`<div class=${cx('empty:hidden text-lg', styles.body)}>
                  <slot name="description"></slot>
                </div>`}
            <div
              part="actions"
              class=${cx('flex flex-wrap gap-3 empty:hidden', actionsAlign)}
            >
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
    'twip-cta-section': TwipCtaSection;
  }
}
