import { describe, expect, it } from 'bun:test';
import '../../define/pagination.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipPagination } from './pagination.js';

describe('twip-pagination', () => {
  it('renders the current page as aria-current', async () => {
    const el = document.createElement('twip-pagination') as TwipPagination;
    el.totalPages = 5;
    el.page = 3;
    const { element, cleanup } = await mount(el);
    const current = element.shadowRoot?.querySelector('button[aria-current="page"]');
    expect(current?.textContent?.trim()).toBe('3');
    cleanup();
  });

  it('fires twip-pagination-change when a page button is clicked', async () => {
    const el = document.createElement('twip-pagination') as TwipPagination;
    el.totalPages = 5;
    el.page = 1;
    const { element, cleanup } = await mount(el);
    let received = -1;
    element.addEventListener('twip-pagination-change', (e: Event) => {
      received = (e as CustomEvent<{ page: number }>).detail.page;
    });
    const buttons = Array.from(
      element.shadowRoot!.querySelectorAll('button'),
    ) as HTMLButtonElement[];
    const targetPage = buttons.find((b) => b.textContent?.trim() === '5');
    targetPage?.click();
    expect(received).toBe(5);
    expect(element.page).toBe(5);
    cleanup();
  });
});
