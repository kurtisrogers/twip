import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipRatingSize = 'sm' | 'md' | 'lg';

const ICON_SIZE: Record<TwipRatingSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

const localStyles = css`
  :host {
    display: inline-flex;
  }
`;

const STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.783.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.072 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z';

/**
 * Star rating. Read-only by default; set `interactive` to enable click /
 * keyboard selection. Supports half-star granularity via `step=0.5`.
 *
 * @element twip-rating
 *
 * @fires twip-rating-change - Detail: `{ value: number }`.
 */
export class TwipRating extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  max = 5;

  @property({ type: Number })
  step = 1;

  @property({ type: String, reflect: true })
  size: TwipRatingSize = 'md';

  @property({ type: Boolean, reflect: true })
  interactive = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  label: string | null = null;

  @state()
  private hovered: number | null = null;

  private setValue(next: number): void {
    if (!this.interactive || this.disabled) return;
    const clamped = Math.max(0, Math.min(this.max, next));
    if (clamped === this.value) return;
    this.value = clamped;
    this.dispatchEvent(
      new CustomEvent('twip-rating-change', {
        detail: { value: clamped },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private onKeydown = (event: KeyboardEvent): void => {
    if (!this.interactive || this.disabled) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.setValue(this.value + this.step);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.setValue(this.value - this.step);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.setValue(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.setValue(this.max);
    }
  };

  private fillFor(index: number): 'full' | 'half' | 'empty' {
    const current = this.hovered ?? this.value;
    if (current >= index + 1) return 'full';
    if (current >= index + 0.5 && this.step <= 0.5) return 'half';
    return 'empty';
  }

  private renderStar(index: number): TemplateResult {
    const fill = this.fillFor(index);
    const baseClass = cx('block', ICON_SIZE[this.size]);
    const wrapClass = cx('relative inline-block', {
      'cursor-pointer': this.interactive && !this.disabled,
      'cursor-not-allowed': this.disabled,
    });
    return html`
      <span
        class=${wrapClass}
        @mousemove=${(event: MouseEvent) => this.onStarHover(event, index)}
        @mouseleave=${() => (this.hovered = null)}
        @click=${(event: MouseEvent) => this.onStarClick(event, index)}
      >
        <svg viewBox="0 0 20 20" class=${cx(baseClass, 'text-gray-200')} aria-hidden="true">
          <path fill="currentColor" d=${STAR_PATH} />
        </svg>
        ${fill !== 'empty'
          ? html`<svg
              viewBox="0 0 20 20"
              class=${cx(baseClass, 'absolute inset-0 text-yellow-400 overflow-hidden')}
              style=${fill === 'half' ? 'clip-path: inset(0 50% 0 0)' : ''}
              aria-hidden="true"
            >
              <path fill="currentColor" d=${STAR_PATH} />
            </svg>`
          : ''}
      </span>
    `;
  }

  private onStarHover(event: MouseEvent, index: number): void {
    if (!this.interactive || this.disabled) return;
    const half = this.step <= 0.5 && this.starIsLeftHalf(event);
    this.hovered = index + (half ? 0.5 : 1);
  }

  private onStarClick(event: MouseEvent, index: number): void {
    if (!this.interactive || this.disabled) return;
    const half = this.step <= 0.5 && this.starIsLeftHalf(event);
    this.setValue(index + (half ? 0.5 : 1));
  }

  private starIsLeftHalf(event: MouseEvent): boolean {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    return event.clientX - rect.left < rect.width / 2;
  }

  override render(): TemplateResult {
    return html`
      <span
        part="rating"
        class="inline-flex items-center gap-0.5"
        role=${this.interactive ? 'slider' : 'img'}
        aria-label=${this.label ?? `${this.value} out of ${this.max} stars`}
        aria-valuemin=${this.interactive ? '0' : ''}
        aria-valuemax=${this.interactive ? String(this.max) : ''}
        aria-valuenow=${this.interactive ? String(this.value) : ''}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        tabindex=${this.interactive && !this.disabled ? '0' : '-1'}
        @keydown=${this.onKeydown}
      >
        ${Array.from({ length: this.max }).map((_, i) => this.renderStar(i))}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-rating': TwipRating;
  }
  interface HTMLElementEventMap {
    'twip-rating-change': CustomEvent<{ value: number }>;
  }
}
