import { describe, expect, it } from 'bun:test';
import '../../define/modal.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipModal } from './modal.js';

describe('twip-modal', () => {
  it('opens the underlying dialog when open=true', async () => {
    const el = document.createElement('twip-modal') as TwipModal;
    el.heading = 'Confirm';
    const { element, cleanup } = await mount(el);
    element.open = true;
    await (element as unknown as { updateComplete: Promise<void> }).updateComplete;
    const dialog = element.shadowRoot?.querySelector('dialog');
    expect(dialog?.hasAttribute('open')).toBe(true);
    cleanup();
  });

  it('hide() closes the dialog and fires twip-modal-close', async () => {
    const el = document.createElement('twip-modal') as TwipModal;
    const { element, cleanup } = await mount(el);
    element.open = true;
    await (element as unknown as { updateComplete: Promise<void> }).updateComplete;
    let closed = 0;
    element.addEventListener('twip-modal-close', () => {
      closed += 1;
    });
    element.hide();
    await (element as unknown as { updateComplete: Promise<void> }).updateComplete;
    expect(element.open).toBe(false);
    expect(closed).toBeGreaterThanOrEqual(1);
    cleanup();
  });
});
