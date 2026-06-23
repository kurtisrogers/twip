import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';
import type { TwipRadio } from './radio.js';

export type TwipRadioGroupOrientation = 'vertical' | 'horizontal';

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Container that coordinates a set of `twip-radio` children: enforces
 * single-selection, manages keyboard navigation, and participates in
 * form submission via `ElementInternals`.
 *
 * @element twip-radio-group
 *
 * @fires twip-radio-group-change - Detail: `{ value: string }`.
 */
export class TwipRadioGroup extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  static formAssociated = true;

  @property({ type: String })
  value: string | null = null;

  @property({ type: String })
  name = '';

  @property({ type: String })
  label: string | null = null;

  @property({ type: String, reflect: true })
  orientation: TwipRadioGroupOrientation = 'vertical';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private internals: ElementInternals | null = null;

  constructor() {
    super();
    if ('attachInternals' in this) {
      this.internals = this.attachInternals();
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('twip-radio-select', this.onChildSelect as EventListener);
    this.addEventListener('keydown', this.onKeydown);
    queueMicrotask(() => this.syncChildren());
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('twip-radio-select', this.onChildSelect as EventListener);
    this.removeEventListener('keydown', this.onKeydown);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value')) {
      this.syncChildren();
      if (this.internals && typeof this.internals.setFormValue === 'function') {
        this.internals.setFormValue(this.value);
      }
    }
    if (changed.has('disabled')) {
      for (const child of this.radios()) {
        child.disabled = this.disabled || child.hasAttribute('data-own-disabled');
      }
    }
  }

  private radios(): TwipRadio[] {
    return Array.from(this.querySelectorAll('twip-radio')) as TwipRadio[];
  }

  private syncChildren(): void {
    for (const radio of this.radios()) {
      const matches = this.value != null && radio.value === this.value;
      if (radio.checked !== matches) {
        radio.checked = matches;
      }
    }
  }

  private onChildSelect = (event: CustomEvent<{ value: string }>): void => {
    event.stopPropagation();
    if (this.disabled) return;
    const next = event.detail.value;
    if (this.value === next) return;
    this.value = next;
    this.dispatchEvent(
      new CustomEvent('twip-radio-group-change', {
        detail: { value: next },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private onKeydown = (event: KeyboardEvent): void => {
    if (
      event.key !== 'ArrowDown' &&
      event.key !== 'ArrowUp' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight'
    ) {
      return;
    }
    const items = this.radios().filter((r) => !r.disabled);
    if (items.length === 0) return;
    const currentIndex = items.findIndex((r) => r.value === this.value);
    const isForward = event.key === 'ArrowDown' || event.key === 'ArrowRight';
    const delta = isForward ? 1 : -1;
    const nextIndex =
      currentIndex < 0
        ? isForward
          ? 0
          : items.length - 1
        : (currentIndex + delta + items.length) % items.length;
    const next = items[nextIndex];
    if (!next) return;
    event.preventDefault();
    next.checked = true;
    this.value = next.value;
    this.dispatchEvent(
      new CustomEvent('twip-radio-group-change', {
        detail: { value: next.value },
        bubbles: true,
        composed: true,
      }),
    );
    const button = next.shadowRoot?.querySelector('button');
    button?.focus();
  };

  override render(): TemplateResult {
    const listClass = cx('flex', {
      'flex-col gap-2': this.orientation === 'vertical',
      'flex-row flex-wrap gap-4': this.orientation === 'horizontal',
    });
    return html`
      <div role="radiogroup" aria-label=${this.label ?? ''} part="group">
        ${this.label
          ? html`<div class="mb-2 text-sm font-medium text-gray-900">${this.label}</div>`
          : ''}
        <div class=${listClass}>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-radio-group': TwipRadioGroup;
  }
  interface HTMLElementEventMap {
    'twip-radio-group-change': CustomEvent<{ value: string }>;
  }
}
