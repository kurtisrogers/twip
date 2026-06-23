import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipToastTone = 'info' | 'success' | 'warning' | 'danger';

const TONE: Record<TwipToastTone, { ring: string; icon: string; iconBg: string }> = {
  info: { ring: 'ring-blue-200', icon: 'text-blue-500', iconBg: 'bg-blue-50' },
  success: { ring: 'ring-green-200', icon: 'text-green-500', iconBg: 'bg-green-50' },
  warning: { ring: 'ring-yellow-200', icon: 'text-yellow-500', iconBg: 'bg-yellow-50' },
  danger: { ring: 'ring-red-200', icon: 'text-red-500', iconBg: 'bg-red-50' },
};

const ICONS: Record<TwipToastTone, TemplateResult> = {
  info: html`<svg
    viewBox="0 0 20 20"
    fill="currentColor"
    class="h-5 w-5"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clip-rule="evenodd"
    />
  </svg>`,
  success: html`<svg
    viewBox="0 0 20 20"
    fill="currentColor"
    class="h-5 w-5"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clip-rule="evenodd"
    />
  </svg>`,
  warning: html`<svg
    viewBox="0 0 20 20"
    fill="currentColor"
    class="h-5 w-5"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
      clip-rule="evenodd"
    />
  </svg>`,
  danger: html`<svg
    viewBox="0 0 20 20"
    fill="currentColor"
    class="h-5 w-5"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
      clip-rule="evenodd"
    />
  </svg>`,
};

function toneStyle(tone: TwipToastTone): { ring: string; icon: string; iconBg: string } {
  switch (tone) {
    case 'info':
    case 'success':
    case 'warning':
    case 'danger':
      return TONE[tone];
    default: {
      const _exhaustive: never = tone;
      return _exhaustive;
    }
  }
}

function toneIcon(tone: TwipToastTone): TemplateResult {
  switch (tone) {
    case 'info':
    case 'success':
    case 'warning':
    case 'danger':
      return ICONS[tone];
    default: {
      const _exhaustive: never = tone;
      return _exhaustive;
    }
  }
}

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * A single toast notification card. Self-dismisses after `duration`
 * milliseconds unless `duration` is 0.
 *
 * @element twip-toast
 *
 * @fires twip-toast-dismiss - Fires when the toast is removed.
 */
export class TwipToast extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String, reflect: true })
  tone: TwipToastTone = 'info';

  @property({ type: String })
  heading: string | null = null;

  @property({ type: String })
  description: string | null = null;

  @property({ type: Number })
  duration = 5000;

  @property({ type: Boolean, reflect: true })
  dismissible = true;

  private timer: ReturnType<typeof setTimeout> | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.duration > 0) {
      this.timer = setTimeout(() => this.dismiss(), this.duration);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.timer) clearTimeout(this.timer);
  }

  dismiss(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.dispatchEvent(
      new CustomEvent('twip-toast-dismiss', { bubbles: true, composed: true }),
    );
    this.remove();
  }

  override render(): TemplateResult {
    const tone = toneStyle(this.tone);
    return html`
      <div
        part="toast"
        role="status"
        aria-live="polite"
        class=${cx(
          'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg bg-white p-4 shadow-lg ring-1',
          tone.ring,
        )}
      >
        <div
          class=${cx(
            'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
            tone.iconBg,
            tone.icon,
          )}
        >
          ${toneIcon(this.tone)}
        </div>
        <div class="min-w-0 flex-1 text-sm">
          ${this.heading
            ? html`<div class="font-semibold text-gray-900">${this.heading}</div>`
            : nothing}
          ${this.description
            ? html`<div class=${this.heading ? 'mt-0.5 text-gray-600' : 'text-gray-900'}>
                ${this.description}
              </div>`
            : html`<div class=${this.heading ? 'mt-0.5 text-gray-600' : 'text-gray-900'}>
                <slot></slot>
              </div>`}
        </div>
        ${this.dismissible
          ? html`<button
              type="button"
              class="shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              aria-label="Dismiss"
              @click=${() => this.dismiss()}
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                />
              </svg>
            </button>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-toast': TwipToast;
  }
  interface HTMLElementEventMap {
    'twip-toast-dismiss': CustomEvent<void>;
  }
}
