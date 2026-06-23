import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipSelectSize = 'sm' | 'md' | 'lg';

export interface TwipSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

const SIZE: Record<TwipSelectSize, string> = {
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
 * Form-associated select control rendered as a styled native `<select>`.
 *
 * Options may be supplied either as `<option>` light-DOM children (which
 * are forwarded into the shadow `<select>`) or via the `options` property.
 *
 * @element twip-select
 *
 * @fires twip-select-change - Detail: `{ value: string }`.
 */
export class TwipSelect extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  static formAssociated = true;

  @property({ type: String, reflect: true })
  size: TwipSelectSize = 'md';

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
  required = false;

  @property({ attribute: false })
  options: TwipSelectOption[] = [];

  @state()
  private _id = `twip-select-${Math.random().toString(36).slice(2, 9)}`;

  private internals: ElementInternals | null = null;

  constructor() {
    super();
    if ('attachInternals' in this) {
      this.internals = this.attachInternals();
    }
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value') && this.internals?.setFormValue) {
      this.internals.setFormValue(this.value);
    }
  }

  private onChange = (event: Event): void => {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('twip-select-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  };

  override render(): TemplateResult {
    const invalid = this.errorText != null && this.errorText.length > 0;
    const selectClass = cx(
      'block w-full appearance-none rounded-md border-0 bg-white pr-8 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-brand-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200',
      invalid ? 'ring-red-300 focus:ring-red-500 text-red-900' : 'ring-gray-300',
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
        <select
          id=${this._id}
          part="select"
          class=${selectClass}
          name=${this.name || nothing}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-invalid=${invalid ? 'true' : 'false'}
          aria-describedby=${describedBy || nothing}
          .value=${this.value}
          @change=${this.onChange}
        >
          ${this.placeholder
            ? html`<option value="" disabled ?selected=${!this.value}>
                ${this.placeholder}
              </option>`
            : nothing}
          ${this.options.map(
            (opt) =>
              html`<option
                value=${opt.value}
                ?disabled=${opt.disabled === true}
                ?selected=${opt.value === this.value}
              >
                ${opt.label}
              </option>`,
          )}
          <slot></slot>
        </select>
        <span
          aria-hidden="true"
          class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
            <path
              fill-rule="evenodd"
              d="M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
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
    'twip-select': TwipSelect;
  }
  interface HTMLElementEventMap {
    'twip-select-change': CustomEvent<{ value: string }>;
  }
}
