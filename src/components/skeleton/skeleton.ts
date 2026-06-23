import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipSkeletonShape = 'text' | 'rect' | 'circle';

const localStyles = css`
  :host {
    display: block;
  }
  @keyframes twip-skeleton-shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
  .shimmer {
    background-image: linear-gradient(
      90deg,
      rgb(229 231 235 / 1) 0%,
      rgb(243 244 246 / 1) 50%,
      rgb(229 231 235 / 1) 100%
    );
    background-size: 200% 100%;
    animation: twip-skeleton-shimmer 1.4s ease-in-out infinite;
  }
`;

/**
 * Animated placeholder used while content is loading.
 *
 * @element twip-skeleton
 */
export class TwipSkeleton extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String, reflect: true })
  shape: TwipSkeletonShape = 'text';

  @property({ type: String })
  width: string | null = null;

  @property({ type: String })
  height: string | null = null;

  @property({ type: Number })
  lines = 1;

  private styleFor(width: string | null, height: string | null): string {
    const parts: string[] = [];
    if (width) parts.push(`width: ${width}`);
    if (height) parts.push(`height: ${height}`);
    return parts.join('; ');
  }

  override render(): TemplateResult {
    if (this.shape === 'text' && this.lines > 1) {
      return html`
        <div class="flex flex-col gap-2">
          ${Array.from({ length: this.lines }).map((_, i) => {
            const isLast = i === this.lines - 1;
            return html`<div
              class="shimmer rounded h-3"
              style=${`width: ${isLast ? '70%' : '100%'}`}
              aria-hidden="true"
            ></div>`;
          })}
          <span class="sr-only">Loading…</span>
        </div>
      `;
    }
    const shapeClass = cx('shimmer', {
      'rounded h-3': this.shape === 'text',
      'rounded-md': this.shape === 'rect',
      'rounded-full': this.shape === 'circle',
    });
    const inline = this.styleFor(
      this.width ?? (this.shape === 'text' ? '100%' : null),
      this.height ?? (this.shape === 'circle' ? this.width : null),
    );
    return html`
      <div
        class=${shapeClass}
        style=${inline || nothing}
        aria-hidden="true"
        part="skeleton"
      ></div>
      <span class="sr-only">Loading…</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-skeleton': TwipSkeleton;
  }
}
