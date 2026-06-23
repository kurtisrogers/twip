import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';

export type TwipSliderSize = 'sm' | 'md' | 'lg';

const TRACK_HEIGHT: Record<TwipSliderSize, string> = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2',
};

const THUMB_SIZE: Record<TwipSliderSize, string> = {
  sm: 'h-3 w-3 -mt-1',
  md: 'h-4 w-4 -mt-[5px]',
  lg: 'h-5 w-5 -mt-1.5',
};

const localStyles = css`
  :host {
    display: block;
  }
  /* Style the native range input as a track + thumb. We hide the
     default appearance and overlay a Tailwind-styled track underneath. */
  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    background: transparent;
    position: relative;
    z-index: 1;
    margin: 0;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    height: 0;
  }
  input[type='range']::-moz-range-track {
    height: 0;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 9999px;
    background-color: white;
    border: 2px solid rgb(79 70 229);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }
  input[type='range']::-moz-range-thumb {
    border-radius: 9999px;
    background-color: white;
    border: 2px solid rgb(79 70 229);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }
  input[type='range']:focus-visible::-webkit-slider-thumb {
    outline: 2px solid rgb(79 70 229);
    outline-offset: 2px;
  }
  input[type='range']:focus-visible::-moz-range-thumb {
    outline: 2px solid rgb(79 70 229);
    outline-offset: 2px;
  }
  input[type='range']:disabled::-webkit-slider-thumb {
    border-color: rgb(209 213 219);
    cursor: not-allowed;
  }
  input[type='range']:disabled::-moz-range-thumb {
    border-color: rgb(209 213 219);
    cursor: not-allowed;
  }
  .thumb-sm::-webkit-slider-thumb {
    width: 0.75rem;
    height: 0.75rem;
  }
  .thumb-sm::-moz-range-thumb {
    width: 0.75rem;
    height: 0.75rem;
  }
  .thumb-md::-webkit-slider-thumb {
    width: 1rem;
    height: 1rem;
  }
  .thumb-md::-moz-range-thumb {
    width: 1rem;
    height: 1rem;
  }
  .thumb-lg::-webkit-slider-thumb {
    width: 1.25rem;
    height: 1.25rem;
  }
  .thumb-lg::-moz-range-thumb {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

/**
 * Single-value range slider.
 *
 * @element twip-slider
 *
 * @fires twip-slider-input - Detail: `{ value: number }`.
 * @fires twip-slider-change - Detail: `{ value: number }`.
 */
export class TwipSlider extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  static formAssociated = true;

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: Number })
  step = 1;

  @property({ type: String, reflect: true })
  size: TwipSliderSize = 'md';

  @property({ type: String })
  label: string | null = null;

  @property({ type: Boolean, attribute: 'show-value' })
  showValue = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  name = '';

  private internals: ElementInternals | null = null;

  constructor() {
    super();
    if ('attachInternals' in this) {
      this.internals = this.attachInternals();
    }
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value') && this.internals?.setFormValue) {
      this.internals.setFormValue(String(this.value));
    }
  }

  private clampedPct(): number {
    const range = this.max - this.min;
    if (range <= 0) return 0;
    return Math.max(0, Math.min(100, ((this.value - this.min) / range) * 100));
  }

  private onInput = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const next = Number(target.value);
    this.value = next;
    this.dispatchEvent(
      new CustomEvent('twip-slider-input', {
        detail: { value: next },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private onChange = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const next = Number(target.value);
    this.value = next;
    this.dispatchEvent(
      new CustomEvent('twip-slider-change', {
        detail: { value: next },
        bubbles: true,
        composed: true,
      }),
    );
  };

  override render(): TemplateResult {
    const pct = this.clampedPct();
    const trackHeight = TRACK_HEIGHT[this.size];
    const thumbClass = `thumb-${this.size}`;
    return html`
      ${this.label || this.showValue
        ? html`<div class="mb-1.5 flex items-center justify-between text-sm">
            <span class="font-medium text-gray-900">${this.label ?? ''}</span>
            ${this.showValue
              ? html`<span class="tabular-nums text-gray-500">${this.value}</span>`
              : nothing}
          </div>`
        : nothing}
      <div class="relative">
        <div
          class=${`absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 ${trackHeight}`}
          aria-hidden="true"
        ></div>
        <div
          class=${`absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-brand-600 ${trackHeight}`}
          style=${`width: ${pct}%`}
          aria-hidden="true"
        ></div>
        <input
          part="input"
          type="range"
          class=${`relative block w-full ${thumbClass} ${THUMB_SIZE[this.size]}`}
          .value=${String(this.value)}
          min=${this.min}
          max=${this.max}
          step=${this.step}
          name=${this.name || nothing}
          ?disabled=${this.disabled}
          aria-label=${this.label ?? nothing}
          @input=${this.onInput}
          @change=${this.onChange}
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-slider': TwipSlider;
  }
  interface HTMLElementEventMap {
    'twip-slider-input': CustomEvent<{ value: number }>;
    'twip-slider-change': CustomEvent<{ value: number }>;
  }
}
