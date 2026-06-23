import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipBadgeTone =
  | 'gray'
  | 'red'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink';

export type TwipBadgeVariant = 'soft' | 'solid' | 'outline';
export type TwipBadgeSize = 'sm' | 'md' | 'lg';

const SOFT: Record<TwipBadgeTone, string> = {
  gray: 'bg-gray-100 text-gray-700 ring-gray-200',
  red: 'bg-red-50 text-red-700 ring-red-200',
  yellow: 'bg-yellow-50 text-yellow-800 ring-yellow-200',
  green: 'bg-green-50 text-green-700 ring-green-200',
  blue: 'bg-blue-50 text-blue-700 ring-blue-200',
  indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  purple: 'bg-purple-50 text-purple-700 ring-purple-200',
  pink: 'bg-pink-50 text-pink-700 ring-pink-200',
};

const SOLID: Record<TwipBadgeTone, string> = {
  gray: 'bg-gray-600 text-white ring-gray-600',
  red: 'bg-red-600 text-white ring-red-600',
  yellow: 'bg-yellow-500 text-white ring-yellow-500',
  green: 'bg-green-600 text-white ring-green-600',
  blue: 'bg-blue-600 text-white ring-blue-600',
  indigo: 'bg-indigo-600 text-white ring-indigo-600',
  purple: 'bg-purple-600 text-white ring-purple-600',
  pink: 'bg-pink-600 text-white ring-pink-600',
};

const OUTLINE: Record<TwipBadgeTone, string> = {
  gray: 'text-gray-700 ring-gray-300',
  red: 'text-red-700 ring-red-300',
  yellow: 'text-yellow-800 ring-yellow-300',
  green: 'text-green-700 ring-green-300',
  blue: 'text-blue-700 ring-blue-300',
  indigo: 'text-indigo-700 ring-indigo-300',
  purple: 'text-purple-700 ring-purple-300',
  pink: 'text-pink-700 ring-pink-300',
};

const SIZE: Record<TwipBadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-1 text-xs',
  lg: 'px-2.5 py-1 text-sm',
};

function pickTone(variant: TwipBadgeVariant, tone: TwipBadgeTone): string {
  switch (variant) {
    case 'soft':
      return SOFT[tone];
    case 'solid':
      return SOLID[tone];
    case 'outline':
      return OUTLINE[tone];
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

const localStyles = css`
  :host {
    display: inline-flex;
  }
`;

/**
 * A small status descriptor pill.
 *
 * @element twip-badge
 * @slot - Badge label.
 * @slot start - Optional leading icon/dot.
 * @slot end - Optional trailing icon (e.g. remove button).
 */
export class TwipBadge extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String, reflect: true })
  tone: TwipBadgeTone = 'gray';

  @property({ type: String, reflect: true })
  variant: TwipBadgeVariant = 'soft';

  @property({ type: String, reflect: true })
  size: TwipBadgeSize = 'md';

  @property({ type: Boolean, reflect: true })
  rounded = false;

  override render(): TemplateResult {
    const classes = cx(
      'inline-flex items-center gap-1 font-medium ring-1 ring-inset',
      pickTone(this.variant, this.tone),
      SIZE[this.size],
      this.rounded ? 'rounded-full' : 'rounded-md',
    );
    return html`
      <span part="badge" class=${classes}>
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-badge': TwipBadge;
  }
}
