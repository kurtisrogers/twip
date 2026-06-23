import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipPaginationSize = 'sm' | 'md' | 'lg';

const SIZE: Record<TwipPaginationSize, string> = {
  sm: 'h-7 min-w-7 px-2 text-xs',
  md: 'h-9 min-w-9 px-3 text-sm',
  lg: 'h-11 min-w-11 px-4 text-base',
};

const localStyles = css`
  :host {
    display: inline-block;
  }
`;

interface PageItem {
  kind: 'page' | 'ellipsis';
  value: number;
}

/**
 * Builds a compact page list of the form `1 … 4 5 6 … 20`, always
 * showing the first and last page plus a configurable window of
 * neighbors around the current page.
 */
function buildPageItems(current: number, total: number, siblingCount: number): PageItem[] {
  if (total <= 0) return [];
  const items: PageItem[] = [];
  const left = Math.max(2, current - siblingCount);
  const right = Math.min(total - 1, current + siblingCount);
  items.push({ kind: 'page', value: 1 });
  if (left > 2) {
    items.push({ kind: 'ellipsis', value: 0 });
  }
  for (let i = left; i <= right; i++) {
    items.push({ kind: 'page', value: i });
  }
  if (right < total - 1) {
    items.push({ kind: 'ellipsis', value: 0 });
  }
  if (total > 1) {
    items.push({ kind: 'page', value: total });
  }
  return items;
}

/**
 * Pagination control.
 *
 * @element twip-pagination
 *
 * @fires twip-pagination-change - Detail: `{ page: number }`.
 */
export class TwipPagination extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: Number })
  page = 1;

  @property({ type: Number, attribute: 'total-pages' })
  totalPages = 1;

  @property({ type: Number, attribute: 'sibling-count' })
  siblingCount = 1;

  @property({ type: String, reflect: true })
  size: TwipPaginationSize = 'md';

  @property({ type: Boolean, attribute: 'hide-edges' })
  hideEdges = false;

  private goto(page: number): void {
    const clamped = Math.max(1, Math.min(this.totalPages, page));
    if (clamped === this.page) return;
    this.page = clamped;
    this.dispatchEvent(
      new CustomEvent('twip-pagination-change', {
        detail: { page: clamped },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private renderArrow(direction: 'prev' | 'next', disabled: boolean): TemplateResult {
    const cls = cx(
      'inline-flex items-center justify-center rounded-md border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
      SIZE[this.size],
      disabled
        ? 'border-gray-200 text-gray-300 cursor-not-allowed'
        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
    );
    const path =
      direction === 'prev'
        ? 'M12.78 5.22a.75.75 0 010 1.06L9.06 10l3.72 3.72a.75.75 0 11-1.06 1.06l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z'
        : 'M7.22 14.78a.75.75 0 010-1.06L10.94 10 7.22 6.28a.75.75 0 111.06-1.06l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0z';
    return html`
      <button
        type="button"
        class=${cls}
        ?disabled=${disabled}
        aria-label=${direction === 'prev' ? 'Previous page' : 'Next page'}
        @click=${() => this.goto(direction === 'prev' ? this.page - 1 : this.page + 1)}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4" aria-hidden="true">
          <path fill-rule="evenodd" d=${path} clip-rule="evenodd" />
        </svg>
      </button>
    `;
  }

  private renderPage(value: number): TemplateResult {
    const active = value === this.page;
    const cls = cx(
      'inline-flex items-center justify-center rounded-md border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
      SIZE[this.size],
      active
        ? 'border-brand-600 bg-brand-600 text-white'
        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    );
    return html`
      <button
        type="button"
        class=${cls}
        aria-current=${active ? 'page' : 'false'}
        aria-label=${`Page ${value}`}
        @click=${() => this.goto(value)}
      >
        ${value}
      </button>
    `;
  }

  override render(): TemplateResult {
    const items = buildPageItems(this.page, this.totalPages, this.siblingCount);
    return html`
      <nav aria-label="Pagination" part="nav">
        <ul class="flex items-center gap-1">
          ${this.hideEdges
            ? ''
            : html`<li>${this.renderArrow('prev', this.page <= 1)}</li>`}
          ${items.map((item) =>
            item.kind === 'page'
              ? html`<li>${this.renderPage(item.value)}</li>`
              : html`<li
                  class=${cx(
                    'inline-flex items-center justify-center text-gray-400',
                    SIZE[this.size],
                  )}
                  aria-hidden="true"
                >
                  …
                </li>`,
          )}
          ${this.hideEdges
            ? ''
            : html`<li>${this.renderArrow('next', this.page >= this.totalPages)}</li>`}
        </ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-pagination': TwipPagination;
  }
  interface HTMLElementEventMap {
    'twip-pagination-change': CustomEvent<{ page: number }>;
  }
}
