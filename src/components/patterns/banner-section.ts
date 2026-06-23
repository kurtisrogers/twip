import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipBannerTone = 'neutral' | 'brand' | 'info';

const TONE_CLASSES: Record<TwipBannerTone, string> = {
  neutral: 'bg-gray-900 text-white',
  brand: 'bg-brand-600 text-white',
  info: 'bg-blue-600 text-white',
};

function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${String(value)}`);
}

function toneClass(tone: TwipBannerTone): string {
  switch (tone) {
    case 'neutral':
    case 'brand':
    case 'info':
      return TONE_CLASSES[tone];
    default:
      return assertNever(tone);
  }
}

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Compact announcement banner for site-wide notices.
 *
 * @element twip-banner-section
 * @slot - Banner message, typically text with an inline link.
 * @slot actions - Dismiss or action buttons, typically `twip-button`.
 */
export class TwipBannerSection extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String, reflect: true })
  tone: TwipBannerTone = 'brand';

  override render(): TemplateResult {
    return html`
      <section part="banner" class=${cx('px-4 py-3 sm:px-6', toneClass(this.tone))}>
        <div
          class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row"
        >
          <div part="message" class="text-center text-sm font-medium sm:text-left">
            <slot></slot>
          </div>
          <div part="actions" class="flex shrink-0 items-center gap-2 empty:hidden">
            <slot name="actions"></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-banner-section': TwipBannerSection;
  }
}
