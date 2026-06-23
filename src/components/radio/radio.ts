import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipRadioSize = 'sm' | 'md' | 'lg';

const OUTER: Record<TwipRadioSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

const INNER: Record<TwipRadioSize, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
};

const LABEL: Record<TwipRadioSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

function outerSize(size: TwipRadioSize): string {
  switch (size) {
    case 'sm':
    case 'md':
    case 'lg':
      return OUTER[size];
    default: {
      const _exhaustive: never = size;
      return _exhaustive;
    }
  }
}

function innerSize(size: TwipRadioSize): string {
  switch (size) {
    case 'sm':
    case 'md':
    case 'lg':
      return INNER[size];
    default: {
      const _exhaustive: never = size;
      return _exhaustive;
    }
  }
}

function labelSize(size: TwipRadioSize): string {
  switch (size) {
    case 'sm':
    case 'md':
    case 'lg':
      return LABEL[size];
    default: {
      const _exhaustive: never = size;
      return _exhaustive;
    }
  }
}

const localStyles = css`
  :host {
    display: inline-flex;
  }
`;

/**
 * A single radio option. Typically rendered inside `twip-radio-group`,
 * which owns the selected value and broadcasts changes.
 *
 * @element twip-radio
 *
 * @fires twip-radio-select - Detail: `{ value: string }` when this radio is selected.
 */
export class TwipRadio extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  size: TwipRadioSize = 'md';

  @property({ type: String })
  value = '';

  @property({ type: String })
  label: string | null = null;

  @property({ type: String, attribute: 'help-text' })
  helpText: string | null = null;

  private select(): void {
    if (this.disabled || this.checked) return;
    this.checked = true;
    this.dispatchEvent(
      new CustomEvent('twip-radio-select', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private onKeydown = (event: KeyboardEvent): void => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.select();
    }
  };

  override render(): TemplateResult {
    const outerClass = cx(
      'inline-flex shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
      outerSize(this.size),
      this.disabled
        ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
        : this.checked
          ? 'border-brand-600 bg-white cursor-pointer'
          : 'border-gray-300 bg-white hover:border-gray-400 cursor-pointer',
    );
    const innerClass = cx(
      'rounded-full',
      innerSize(this.size),
      this.checked ? 'bg-brand-600' : 'bg-transparent',
    );
    return html`
      <label class="inline-flex items-start gap-2">
        <button
          part="radio"
          role="radio"
          type="button"
          aria-checked=${this.checked ? 'true' : 'false'}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          ?disabled=${this.disabled}
          class=${outerClass}
          @click=${this.select}
          @keydown=${this.onKeydown}
        >
          <span class=${innerClass}></span>
        </button>
        ${this.label || this.helpText
          ? html`<span class="flex flex-col">
              ${this.label
                ? html`<span class=${cx('font-medium text-gray-900', labelSize(this.size))}>
                    ${this.label}
                  </span>`
                : nothing}
              ${this.helpText
                ? html`<span class="text-xs text-gray-500">${this.helpText}</span>`
                : nothing}
            </span>`
          : html`<slot></slot>`}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-radio': TwipRadio;
  }
  interface HTMLElementEventMap {
    'twip-radio-select': CustomEvent<{ value: string }>;
  }
}
