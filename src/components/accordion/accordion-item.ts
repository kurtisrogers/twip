import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

const localStyles = css`
  :host {
    display: block;
  }
`;

let autoId = 0;

/**
 * A single accordion section with a clickable header and collapsible
 * body. Designed to be coordinated by an enclosing `twip-accordion`,
 * but works standalone too.
 *
 * @element twip-accordion-item
 *
 * @fires twip-accordion-item-toggle - Detail: `{ open: boolean; id: string }`.
 */
export class TwipAccordionItem extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String, attribute: 'item-id', reflect: true })
  itemId: string = `twip-accordion-item-${++autoId}`;

  @property({ type: String })
  heading: string | null = null;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private toggle(): void {
    if (this.disabled) return;
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('twip-accordion-item-toggle', {
        detail: { open: this.open, id: this.itemId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render(): TemplateResult {
    const triggerClass = cx(
      'flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
      this.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900 hover:bg-gray-50',
    );
    const iconClass = cx('h-4 w-4 transition-transform text-gray-400', {
      'rotate-180': this.open,
    });
    return html`
      <div part="item">
        <h3>
          <button
            type="button"
            class=${triggerClass}
            aria-expanded=${this.open ? 'true' : 'false'}
            aria-controls=${`${this.itemId}-panel`}
            id=${`${this.itemId}-header`}
            ?disabled=${this.disabled}
            @click=${this.toggle}
            part="trigger"
          >
            <span>${this.heading ?? html`<slot name="heading"></slot>`}</span>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              class=${iconClass}
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </h3>
        <div
          id=${`${this.itemId}-panel`}
          role="region"
          aria-labelledby=${`${this.itemId}-header`}
          ?hidden=${!this.open}
          class="px-4 pb-4 text-sm text-gray-600"
          part="panel"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-accordion-item': TwipAccordionItem;
  }
  interface HTMLElementEventMap {
    'twip-accordion-item-toggle': CustomEvent<{ open: boolean; id: string }>;
  }
}
