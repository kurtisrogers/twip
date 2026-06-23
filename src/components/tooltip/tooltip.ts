import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipTooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

const PLACEMENT: Record<TwipTooltipPlacement, string> = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
};

const localStyles = css`
  :host {
    position: relative;
    display: inline-block;
  }
`;

/**
 * Simple, accessible tooltip activated on focus/hover of the slotted child.
 *
 * @element twip-tooltip
 *
 * @slot - The interactive element the tooltip describes.
 *         Accessibility tip: prefer an element that already takes focus
 *         (button, link, input) so keyboard users can trigger the tooltip.
 */
export class TwipTooltip extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String })
  content = '';

  @property({ type: String, reflect: true })
  placement: TwipTooltipPlacement = 'top';

  @property({ type: Number, attribute: 'open-delay' })
  openDelay = 100;

  @property({ type: Number, attribute: 'close-delay' })
  closeDelay = 50;

  @state()
  private visible = false;

  private openTimer: ReturnType<typeof setTimeout> | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly tooltipId = `twip-tooltip-${Math.random().toString(36).slice(2, 9)}`;

  private clearTimers(): void {
    if (this.openTimer) clearTimeout(this.openTimer);
    if (this.closeTimer) clearTimeout(this.closeTimer);
    this.openTimer = null;
    this.closeTimer = null;
  }

  private scheduleShow = (): void => {
    this.clearTimers();
    this.openTimer = setTimeout(() => {
      this.visible = true;
    }, this.openDelay);
  };

  private scheduleHide = (): void => {
    this.clearTimers();
    this.closeTimer = setTimeout(() => {
      this.visible = false;
    }, this.closeDelay);
  };

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearTimers();
  }

  override render(): TemplateResult {
    const bubbleClass = cx(
      'absolute z-30 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow-lg pointer-events-none transition-opacity',
      this.visible ? 'opacity-100' : 'opacity-0',
      PLACEMENT[this.placement],
    );
    return html`
      <span
        class="inline-block"
        aria-describedby=${this.tooltipId}
        @mouseenter=${this.scheduleShow}
        @mouseleave=${this.scheduleHide}
        @focusin=${this.scheduleShow}
        @focusout=${this.scheduleHide}
      >
        <slot></slot>
      </span>
      <span
        id=${this.tooltipId}
        role="tooltip"
        class=${bubbleClass}
        ?hidden=${!this.visible && !this.content}
      >
        ${this.content || nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-tooltip': TwipTooltip;
  }
}
