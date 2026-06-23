import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipTabsVariant = 'underline' | 'pill' | 'segmented';

const localStyles = css`
  :host {
    display: block;
  }
`;

interface TabDescriptor {
  id: string;
  label: string;
  disabled: boolean;
  panelId?: string;
}

/**
 * Tabs with three visual variants.
 *
 * Tabs are declared as light-DOM children with the `tab` slot, each
 * being an element with `data-tab-id` and a `label` attribute or text.
 * Panels share the `data-tab-id` so the component can show/hide them.
 *
 * @element twip-tabs
 *
 * @slot - Tab panels. Each panel must carry `data-tab-id` matching its tab id.
 * @slot tabs - Tab triggers. Each must declare `data-tab-id` and `label`.
 *
 * @fires twip-change - Fires when the active tab changes. Detail: `{ tabId }`.
 */
export class TwipTabs extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String, reflect: true })
  variant: TwipTabsVariant = 'underline';

  @property({ type: String, reflect: true })
  value: string | null = null;

  @state()
  private tabs: TabDescriptor[] = [];

  override connectedCallback(): void {
    super.connectedCallback();
    this.collectTabs();
  }

  private onTabSlotChange = (): void => {
    this.collectTabs();
  };

  private onPanelSlotChange = (): void => {
    this.syncPanels();
  };

  private collectTabs(): void {
    const slot = this.shadowRoot?.querySelector(
      'slot[name="tabs"]',
    ) as HTMLSlotElement | null;
    if (!slot) return;
    const elements = slot.assignedElements({ flatten: true });
    this.tabs = elements.map((el) => ({
      id: el.getAttribute('data-tab-id') ?? '',
      label: el.getAttribute('label') ?? el.textContent?.trim() ?? '',
      disabled: el.hasAttribute('disabled'),
    }));
    if (!this.value && this.tabs.length > 0) {
      const firstEnabled = this.tabs.find((t) => !t.disabled);
      if (firstEnabled) this.value = firstEnabled.id;
    }
    this.syncPanels();
  }

  private syncPanels(): void {
    const slot = this.shadowRoot?.querySelector(
      'slot:not([name])',
    ) as HTMLSlotElement | null;
    if (!slot) return;
    const panels = slot.assignedElements({ flatten: true });
    for (const panel of panels) {
      const id = panel.getAttribute('data-tab-id');
      const active = id != null && id === this.value;
      panel.toggleAttribute('hidden', !active);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', active ? '0' : '-1');
    }
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value')) {
      this.syncPanels();
    }
  }

  private select(tab: TabDescriptor): void {
    if (tab.disabled || tab.id === this.value) return;
    this.value = tab.id;
    this.dispatchEvent(
      new CustomEvent('twip-tab-change', {
        detail: { tabId: tab.id },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private onKeydown = (event: KeyboardEvent): void => {
    const items = this.tabs.filter((t) => !t.disabled);
    if (items.length === 0) return;
    const currentIndex = items.findIndex((t) => t.id === this.value);
    switch (event.key) {
      case 'ArrowRight': {
        event.preventDefault();
        const next = items[(currentIndex + 1) % items.length];
        if (next) this.select(next);
        return;
      }
      case 'ArrowLeft': {
        event.preventDefault();
        const prev = items[(currentIndex - 1 + items.length) % items.length];
        if (prev) this.select(prev);
        return;
      }
      case 'Home': {
        event.preventDefault();
        const first = items[0];
        if (first) this.select(first);
        return;
      }
      case 'End': {
        event.preventDefault();
        const last = items[items.length - 1];
        if (last) this.select(last);
        return;
      }
      default:
        return;
    }
  };

  private renderTab(tab: TabDescriptor): TemplateResult {
    const isActive = tab.id === this.value;
    const baseClass =
      'inline-flex items-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600';
    const variantClass = this.computeVariantClass(isActive, tab.disabled);
    return html`
      <button
        role="tab"
        type="button"
        id=${`tab-${tab.id}`}
        aria-selected=${isActive ? 'true' : 'false'}
        aria-controls=${`panel-${tab.id}`}
        tabindex=${isActive ? '0' : '-1'}
        ?disabled=${tab.disabled}
        class=${cx(baseClass, variantClass)}
        @click=${() => this.select(tab)}
      >
        ${tab.label}
      </button>
    `;
  }

  private computeVariantClass(active: boolean, disabled: boolean): string {
    if (disabled) return 'px-3 py-2 text-sm text-gray-300 cursor-not-allowed';
    switch (this.variant) {
      case 'underline':
        return active
          ? 'px-3 py-2 text-sm border-b-2 border-brand-600 text-brand-700'
          : 'px-3 py-2 text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
      case 'pill':
        return active
          ? 'px-3 py-1.5 text-sm rounded-full bg-brand-50 text-brand-700'
          : 'px-3 py-1.5 text-sm rounded-full text-gray-500 hover:text-gray-700';
      case 'segmented':
        return active
          ? 'px-3 py-1.5 text-sm bg-white text-gray-900 shadow-sm rounded-md'
          : 'px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 rounded-md';
      default: {
        const _exhaustive: never = this.variant;
        return _exhaustive;
      }
    }
  }

  override render(): TemplateResult {
    const listClass = cx('flex items-center', {
      'gap-2 border-b border-gray-200': this.variant === 'underline',
      'gap-1': this.variant === 'pill',
      'gap-0 p-1 bg-gray-100 rounded-lg inline-flex': this.variant === 'segmented',
    });
    return html`
      <div role="tablist" class=${listClass} @keydown=${this.onKeydown} part="tablist">
        ${this.tabs.map((tab) => this.renderTab(tab))}
      </div>
      <slot name="tabs" hidden @slotchange=${this.onTabSlotChange}></slot>
      <div class="mt-4">
        <slot @slotchange=${this.onPanelSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-tabs': TwipTabs;
  }
  interface HTMLElementEventMap {
    'twip-tab-change': CustomEvent<{ tabId: string }>;
  }
}
