import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import type { TwipAccordionItem } from './accordion-item.js';

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Container that coordinates a set of `twip-accordion-item` children.
 * When `multiple` is false (the default) opening one item closes others.
 *
 * @element twip-accordion
 *
 * @fires twip-accordion-toggle - Detail: `{ openIds: string[] }` after a change.
 */
export class TwipAccordion extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: Boolean, reflect: true })
  multiple = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('twip-accordion-item-toggle', this.onItemToggle as EventListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(
      'twip-accordion-item-toggle',
      this.onItemToggle as EventListener,
    );
  }

  private items(): TwipAccordionItem[] {
    return Array.from(this.querySelectorAll('twip-accordion-item')) as TwipAccordionItem[];
  }

  private onItemToggle = (event: CustomEvent<{ open: boolean; id: string }>): void => {
    event.stopPropagation();
    if (!this.multiple && event.detail.open) {
      for (const item of this.items()) {
        if (item.itemId !== event.detail.id && item.open) {
          item.open = false;
        }
      }
    }
    const openIds = this.items()
      .filter((i) => i.open)
      .map((i) => i.itemId);
    this.dispatchEvent(
      new CustomEvent('twip-accordion-toggle', {
        detail: { openIds },
        bubbles: true,
        composed: true,
      }),
    );
  };

  override render(): TemplateResult {
    return html`
      <div class="divide-y divide-gray-200 rounded-md border border-gray-200 bg-white">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-accordion': TwipAccordion;
  }
  interface HTMLElementEventMap {
    'twip-accordion-toggle': CustomEvent<{ openIds: string[] }>;
  }
}
