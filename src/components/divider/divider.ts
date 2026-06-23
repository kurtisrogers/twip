import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipDividerOrientation = 'horizontal' | 'vertical';
export type TwipDividerStyle = 'solid' | 'dashed' | 'dotted';

const STYLE: Record<TwipDividerStyle, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

const localStyles = css`
  :host {
    display: block;
  }
  :host([orientation='vertical']) {
    display: inline-flex;
    align-self: stretch;
  }
`;

/**
 * Horizontal or vertical rule with optional inline label.
 *
 * @element twip-divider
 */
export class TwipDivider extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String, reflect: true })
  orientation: TwipDividerOrientation = 'horizontal';

  @property({ type: String, reflect: true, attribute: 'border-style' })
  borderStyle: TwipDividerStyle = 'solid';

  @property({ type: String })
  label: string | null = null;

  private renderHorizontal(): TemplateResult {
    if (this.label) {
      const lineClass = cx('flex-1 border-t border-gray-200', STYLE[this.borderStyle]);
      return html`
        <div class="flex items-center gap-3" role="separator" aria-orientation="horizontal">
          <span class=${lineClass}></span>
          <span class="text-xs font-medium uppercase tracking-wide text-gray-500"
            >${this.label}</span
          >
          <span class=${lineClass}></span>
        </div>
      `;
    }
    return html`
      <hr
        class=${cx('border-0 border-t border-gray-200', STYLE[this.borderStyle])}
        role="separator"
      />
    `;
  }

  private renderVertical(): TemplateResult {
    return html`
      <span
        role="separator"
        aria-orientation="vertical"
        class=${cx(
          'inline-block self-stretch border-l border-gray-200',
          STYLE[this.borderStyle],
        )}
      ></span>
    `;
  }

  override render(): TemplateResult {
    return this.orientation === 'vertical'
      ? this.renderVertical()
      : this.renderHorizontal();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-divider': TwipDivider;
  }
}
