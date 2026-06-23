import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'search'
  | 'tel'
  | 'url'
  | 'date'
  | 'datetime-local'
  | 'time';

export type TwipInputSize = 'sm' | 'md' | 'lg';

const SIZE: Record<TwipInputSize, string> = {
  sm: 'px-2.5 py-1 text-sm',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-3.5 py-2 text-base',
};

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Text input with label, help text, error state, and form association.
 *
 * @element twip-input
 *
 * @fires twip-input - Fires on every value change with `{ value }` in detail.
 * @fires twip-change - Fires on commit (blur or Enter) with `{ value }`.
 */
export class TwipInput extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  static formAssociated = true;

  @property({ type: String, reflect: true })
  type: TwipInputType = 'text';

  @property({ type: String, reflect: true })
  size: TwipInputSize = 'md';

  @property({ type: String })
  value = '';

  @property({ type: String })
  name = '';

  @property({ type: String })
  label: string | null = null;

  @property({ type: String, attribute: 'help-text' })
  helpText: string | null = null;

  @property({ type: String, attribute: 'error-text' })
  errorText: string | null = null;

  @property({ type: String })
  placeholder: string | null = null;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String })
  autocomplete: string | null = null;

  @state()
  private _id = `twip-input-${Math.random().toString(36).slice(2, 9)}`;

  private internals: ElementInternals | null = null;

  constructor() {
    super();
    if ('attachInternals' in this) {
      this.internals = this.attachInternals();
    }
  }

  override updated(changed: Map<string, unknown>): void {
    if (!changed.has('value') || !this.internals) return;
    if (typeof this.internals.setFormValue === 'function') {
      this.internals.setFormValue(this.value);
    }
  }

  private onInput = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('twip-input-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private onChange = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('twip-input-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  };

  override render(): TemplateResult {
    const invalid = this.errorText != null && this.errorText.length > 0;
    const inputClass = cx(
      'block w-full rounded-md border-0 bg-white text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200',
      invalid
        ? 'ring-red-300 focus:ring-red-500 text-red-900 placeholder:text-red-300'
        : 'ring-gray-300',
      SIZE[this.size],
    );
    const describedBy = [
      this.helpText ? `${this._id}-help` : null,
      invalid ? `${this._id}-error` : null,
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      ${this.label
        ? html`<label
            for=${this._id}
            class="mb-1.5 block text-sm font-medium text-gray-900"
          >
            ${this.label}${this.required
              ? html`<span aria-hidden="true" class="ml-0.5 text-red-500">*</span>`
              : nothing}
          </label>`
        : nothing}
      <div class="relative">
        <slot name="start"></slot>
        <input
          id="${this._id}"
          part="input"
          class="${inputClass}"
          .value="${this.value}"
          type="${this.type}"
          name="${this.name || nothing}"
          placeholder="${this.placeholder ?? nothing}"
          ?disabled="${this.disabled}"
          ?readonly="${this.readonly}"
          ?required="${this.required}"
          autocomplete="${this.autocomplete ?? nothing}"
          aria-invalid="${invalid ? 'true' : 'false'}"
          aria-describedby="${describedBy || nothing}"
          @input="${this.onInput}"
          @change="${this.onChange}"
        />
        <slot name="end"></slot>
      </div>
      ${invalid
        ? html`<p id="${this._id}-error" class="mt-1.5 text-xs text-red-600">
            ${this.errorText}
          </p>`
        : this.helpText
          ? html`<p id="${this._id}-help" class="mt-1.5 text-xs text-gray-500">
              ${this.helpText}
            </p>`
          : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-input': TwipInput;
  }
  interface HTMLElementEventMap {
    'twip-input-input': CustomEvent<{ value: string }>;
    'twip-input-change': CustomEvent<{ value: string }>;
  }
}
