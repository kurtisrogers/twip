import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const SIZE: Record<TwipModalSize, string> = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
  xl: 'sm:max-w-4xl',
  full: 'sm:max-w-none sm:m-4',
};

/**
 * Local styles layered on top of Tailwind.
 *
 * The native <dialog> element lives in the top layer, so we don't need
 * fixed positioning on the host. We do, however, reset the browser's
 * default dialog styling (which adds intrinsic sizing and borders) so
 * Tailwind utilities can take over completely.
 */
const localStyles = css`
  :host {
    display: contents;
  }

  dialog {
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    max-height: 100dvh;
    max-width: 100vw;
    overflow: visible;
  }

  dialog::backdrop {
    background-color: rgb(17 24 39 / 0.5);
  }

  dialog[open] {
    animation: twip-modal-in 150ms ease-out;
  }

  dialog[open]::backdrop {
    animation: twip-backdrop-in 150ms ease-out;
  }

  @keyframes twip-modal-in {
    from {
      opacity: 0;
      transform: translateY(8px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes twip-backdrop-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    dialog[open],
    dialog[open]::backdrop {
      animation: none;
    }
  }
`;

/**
 * Accessible modal dialog built on the native `<dialog>` element.
 *
 * Uses `dialog.showModal()` so the browser handles top-layer rendering,
 * focus management, the inert background, and Escape-to-close.
 *
 * @element twip-modal
 *
 * @slot - Dialog body content.
 * @slot title - Heading content for the dialog. Falls back to `heading` attribute.
 * @slot footer - Footer (action buttons).
 *
 * @csspart panel - The styled panel wrapper inside the dialog.
 * @csspart footer - The footer container.
 *
 * @fires twip-modal-open - Fired after the dialog is opened.
 * @fires twip-modal-close - Fired after the dialog is closed.
 */
export class TwipModal extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String, reflect: true })
  size: TwipModalSize = 'md';

  @property({ type: String, reflect: true })
  heading: string | null = null;

  @property({ type: Boolean, reflect: true, attribute: 'no-backdrop-close' })
  noBackdropClose = false;

  @property({ type: Boolean, reflect: true, attribute: 'no-escape-close' })
  noEscapeClose = false;

  @query('dialog')
  private dialogEl!: HTMLDialogElement;

  override updated(changed: Map<string, unknown>): void {
    if (!changed.has('open')) return;
    const dialog = this.dialogEl;
    if (!dialog) return;
    if (this.open && !dialog.open) {
      dialog.showModal();
    } else if (!this.open && dialog.open) {
      dialog.close();
    }
  }

  /**
   * The native `cancel` event fires on Escape. Re-route it through our
   * own `open` property so the state stays in sync, and let consumers
   * suppress it via `no-escape-close`.
   */
  private onCancel = (event: Event): void => {
    if (this.noEscapeClose) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    this.hide();
  };

  /**
   * Fires after the dialog closes for any reason (Escape, close()
   * call, form submission with method="dialog", etc.). We sync state
   * and dispatch the public event here so a single code path covers
   * every close trigger.
   */
  private onClose = (): void => {
    if (this.open) {
      this.open = false;
    }
    this.dispatchEvent(
      new CustomEvent('twip-modal-close', { bubbles: true, composed: true }),
    );
  };

  /**
   * Backdrop click detection. With native <dialog> the backdrop is the
   * `::backdrop` pseudo, but click events fire on the <dialog> itself
   * when the user clicks outside the panel. We detect that by checking
   * whether the click target is the dialog element rather than the
   * inner panel.
   */
  private onDialogClick = (event: MouseEvent): void => {
    if (this.noBackdropClose) return;
    if (event.target === this.dialogEl) {
      this.hide();
    }
  };

  /**
   * Programmatic show. Prefer this over toggling `open` from imperative
   * code; it guarantees the dialog opens even if a previous render hasn't
   * synced state yet.
   */
  show(): void {
    this.open = true;
    this.dispatchEvent(
      new CustomEvent('twip-modal-open', { bubbles: true, composed: true }),
    );
  }

  hide(): void {
    this.open = false;
  }

  override render(): TemplateResult {
    const panelClass = cx(
      'relative w-full bg-white text-left shadow-xl sm:my-8 sm:w-full sm:rounded-lg',
      SIZE[this.size],
    );
    return html`
      <dialog
        part="dialog"
        aria-labelledby=${this.heading ? 'twip-modal-title' : nothing}
        @cancel=${this.onCancel}
        @close=${this.onClose}
        @click=${this.onDialogClick}
      >
        <div class=${panelClass} part="panel">
          <div class="px-6 pt-6 pb-3 empty:hidden">
            ${this.heading
              ? html`<h2 id="twip-modal-title" class="text-lg font-semibold text-gray-900">
                  <slot name="title">${this.heading}</slot>
                </h2>`
              : html`<slot name="title"></slot>`}
          </div>
          <div class="px-6 pb-6 text-sm text-gray-600">
            <slot></slot>
          </div>
          <div
            class="flex flex-row-reverse gap-2 border-t border-gray-200 bg-gray-50 px-6 py-3 empty:hidden sm:rounded-b-lg"
            part="footer"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-modal': TwipModal;
  }
  interface HTMLElementEventMap {
    'twip-modal-open': CustomEvent<void>;
    'twip-modal-close': CustomEvent<void>;
  }
}
