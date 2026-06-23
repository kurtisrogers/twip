import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

const localStyles = css`
  :host {
    display: inline-flex;
  }
`;

/**
 * Single breadcrumb segment. Render as a link by passing `href`, or as a
 * static label otherwise. The parent `twip-breadcrumb` decorates the last
 * item via the `data-last` attribute so it gets `aria-current="page"`
 * styling.
 *
 * @element twip-breadcrumb-item
 */
export class TwipBreadcrumbItem extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String })
  href: string | null = null;

  @property({ type: String, attribute: 'data-separator' })
  separator: 'chevron' | 'slash' = 'chevron';

  @property({ type: Boolean, attribute: 'data-last', reflect: true })
  last = false;

  private renderSeparator(): TemplateResult {
    if (this.separator === 'slash') {
      return html`<span aria-hidden="true" class="px-1 text-gray-300">/</span>`;
    }
    return html`<svg
      aria-hidden="true"
      class="h-4 w-4 text-gray-300"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M7.22 14.78a.75.75 0 010-1.06L10.94 10 7.22 6.28a.75.75 0 011.06-1.06l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0z"
        clip-rule="evenodd"
      />
    </svg>`;
  }

  override render(): TemplateResult {
    const labelClass = cx(
      'inline-flex items-center text-sm transition-colors',
      this.last
        ? 'font-medium text-gray-900'
        : this.href
          ? 'text-gray-500 hover:text-gray-700'
          : 'text-gray-500',
    );
    return html`
      <li class="inline-flex items-center gap-1.5">
        ${this.href && !this.last
          ? html`<a class=${labelClass} href=${this.href} part="link">
              <slot></slot>
            </a>`
          : html`<span
              class=${labelClass}
              part="link"
              aria-current=${this.last ? 'page' : nothing}
            >
              <slot></slot>
            </span>`}
        ${this.last ? nothing : this.renderSeparator()}
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-breadcrumb-item': TwipBreadcrumbItem;
  }
}
