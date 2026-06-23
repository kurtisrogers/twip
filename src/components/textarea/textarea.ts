import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipTextareaSize = 'sm' | 'md' | 'lg';
export type TwipTextareaResize = 'none' | 'vertical' | 'horizontal' | 'both' | 'auto';

const SIZE: Record<TwipTextareaSize, string> = {
  sm: 'px-2.5 py-1 text-sm',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-3.5 py-2 text-base',
};

const RESIZE: Record<TwipTextareaResize, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
  auto: 'resize-none',
};

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Form-associated multiline text input with label, help, error, and an
 * optional `resize="auto"` mode that grows the textarea to fit content.
 *
 * @element twip-textarea
 *
 * @fires twip-textarea-input - Detail: `{ value: string }`.
 * @fires twip-textarea-change - Detail: `{ value: string }`.
 */
export class TwipTextarea extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  static formAssociated = true;

  @property({ type: String, reflect: true })
  size: TwipTextareaSize = 'md';

  @property({ type: String, reflect: true })
  resize: TwipTextareaResize = 'vertical';

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

  @property({ type: Number })
  rows = 4;

  @property({ type: Number, attribute: 'max-length' })
  maxLength: number | null = null;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @state()
  private _id = `twip-textarea-${Math.random().toString(36).slice(2, 9)}`;

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
    if (this.resize === 'auto') {
      this.autosize();
    }
  }

  private autosize(): void {
    const el = this.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement | null;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }

  private onInput = (event: Event): void => {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('twip-textarea-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private onChange = (event: Event): void => {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('twip-textarea-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  };

  override render(): TemplateResult {
    const invalid = this.errorText != null && this.errorText.length > 0;
    const taClass = cx(
      'block w-full rounded-md border-0 bg-white text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200',
      invalid ? 'ring-red-300 focus:ring-red-500 text-red-900' : 'ring-gray-300',
      SIZE[this.size],
      RESIZE[this.resize],
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
      <textarea
        id=${this._id}
        part="textarea"
        class=${taClass}
        rows=${this.rows}
        name=${this.name || nothing}
        placeholder=${this.placeholder ?? nothing}
        maxlength=${this.maxLength ?? nothing}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        aria-invalid=${invalid ? 'true' : 'false'}
        aria-describedby=${describedBy || nothing}
        .value=${this.value}
        @input=${this.onInput}
        @change=${this.onChange}
      ></textarea>
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
    'twip-textarea': TwipTextarea;
  }
  interface HTMLElementEventMap {
    'twip-textarea-input': CustomEvent<{ value: string }>;
    'twip-textarea-change': CustomEvent<{ value: string }>;
  }
}
