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

export * from './components/alert/index.js';
export * from './components/avatar/index.js';
export * from './components/badge/index.js';
export * from './components/button/index.js';
export * from './components/card/index.js';
export * from './components/dropdown/index.js';
export * from './components/input/index.js';
export * from './components/modal/index.js';
export * from './components/switch/index.js';
export * from './components/tabs/index.js';
export * from './components/tooltip/index.js';
