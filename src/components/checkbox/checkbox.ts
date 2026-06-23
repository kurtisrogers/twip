import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipCheckboxSize = 'sm' | 'md' | 'lg';

const BOX_SIZE: Record<TwipCheckboxSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

const ICON_SIZE: Record<TwipCheckboxSize, string> = {
  sm: 'h-2.5 w-2.5',
  md: 'h-3 w-3',
  lg: 'h-3.5 w-3.5',
};

const LABEL_SIZE: Record<TwipCheckboxSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

function sizeBox(size: TwipCheckboxSize): string {
  switch (size) {
    case 'sm':
    case 'md':
    case 'lg':
      return BOX_SIZE[size];
    default: {
      const _exhaustive: never = size;
      return _exhaustive;
    }
  }
}

function sizeIcon(size: TwipCheckboxSize): string {
  switch (size) {
    case 'sm':
    case 'md':
    case 'lg':
      return ICON_SIZE[size];
    default: {
      const _exhaustive: never = size;
      return _exhaustive;
    }
  }
}

function sizeLabel(size: TwipCheckboxSize): string {
  switch (size) {
    case 'sm':
    case 'md':
    case 'lg':
      return LABEL_SIZE[size];
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
 * Form-associated checkbox with checked / indeterminate states.
 *
 * @element twip-checkbox
 *
 * @fires twip-checkbox-change - Detail: `{ checked: boolean }`.
 */
export class TwipCheckbox extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  static formAssociated = true;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String })
  name = '';

  @property({ type: String })
  value = 'on';

  @property({ type: String, reflect: true })
  size: TwipCheckboxSize = 'md';

  @property({ type: String })
  label: string | null = null;

  @property({ type: String, attribute: 'help-text' })
  helpText: string | null = null;

  private internals: ElementInternals | null = null;

  constructor() {
    super();
    if ('attachInternals' in this) {
      this.internals = this.attachInternals();
    }
  }

  override updated(changed: Map<string, unknown>): void {
    if (!changed.has('checked') && !changed.has('value')) return;
    if (!this.internals || typeof this.internals.setFormValue !== 'function') return;
    this.internals.setFormValue(this.checked ? this.value : null);
  }

  private toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.indeterminate = false;
    this.dispatchEvent(
      new CustomEvent('twip-checkbox-change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private onKeydown = (event: KeyboardEvent): void => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  };

  override render(): TemplateResult {
    const checkedOrIndeterminate = this.checked || this.indeterminate;
    const boxClass = cx(
      'inline-flex shrink-0 items-center justify-center rounded border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
      sizeBox(this.size),
      this.disabled
        ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
        : checkedOrIndeterminate
          ? 'border-brand-600 bg-brand-600 text-white cursor-pointer'
          : 'border-gray-300 bg-white hover:border-gray-400 cursor-pointer',
    );
    const iconClass = cx('block', sizeIcon(this.size));
    return html`
      <label class="inline-flex items-start gap-2">
        <button
          part="box"
          role="checkbox"
          type="button"
          aria-checked=${this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false'}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          aria-required=${this.required ? 'true' : 'false'}
          ?disabled=${this.disabled}
          class=${boxClass}
          @click=${this.toggle}
          @keydown=${this.onKeydown}
        >
          ${this.indeterminate
            ? html`<svg
                class=${iconClass}
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3.5 8h9"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
              </svg>`
            : this.checked
              ? html`<svg
                  class=${iconClass}
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3.5 8.5l3 3 6-7"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>`
              : nothing}
        </button>
        ${this.label || this.helpText
          ? html`<span class="flex flex-col">
              ${this.label
                ? html`<span class=${cx('font-medium text-gray-900', sizeLabel(this.size))}>
                    ${this.label}${this.required
                      ? html`<span aria-hidden="true" class="ml-0.5 text-red-500">*</span>`
                      : nothing}
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
    'twip-checkbox': TwipCheckbox;
  }
  interface HTMLElementEventMap {
    'twip-checkbox-change': CustomEvent<{ checked: boolean }>;
  }
}
