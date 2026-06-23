import { describe, expect, it } from 'bun:test';
import '../../define/toast.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipToast } from './toast.js';
import type { TwipToaster } from './toaster.js';

describe('twip-toast', () => {
  it('renders heading and description', async () => {
    const el = document.createElement('twip-toast') as TwipToast;
    el.heading = 'Saved';
    el.description = 'Your settings were saved.';
    el.duration = 0;
    const { element, cleanup } = await mount(el);
    expect(element.shadowRoot?.textContent).toContain('Saved');
    expect(element.shadowRoot?.textContent).toContain('Your settings were saved.');
    cleanup();
  });

  it('dismiss() removes the element and fires twip-toast-dismiss', async () => {
    const el = document.createElement('twip-toast') as TwipToast;
    el.duration = 0;
    const { element, cleanup } = await mount(el);
    let fired = 0;
    element.addEventListener('twip-toast-dismiss', () => {
      fired += 1;
    });
    element.dismiss();
    expect(fired).toBe(1);
    expect(element.isConnected).toBe(false);
    cleanup();
  });
});

describe('twip-toaster', () => {
  it('notify() appends a toast child', async () => {
    const el = document.createElement('twip-toaster') as TwipToaster;
    const { element, cleanup } = await mount(el);
    const toast = element.notify({ heading: 'Hi', duration: 0 });
    expect(toast.parentElement).toBe(element);
    expect(toast.heading).toBe('Hi');
    cleanup();
  });
});
