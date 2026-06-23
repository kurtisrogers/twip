import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TwipAvatarShape = 'circle' | 'rounded' | 'square';

const SIZE: Record<TwipAvatarSize, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
};

const SHAPE: Record<TwipAvatarShape, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-md',
  square: 'rounded-none',
};

const localStyles = css`
  :host {
    display: inline-flex;
  }
`;

function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

/**
 * User avatar with image, initials fallback, and optional status dot.
 *
 * @element twip-avatar
 */
export class TwipAvatar extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String, reflect: true })
  size: TwipAvatarSize = 'md';

  @property({ type: String, reflect: true })
  shape: TwipAvatarShape = 'circle';

  @property({ type: String })
  src: string | null = null;

  @property({ type: String })
  alt = '';

  @property({ type: String })
  name: string | null = null;

  @property({ type: String, reflect: true })
  status: 'online' | 'offline' | 'busy' | 'away' | null = null;

  @state()
  private imageFailed = false;

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('src')) {
      this.imageFailed = false;
    }
  }

  override render(): TemplateResult {
    const wrapClass = cx(
      'relative inline-flex items-center justify-center overflow-hidden bg-gray-100 text-gray-600 select-none font-medium',
      SIZE[this.size],
      SHAPE[this.shape],
    );
    const showImage = this.src && !this.imageFailed;
    const initials = this.name ? deriveInitials(this.name) : '';
    return html`
      <span class=${wrapClass} part="avatar">
        ${showImage
          ? html`<img
              class="h-full w-full object-cover"
              src=${this.src!}
              alt=${this.alt}
              @error=${() => {
                this.imageFailed = true;
              }}
            />`
          : initials
            ? html`<span aria-hidden="true">${initials}</span>`
            : html`<svg viewBox="0 0 24 24" fill="currentColor" class="h-3/5 w-3/5">
                <path
                  d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.42 0-8 2.69-8 6v2h16v-2c0-3.31-3.58-6-8-6z"
                />
              </svg>`}
        ${this.status
          ? html`<span
              class=${cx('absolute right-0 bottom-0 block ring-2 ring-white rounded-full', {
                'h-2 w-2': this.size === 'xs' || this.size === 'sm',
                'h-2.5 w-2.5':
                  this.size === 'md' || this.size === 'lg' || this.size === 'xl',
                'bg-green-500': this.status === 'online',
                'bg-gray-400': this.status === 'offline',
                'bg-red-500': this.status === 'busy',
                'bg-yellow-500': this.status === 'away',
              })}
              aria-label=${this.status}
            ></span>`
          : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-avatar': TwipAvatar;
  }
}
