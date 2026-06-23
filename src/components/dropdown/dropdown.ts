import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipDropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

const PLACEMENT: Record<TwipDropdownPlacement, string> = {
  'bottom-start': 'top-full left-0 mt-2 origin-top-left',
  'bottom-end': 'top-full right-0 mt-2 origin-top-right',
  'top-start': 'bottom-full left-0 mb-2 origin-bottom-left',
  'top-end': 'bottom-full right-0 mb-2 origin-bottom-right',
};

const localStyles = css`
  :host {
    position: relative;
    display: inline-block;
  }
`;

/**
 * A minimal dropdown / menu container.
 *
 * @element twip-dropdown
 * @slot trigger - The element that toggles the menu (e.g. a `twip-button`).
 * @slot - Menu items. Items with `role="menuitem"` participate in keyboard nav.
 *
 * @fires twip-dropdown-open - Fires when the menu opens.
 * @fires twip-dropdown-close - Fires when the menu closes.
 */
export class TwipDropdown extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String, reflect: true })
  placement: TwipDropdownPlacement = 'bottom-start';

  @property({ type: Boolean, reflect: true, attribute: 'no-outside-close' })
  noOutsideClose = false;

  @query('.menu')
  private menuEl!: HTMLElement | null;

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this.onDocumentClick, true);
    document.addEventListener('keydown', this.onDocumentKeydown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this.onDocumentClick, true);
    document.removeEventListener('keydown', this.onDocumentKeydown);
  }

  private onDocumentClick = (event: MouseEvent): void => {
    if (!this.open || this.noOutsideClose) return;
    const path = event.composedPath();
    if (!path.includes(this)) {
      this.hide();
    }
  };

  private onDocumentKeydown = (event: KeyboardEvent): void => {
    if (!this.open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      this.hide();
    }
  };

  private onTriggerClick = (): void => {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  };

  private onTriggerKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.show();
      queueMicrotask(() => this.focusFirstItem());
    }
  };

  private onMenuKeydown = (event: KeyboardEvent): void => {
    const items = this.queryItems();
    if (items.length === 0) return;
    const activeEl = this.shadowRoot?.activeElement as HTMLElement | null;
    const currentIndex = activeEl ? items.indexOf(activeEl) : -1;
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const next = items[(currentIndex + 1) % items.length];
        next?.focus();
        return;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prev = items[(currentIndex - 1 + items.length) % items.length];
        prev?.focus();
        return;
      }
      case 'Home': {
        event.preventDefault();
        items[0]?.focus();
        return;
      }
      case 'End': {
        event.preventDefault();
        items[items.length - 1]?.focus();
        return;
      }
      case 'Tab':
        this.hide();
        return;
      default:
        return;
    }
  };

  private queryItems(): HTMLElement[] {
    if (!this.menuEl) return [];
    const slot = this.menuEl.querySelector('slot:not([name])') as HTMLSlotElement | null;
    if (!slot) return [];
    return slot
      .assignedElements({ flatten: true })
      .flatMap((el) => {
        if (el.getAttribute('role') === 'menuitem') return [el as HTMLElement];
        return Array.from(el.querySelectorAll<HTMLElement>('[role="menuitem"]'));
      })
      .filter((el) => !el.hasAttribute('disabled'));
  }

  private focusFirstItem(): void {
    this.queryItems()[0]?.focus();
  }

  show(): void {
    if (this.open) return;
    this.open = true;
    this.dispatchEvent(
      new CustomEvent('twip-dropdown-open', { bubbles: true, composed: true }),
    );
  }

  hide(): void {
    if (!this.open) return;
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('twip-dropdown-close', { bubbles: true, composed: true }),
    );
  }

  override render(): TemplateResult {
    const menuClass = cx(
      'menu absolute z-20 min-w-[12rem] rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none transition transform',
      this.open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
      PLACEMENT[this.placement],
    );
    return html`
      <div
        class="inline-flex"
        @click=${this.onTriggerClick}
        @keydown=${this.onTriggerKeydown}
      >
        <slot name="trigger"></slot>
      </div>
      <div
        class=${menuClass}
        role="menu"
        aria-orientation="vertical"
        ?hidden=${!this.open}
        @keydown=${this.onMenuKeydown}
        part="menu"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-dropdown': TwipDropdown;
  }
  interface HTMLElementEventMap {
    'twip-dropdown-open': CustomEvent<void>;
    'twip-dropdown-close': CustomEvent<void>;
  }
}
