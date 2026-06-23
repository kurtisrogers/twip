import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipSpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TwipSpinnerTone = 'brand' | 'gray' | 'white' | 'current';

const SIZE: Record<TwipSpinnerSize, string> = {
  xs: 'h-3 w-3 border-2',
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-7 w-7 border-[3px]',
  xl: 'h-10 w-10 border-4',
};

const TONE: Record<TwipSpinnerTone, string> = {
  brand: 'border-brand-200 border-t-brand-600',
  gray: 'border-gray-200 border-t-gray-600',
  white: 'border-white/30 border-t-white',
  current: 'border-current/20 border-t-current',
};

const localStyles = css`
  :host {
    display: inline-flex;
  }
  @keyframes twip-spin {
    to {
      transform: rotate(360deg);
    }
  }
  .ring {
    animation: twip-spin 0.75s linear infinite;
  }
`;

/**
 * Pure-CSS spinner.
 *
 * @element twip-spinner
 */
export class TwipSpinner extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String, reflect: true })
  size: TwipSpinnerSize = 'md';

  @property({ type: String, reflect: true })
  tone: TwipSpinnerTone = 'brand';

  @property({ type: String })
  label: string | null = null;

  override render(): TemplateResult {
    const cls = cx('ring inline-block rounded-full', SIZE[this.size], TONE[this.tone]);
    return html`
      <span
        part="spinner"
        class=${cls}
        role="status"
        aria-live="polite"
        aria-label=${this.label ?? 'Loading'}
      ></span>
      ${this.label ? html`<span class="sr-only">${this.label}</span>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-spinner': TwipSpinner;
  }
}
