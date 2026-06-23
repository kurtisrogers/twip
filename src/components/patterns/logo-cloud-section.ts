import { html, css, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';
import {
  SECTION_PADDING,
  renderSectionHeader,
  type TwipSectionSize,
} from './section-shared.js';

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Logo cloud for trusted-by or partner brand marks.
 *
 * @element twip-logo-cloud-section
 * @slot heading - Custom heading when the `heading` attribute is not set.
 * @slot - Logo images or brand marks.
 */
export class TwipLogoCloudSection extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ type: String })
  heading: string | null = 'Trusted by teams worldwide';

  @property({ type: String, reflect: true })
  size: TwipSectionSize = 'sm';

  @property({ type: Boolean, reflect: true })
  bordered = false;

  override render(): TemplateResult {
    return html`
      <section
        part="logo-cloud"
        class=${cx(
          'bg-white',
          SECTION_PADDING[this.size],
          this.bordered && 'border-y border-gray-200',
        )}
      >
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          ${renderSectionHeader({
            heading: this.heading,
            align: 'center',
            className: 'max-w-xl',
          })}
          <div
            part="logos"
            class="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 grayscale opacity-70"
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
    'twip-logo-cloud-section': TwipLogoCloudSection;
  }
}
