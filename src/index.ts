/**
 * Tree-shakeable root entry point.
 *
 * This module exports component classes and types ONLY. It does NOT
 * register any custom elements (no `customElements.define` calls), so
 * bundlers can drop components you don't reference.
 *
 * To make a component usable as `<twip-foo>` in HTML, you must either:
 *   - import its registration module: `import '@twip/components/define/foo';`
 *   - call `customElements.define('twip-foo', TwipFoo)` yourself; or
 *   - import the convenience bundle: `import '@twip/components/define/all';`
 *
 * @packageDocumentation
 */

export { TwipElement, baseStyles } from './internal/base-element.js';
export { defineElement } from './internal/define.js';
export { getTailwindCssText } from './styles/sheet.js';

export * from './components/accordion/index.js';
export * from './components/alert/index.js';
export * from './components/avatar/index.js';
export * from './components/badge/index.js';
export * from './components/breadcrumb/index.js';
export * from './components/button/index.js';
export * from './components/card/index.js';
export * from './components/checkbox/index.js';
export * from './components/divider/index.js';
export * from './components/dropdown/index.js';
export * from './components/empty-state/index.js';
export * from './components/input/index.js';
export * from './components/kbd/index.js';
export * from './components/modal/index.js';
export * from './components/pagination/index.js';
export * from './components/progress/index.js';
export * from './components/radio/index.js';
export * from './components/rating/index.js';
export * from './components/select/index.js';
export * from './components/skeleton/index.js';
export * from './components/slider/index.js';
export * from './components/spinner/index.js';
export * from './components/stepper/index.js';
export * from './components/switch/index.js';
export * from './components/tabs/index.js';
export * from './components/textarea/index.js';
export * from './components/toast/index.js';
export * from './components/tooltip/index.js';
export * from './components/patterns/index.js';
