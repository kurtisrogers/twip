import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipSwitchSize = 'sm' | 'md' | 'lg';

const TRACK_SIZE: Record<TwipSwitchSize, string> = {
  sm: 'h-4 w-7',
  md: 'h-5 w-9',
  lg: 'h-6 w-11',
};

const THUMB_SIZE: Record<TwipSwitchSize, string> = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

const TRANSLATE: Record<TwipSwitchSize, string> = {
  sm: 'translate-x-3',
  md: 'translate-x-4',
  lg: 'translate-x-5',
};

const localStyles = css`
  :host {
    display: inline-flex;
  }
`;

/**
 * Accessible toggle switch.
 *
 * @element twip-switch
 *
 * @fires twip-switch-change - Fires when the checked state changes.
 *                             Detail: `{ checked: boolean }`.
 */
export class TwipSwitch extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  static formAssociated = true;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  name = '';

  @property({ type: String })
  value = 'on';

  @property({ type: String, reflect: true })
  size: TwipSwitchSize = 'md';

  @property({ type: String })
  label: string | null = null;

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
    this.dispatchEvent(
      new CustomEvent('twip-switch-change', {
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
    const trackClass = cx(
      'relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
      TRACK_SIZE[this.size],
      this.disabled
        ? 'bg-gray-100 cursor-not-allowed'
        : this.checked
          ? 'bg-brand-600'
          : 'bg-gray-200',
    );
    const thumbClass = cx(
      'inline-block transform rounded-full bg-white shadow ring-0 transition-transform',
      THUMB_SIZE[this.size],
      this.checked ? TRANSLATE[this.size] : 'translate-x-0.5',
    );
    return html`
      <label class="inline-flex items-center gap-3">
        <button
          part="track"
          role="switch"
          type="button"
          aria-checked=${this.checked ? 'true' : 'false'}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          ?disabled=${this.disabled}
          class=${trackClass}
          @click=${this.toggle}
          @keydown=${this.onKeydown}
        >
          <span class=${thumbClass}></span>
        </button>
        ${this.label
          ? html`<span class="text-sm text-gray-900">${this.label}</span>`
          : html`<slot></slot>`}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-switch': TwipSwitch;
  }
  interface HTMLElementEventMap {
    'twip-switch-change': CustomEvent<{ checked: boolean }>;
  }
}
