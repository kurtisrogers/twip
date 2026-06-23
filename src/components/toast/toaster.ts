import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';
import type { TwipToast, TwipToastTone } from './toast.js';

export type TwipToasterPlacement =
  | 'top-start'
  | 'top-end'
  | 'top-center'
  | 'bottom-start'
  | 'bottom-end'
  | 'bottom-center';

const PLACEMENT: Record<TwipToasterPlacement, string> = {
  'top-start': 'top-4 left-4 items-start',
  'top-end': 'top-4 right-4 items-end',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-start': 'bottom-4 left-4 items-start',
  'bottom-end': 'bottom-4 right-4 items-end',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
};

const localStyles = css`
  :host {
    display: contents;
  }
`;

export interface TwipToastInit {
  tone?: TwipToastTone;
  heading?: string;
  description?: string;
  duration?: number;
  dismissible?: boolean;
}

/**
 * Fixed-positioned region that owns and stacks `twip-toast` notifications.
 *
 * Use the imperative `notify(...)` method to push toasts, or pass
 * existing `twip-toast` elements as light-DOM children.
 *
 * @element twip-toaster
 */
export class TwipToaster extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String, reflect: true })
  placement: TwipToasterPlacement = 'top-end';

  /**
   * Imperatively create and append a toast to this toaster. Returns the
   * created element so callers can hold a reference, e.g. to dismiss it
   * early.
   */
  notify(init: TwipToastInit): TwipToast {
    const toast = document.createElement('twip-toast') as TwipToast;
    if (init.tone) toast.tone = init.tone;
    if (init.heading) toast.heading = init.heading;
    if (init.description) toast.description = init.description;
    if (typeof init.duration === 'number') toast.duration = init.duration;
    if (typeof init.dismissible === 'boolean') toast.dismissible = init.dismissible;
    this.appendChild(toast);
    return toast;
  }

  override render(): TemplateResult {
    const wrapClass = cx(
      'pointer-events-none fixed z-50 flex flex-col gap-2',
      PLACEMENT[this.placement],
    );
    return html`
      <div class=${wrapClass} part="region" aria-live="polite" aria-atomic="false">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-toaster': TwipToaster;
  }
}
