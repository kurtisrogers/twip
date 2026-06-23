import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipProgressTone = 'brand' | 'gray' | 'success' | 'warning' | 'danger';
export type TwipProgressSize = 'sm' | 'md' | 'lg';

const HEIGHT: Record<TwipProgressSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const FILL: Record<TwipProgressTone, string> = {
  brand: 'bg-brand-600',
  gray: 'bg-gray-500',
  success: 'bg-green-600',
  warning: 'bg-yellow-500',
  danger: 'bg-red-600',
};

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Linear progress bar. Renders as indeterminate when `value` is null.
 *
 * @element twip-progress
 */
export class TwipProgress extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: Number })
  value: number | null = null;

  @property({ type: Number })
  max = 100;

  @property({ type: String, reflect: true })
  tone: TwipProgressTone = 'brand';

  @property({ type: String, reflect: true })
  size: TwipProgressSize = 'md';

  @property({ type: String })
  label: string | null = null;

  @property({ type: Boolean, attribute: 'show-value' })
  showValue = false;

  override render(): TemplateResult {
    const indeterminate = this.value == null;
    const pct = indeterminate
      ? null
      : Math.max(0, Math.min(100, (this.value! / this.max) * 100));
    const trackClass = cx(
      'relative w-full overflow-hidden rounded-full bg-gray-200',
      HEIGHT[this.size],
    );
    const fillClass = cx('h-full rounded-full transition-all', FILL[this.tone], {
      'animate-pulse': indeterminate,
    });
    return html`
      ${this.label || this.showValue
        ? html`<div class="mb-1.5 flex items-center justify-between text-xs text-gray-600">
            <span>${this.label ?? ''}</span>
            ${this.showValue && !indeterminate
              ? html`<span>${Math.round(pct ?? 0)}%</span>`
              : nothing}
          </div>`
        : nothing}
      <div
        class=${trackClass}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${indeterminate ? nothing : (this.value ?? nothing)}
        aria-label=${this.label ?? nothing}
        part="track"
      >
        <div
          class=${fillClass}
          part="fill"
          style=${indeterminate ? 'width: 40%' : `width: ${pct}%`}
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-progress': TwipProgress;
  }
}
