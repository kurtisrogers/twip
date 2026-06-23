import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';
import {
  SECTION_PADDING,
  gridColumnsClass,
  renderSectionHeader,
  type TwipSectionColumns,
  type TwipSectionSize,
} from './section-shared.js';

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Key metrics and statistics row.
 *
 * @element twip-stats-section
 * @slot eyebrow - Leading label, typically a `twip-badge`.
 * @slot heading - Custom heading when the `heading` attribute is not set.
 * @slot description - Custom description when the `description` attribute is not set.
 * @slot - Stat items with value and label content.
 */
export class TwipStatsSection extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String })
  eyebrow: string | null = null;

  @property({ type: String })
  heading: string | null = null;

  @property({ type: String })
  description: string | null = null;

  @property({ type: Number, reflect: true })
  columns: TwipSectionColumns = 4;

  @property({ type: String, reflect: true })
  size: TwipSectionSize = 'md';

  @property({ type: Boolean, reflect: true })
  divided = false;

  override render(): TemplateResult {
    return html`
      <section
        part="stats"
        class=${cx(
          'bg-white',
          SECTION_PADDING[this.size],
          this.divided && 'border-y border-gray-200',
        )}
      >
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          ${renderSectionHeader({
            eyebrow: this.eyebrow,
            heading: this.heading,
            description: this.description,
          })}
          <div
            part="grid"
            class=${cx(
              'mt-12 grid gap-8 text-center',
              gridColumnsClass(this.columns),
              this.divided && 'divide-y divide-gray-200 sm:divide-y-0',
            )}
          >
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-stats-section': TwipStatsSection;
  }
}
