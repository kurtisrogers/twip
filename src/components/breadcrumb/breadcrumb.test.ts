import { describe, expect, it } from 'bun:test';
import '../../define/breadcrumb.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipBreadcrumb } from './breadcrumb.js';
import type { TwipBreadcrumbItem } from './breadcrumb-item.js';

describe('twip-breadcrumb', () => {
  it('marks the last item with data-last', async () => {
    const nav = document.createElement('twip-breadcrumb') as TwipBreadcrumb;
    const a = document.createElement('twip-breadcrumb-item') as TwipBreadcrumbItem;
    a.textContent = 'Home';
    a.href = '/';
    const b = document.createElement('twip-breadcrumb-item') as TwipBreadcrumbItem;
    b.textContent = 'Library';
    nav.appendChild(a);
    nav.appendChild(b);
    const { element, cleanup } = await mount(nav);
    await element.updateComplete;
    await new Promise((r) => queueMicrotask(() => r(null)));
    expect(a.hasAttribute('data-last')).toBe(false);
    expect(b.hasAttribute('data-last')).toBe(true);
    cleanup();
  });
});
