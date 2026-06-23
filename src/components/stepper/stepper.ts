import { html, css, nothing, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TwipElement, baseStyles } from '../../internal/base-element.js';
import { cx } from '../../internal/cx.js';

export type TwipStepperOrientation = 'horizontal' | 'vertical';

export interface TwipStepperStep {
  id: string;
  label: string;
  description?: string;
}

const localStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Multi-step progress indicator. Pass an ordered array of steps via the
 * `steps` property and the zero-based `current` index. Steps before
 * `current` are rendered as complete, the current one as active, and
 * the remainder as upcoming.
 *
 * @element twip-stepper
 */
export class TwipStepper extends TwipElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles, localStyles];

  @property({ attribute: false })
  steps: TwipStepperStep[] = [];

  @property({ type: Number })
  current = 0;

  @property({ type: String, reflect: true })
  orientation: TwipStepperOrientation = 'horizontal';

  private renderIndicator(
    state: 'complete' | 'current' | 'upcoming',
    index: number,
  ): TemplateResult {
    const baseClass =
      'flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ring-1';
    switch (state) {
      case 'complete':
        return html`<span class=${cx(baseClass, 'bg-brand-600 text-white ring-brand-600')}>
          <svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.41 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>`;
      case 'current':
        return html`<span
          class=${cx(baseClass, 'bg-white text-brand-700 ring-brand-600')}
          aria-current="step"
        >
          ${index + 1}
        </span>`;
      case 'upcoming':
        return html`<span class=${cx(baseClass, 'bg-white text-gray-500 ring-gray-300')}>
          ${index + 1}
        </span>`;
      default: {
        const _exhaustive: never = state;
        return _exhaustive;
      }
    }
  }

  private stateFor(index: number): 'complete' | 'current' | 'upcoming' {
    if (index < this.current) return 'complete';
    if (index === this.current) return 'current';
    return 'upcoming';
  }

  override render(): TemplateResult {
    if (this.orientation === 'vertical') {
      return html`
        <ol part="stepper" class="flex flex-col gap-4">
          ${this.steps.map((step, i) => {
            const state = this.stateFor(i);
            const connector =
              i < this.steps.length - 1
                ? html`<div
                    class=${cx('mt-2 ml-3.5 h-6 w-px', {
                      'bg-brand-600': state === 'complete',
                      'bg-gray-200': state !== 'complete',
                    })}
                    aria-hidden="true"
                  ></div>`
                : nothing;
            return html`
              <li class="flex flex-col">
                <div class="flex items-start gap-3">
                  ${this.renderIndicator(state, i)}
                  <div class="pt-0.5 text-sm">
                    <div
                      class=${cx('font-medium', {
                        'text-gray-900': state !== 'upcoming',
                        'text-gray-500': state === 'upcoming',
                      })}
                    >
                      ${step.label}
                    </div>
                    ${step.description
                      ? html`<div class="text-xs text-gray-500">${step.description}</div>`
                      : nothing}
                  </div>
                </div>
                ${connector}
              </li>
            `;
          })}
        </ol>
      `;
    }
    return html`
      <ol part="stepper" class="flex items-start gap-4">
        ${this.steps.map((step, i) => {
          const state = this.stateFor(i);
          const isLast = i === this.steps.length - 1;
          return html`
            <li class="flex flex-1 items-center gap-3">
              <div class="flex flex-col items-center gap-1 text-center">
                ${this.renderIndicator(state, i)}
                <div
                  class=${cx('text-xs font-medium', {
                    'text-gray-900': state !== 'upcoming',
                    'text-gray-500': state === 'upcoming',
                  })}
                >
                  ${step.label}
                </div>
                ${step.description
                  ? html`<div class="text-[11px] text-gray-500">${step.description}</div>`
                  : nothing}
              </div>
              ${isLast
                ? nothing
                : html`<div
                    class=${cx('mt-3 h-px flex-1', {
                      'bg-brand-600': state === 'complete',
                      'bg-gray-200': state !== 'complete',
                    })}
                    aria-hidden="true"
                  ></div>`}
            </li>
          `;
        })}
      </ol>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twip-stepper': TwipStepper;
  }
}
