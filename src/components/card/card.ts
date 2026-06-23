import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipCardPadding = 'none' | 'sm' | 'md' | 'lg';
export type TwipCardElevation = 'none' | 'sm' | 'md' | 'lg';

const PADDING: Record<TwipCardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
};

const ELEVATION: Record<TwipCardElevation, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
};

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * A surface container with optional header and footer slots.
 *
 * @element twip-card
 * @slot - Card body content.
 * @slot header - Optional header content.
 * @slot footer - Optional footer content.
 */
export class TwipCard extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String, reflect: true })
  padding: TwipCardPadding = 'md';

  @property({ type: String, reflect: true })
  elevation: TwipCardElevation = 'sm';

  @property({ type: Boolean, reflect: true })
  bordered = true;

  override render(): TemplateResult {
    const padded = this.padding !== 'none' ? PADDING[this.padding] : '';
    const wrapClass = cx(
      'overflow-hidden rounded-lg bg-white',
      this.bordered && 'border border-gray-200',
      ELEVATION[this.elevation],
    );
    const headerClass = cx('border-b border-gray-200', padded);
    const bodyClass = padded;
    const footerClass = cx('border-t border-gray-200', padded);
    return html`
      <section part="card" class=${wrapClass}>
        <header class=${headerClass} part="header" ?hidden=${!this.hasSlot('header')}>
          <slot name="header" @slotchange=${this.handleSlotChange}></slot>
        </header>
        <div class=${bodyClass} part="body">
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
        <footer class=${footerClass} part="footer" ?hidden=${!this.hasSlot('footer')}>
          <slot name="footer" @slotchange=${this.handleSlotChange}></slot>
        </footer>
      </section>
    `;
  }

  private handleSlotChange = (): void => {
    this.requestUpdate();
  };

  private hasSlot(name: string): boolean {
    return Array.from(this.childNodes).some((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return (node as Element).getAttribute('slot') === name;
      }
      return false;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-card': TwipCard;
  }
}
