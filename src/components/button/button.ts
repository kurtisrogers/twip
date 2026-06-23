import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipButtonVariant =
  | 'primary'
  | 'secondary'
  | 'soft'
  | 'outline'
  | 'ghost'
  | 'destructive';

export type TwipButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TwipButtonType = 'button' | 'submit' | 'reset';

const VARIANT_CLASSES: Record<TwipButtonVariant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-500 focus-visible:outline-brand-600 disabled:bg-brand-300',
  secondary:
    'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-brand-600 disabled:bg-gray-100 disabled:text-gray-400',
  soft: 'bg-brand-50 text-brand-700 hover:bg-brand-100 focus-visible:outline-brand-600 disabled:bg-brand-50 disabled:text-brand-300',
  outline:
    'bg-transparent text-brand-700 ring-1 ring-inset ring-brand-300 hover:bg-brand-50 focus-visible:outline-brand-600 disabled:text-brand-300',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:outline-brand-600 disabled:text-gray-300',
  destructive:
    'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600 disabled:bg-red-300',
};

const SIZE_CLASSES: Record<TwipButtonSize, string> = {
  xs: 'px-2 py-1 text-xs gap-1 rounded',
  sm: 'px-2.5 py-1.5 text-sm gap-1.5 rounded',
  md: 'px-3 py-2 text-sm gap-2 rounded-md',
  lg: 'px-3.5 py-2.5 text-sm gap-2 rounded-md',
  xl: 'px-4 py-3 text-base gap-2.5 rounded-md',
};

function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${String(value)}`);
}

function variantClass(variant: TwipButtonVariant): string {
  switch (variant) {
    case 'primary':
    case 'secondary':
    case 'soft':
    case 'outline':
    case 'ghost':
    case 'destructive':
      return VARIANT_CLASSES[variant];
    default:
      return assertNever(variant);
  }
}

function sizeClass(size: TwipButtonSize): string {
  switch (size) {
    case 'xs':
    case 'sm':
    case 'md':
    case 'lg':
    case 'xl':
      return SIZE_CLASSES[size];
    default:
      return assertNever(size);
  }
}

const localStyles = css`
  :host {
    display: inline-block;
  }
`;

/**
 * A Tailwind-styled button rendered as a custom element.
 *
 * @element twip-button
 *
 * @slot - Button label content.
 * @slot start - Optional content rendered before the label (e.g. icon).
 * @slot end - Optional content rendered after the label (e.g. icon).
 *
 * @csspart button - The internal native `<button>` element.
 *
 * @fires twip-click - Fired when the button is activated and not disabled.
 *                    Detail is the original `MouseEvent` or `KeyboardEvent`.
 */
export class TwipButton extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String, reflect: true })
  variant: TwipButtonVariant = 'primary';

  @property({ type: String, reflect: true })
  size: TwipButtonSize = 'md';

  @property({ type: String, reflect: true })
  type: TwipButtonType = 'button';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  @property({ type: String })
  href: string | null = null;

  @property({ type: String })
  target: string | null = null;

  @property({ type: String })
  rel: string | null = null;

  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel: string | null = null;

  private handleClick = (event: MouseEvent): void => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.dispatchEvent(
      new CustomEvent<MouseEvent>('twip-click', {
        detail: event,
        bubbles: true,
        composed: true,
      }),
    );
  };

  private renderSpinner(): TemplateResult {
    return html`
      <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
    `;
  }

  override render(): TemplateResult {
    const classes = cx(
      'inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed',
      variantClass(this.variant),
      sizeClass(this.size),
      { 'w-full': this.fullWidth },
    );
    const ariaLabel = this.ariaLabel ?? nothing;
    const ariaBusy = this.loading ? 'true' : nothing;
    const tabindex = this.disabled ? '-1' : '0';

    if (this.href) {
      return html`
        <a
          part="button"
          class=${classes}
          href=${this.disabled ? nothing : this.href}
          target=${this.target ?? nothing}
          rel=${this.rel ?? nothing}
          role="button"
          aria-disabled=${this.disabled ? 'true' : 'false'}
          aria-busy=${ariaBusy}
          aria-label=${ariaLabel}
          tabindex=${tabindex}
          @click=${this.handleClick}
        >
          ${this.loading ? this.renderSpinner() : html`<slot name="start"></slot>`}
          <slot></slot>
          <slot name="end"></slot>
        </a>
      `;
    }

    return html`
      <button
        part="button"
        class=${classes}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-busy=${ariaBusy}
        aria-label=${ariaLabel}
        @click=${this.handleClick}
      >
        ${this.loading ? this.renderSpinner() : html`<slot name="start"></slot>`}
        <slot></slot>
        <slot name="end"></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-button': TwipButton;
  }
  interface HTMLElementEventMap {
    'twip-click': CustomEvent<MouseEvent>;
  }
}
