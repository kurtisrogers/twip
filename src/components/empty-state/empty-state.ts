import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Friendly placeholder shown when a collection or view is empty.
 *
 * @element twip-empty-state
 * @slot icon - Optional leading illustration / icon (defaults to a simple svg).
 * @slot - Description body.
 * @slot actions - Trailing action buttons.
 */
export class TwipEmptyState extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String })
  heading: string | null = null;

  @property({ type: String })
  description: string | null = null;

  override render(): TemplateResult {
    return html`
      <section
        part="empty"
        class="flex flex-col items-center rounded-lg border-2 border-dashed border-gray-200 bg-white p-8 text-center"
      >
        <div class="text-gray-400">
          <slot name="icon">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              class="h-12 w-12"
              aria-hidden="true"
              stroke="currentColor"
            >
              <path
                d="M8 14c0-2.2 1.8-4 4-4h24c2.2 0 4 1.8 4 4v20c0 2.2-1.8 4-4 4H12c-2.2 0-4-1.8-4-4V14z"
                stroke-width="2"
              />
              <path d="M8 22h32" stroke-width="2" />
            </svg>
          </slot>
        </div>
        ${this.heading
          ? html`<h3 class="mt-3 text-base font-semibold text-gray-900">
              ${this.heading}
            </h3>`
          : nothing}
        ${this.description
          ? html`<p class="mt-1 text-sm text-gray-500">${this.description}</p>`
          : html`<div class="mt-1 text-sm text-gray-500"><slot></slot></div>`}
        <div class="mt-4 flex flex-wrap items-center justify-center gap-2 empty:hidden">
          <slot name="actions"></slot>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-empty-state': TwipEmptyState;
  }
}
