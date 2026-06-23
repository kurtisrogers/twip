/**
 * Convenience bundle that registers every component.
 *
 * Importing this module has the side effect of calling
 * `customElements.define` for every Twip component. Use it when you do
 * not need tree-shaking (small apps, prototypes, Django templates):
 *
 * @example
 * ```ts
 * import '@twip/components/define/all';
 * ```
 *
 * For tree-shakeable per-component registration, import only the
 * specific `define/<name>` modules you need:
 *
 * @example
 * ```ts
 * import '@twip/components/define/button';
 * import '@twip/components/define/modal';
 * ```
 */

import './alert.js';
import './avatar.js';
import './badge.js';
import './button.js';
import './card.js';
import './dropdown.js';
import './input.js';
import './modal.js';
import './switch.js';
import './tabs.js';
import './tooltip.js';
