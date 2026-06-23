import { LitElement, css, unsafeCSS, type CSSResult } from 'lit';
import { getTailwindCssText } from '../styles/sheet.js';

const tailwindStyles: CSSResult = unsafeCSS(getTailwindCssText());

const hostReset = css`
  :host {
    display: block;
  }
  :host([hidden]) {
    display: none !important;
  }
`;

/**
 * Styles every Twip component starts with. Subclasses extending
 * {@link TwipElement} can spread this into their own `styles` array
 * to layer additional CSS on top of the Tailwind base.
 */
export const baseStyles: ReadonlyArray<CSSResult> = [hostReset, tailwindStyles];

/**
 * Base class for every Twip component.
 *
 * Every subclass adopts the same Tailwind stylesheet. Lit caches
 * CSSResult instances and uses constructable stylesheets under the
 * hood, so the Tailwind CSS string is parsed once per page and shared
 * across all component instances via `adoptedStyleSheets`.
 */
export class TwipElement extends LitElement {
  static override styles: CSSResult | CSSResult[] = [...baseStyles];
}
