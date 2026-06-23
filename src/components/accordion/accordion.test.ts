import { describe, expect, it } from 'bun:test';
import '../../define/accordion.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipAccordion } from './accordion.js';
import type { TwipAccordionItem } from './accordion-item.js';

describe('twip-accordion', () => {
  it('closes other items when opening one in single-mode', async () => {
    const root = document.createElement('twip-accordion') as TwipAccordion;
    const a = document.createElement('twip-accordion-item') as TwipAccordionItem;
    a.itemId = 'a';
    a.heading = 'A';
    a.open = true;
    const b = document.createElement('twip-accordion-item') as TwipAccordionItem;
    b.itemId = 'b';
    b.heading = 'B';
    root.appendChild(a);
    root.appendChild(b);
    const { element, cleanup } = await mount(root);
    await a.updateComplete;
    await b.updateComplete;

    b.shadowRoot?.querySelector('button')?.click();
    await element.updateComplete;
    await a.updateComplete;
    await b.updateComplete;

    expect(a.open).toBe(false);
    expect(b.open).toBe(true);
    cleanup();
  });

  it('allows multiple open items when multiple is set', async () => {
    const root = document.createElement('twip-accordion') as TwipAccordion;
    root.multiple = true;
    const a = document.createElement('twip-accordion-item') as TwipAccordionItem;
    a.itemId = 'a';
    a.heading = 'A';
    a.open = true;
    const b = document.createElement('twip-accordion-item') as TwipAccordionItem;
    b.itemId = 'b';
    b.heading = 'B';
    root.appendChild(a);
    root.appendChild(b);
    const { element, cleanup } = await mount(root);
    await a.updateComplete;
    await b.updateComplete;

    b.shadowRoot?.querySelector('button')?.click();
    await element.updateComplete;
    await a.updateComplete;
    await b.updateComplete;

    expect(a.open).toBe(true);
    expect(b.open).toBe(true);
    cleanup();
  });
});
