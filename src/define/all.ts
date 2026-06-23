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

import './accordion.js';
import './alert.js';
import './avatar.js';
import './badge.js';
import './breadcrumb.js';
import './button.js';
import './card.js';
import './checkbox.js';
import './divider.js';
import './dropdown.js';
import './empty-state.js';
import './input.js';
import './kbd.js';
import './modal.js';
import './pagination.js';
import './progress.js';
import './radio.js';
import './rating.js';
import './select.js';
import './skeleton.js';
import './slider.js';
import './spinner.js';
import './stepper.js';
import './switch.js';
import './tabs.js';
import './textarea.js';
import './toast.js';
import './tooltip.js';
import './patterns.js';
