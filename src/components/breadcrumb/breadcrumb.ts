import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';

export type TwipBreadcrumbSeparator = 'chevron' | 'slash';

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Breadcrumb trail. Children should be `twip-breadcrumb-item` elements.
 *
 * @element twip-breadcrumb
 * @slot - One or more `twip-breadcrumb-item` children.
 */
export class TwipBreadcrumb extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String, reflect: true })
  separator: TwipBreadcrumbSeparator = 'chevron';

  override connectedCallback(): void {
    super.connectedCallback();
    queueMicrotask(() => this.applySeparator());
  }

  override updated(): void {
    this.applySeparator();
  }

  private applySeparator(): void {
    const items = Array.from(
      this.querySelectorAll('twip-breadcrumb-item'),
    ) as HTMLElement[];
    items.forEach((item, index) => {
      item.setAttribute('data-separator', this.separator);
      item.toggleAttribute('data-last', index === items.length - 1);
    });
  }

  override render(): TemplateResult {
    return html`
      <nav aria-label="Breadcrumb" part="nav">
        <ol class="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          <slot @slotchange=${this.applySeparator}></slot>
        </ol>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-breadcrumb': TwipBreadcrumb;
  }
}
