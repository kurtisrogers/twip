import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipKbdSize = 'sm' | 'md' | 'lg';

const SIZE: Record<TwipKbdSize, string> = {
  sm: 'h-5 min-w-5 px-1 text-[10px]',
  md: 'h-6 min-w-6 px-1.5 text-xs',
  lg: 'h-7 min-w-7 px-2 text-sm',
};

const localStyles = css`
  :host {
    display: inline-flex;
  }
`;

/**
 * Keyboard shortcut indicator. Pass a `keys` array for compound shortcuts
 * (rendered with `+` separators) or use the default slot for free-form
 * content.
 *
 * @element twip-kbd
 */
export class TwipKbd extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String, reflect: true })
  size: TwipKbdSize = 'md';

  @property({ attribute: false })
  keys: string[] | null = null;

  private renderKey(label: string): TemplateResult {
    const cls = cx(
      'inline-flex items-center justify-center rounded-md border border-gray-300 bg-gray-50 font-sans font-medium text-gray-700 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.05)]',
      SIZE[this.size],
    );
    return html`<kbd class=${cls} part="key">${label}</kbd>`;
  }

  override render(): TemplateResult {
    if (this.keys && this.keys.length > 0) {
      return html`
        <span class="inline-flex items-center gap-1">
          ${this.keys.map(
            (key, i) => html`
              ${i > 0 ? html`<span class="text-xs text-gray-400">+</span>` : ''}
              ${this.renderKey(key)}
            `,
          )}
        </span>
      `;
    }
    return html`
      <kbd
        part="key"
        class=${cx(
          'inline-flex items-center justify-center rounded-md border border-gray-300 bg-gray-50 font-sans font-medium text-gray-700 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.05)]',
          SIZE[this.size],
        )}
      >
        <slot></slot>
      </kbd>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-kbd': TwipKbd;
  }
}
