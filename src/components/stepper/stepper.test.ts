import { describe, expect, it } from 'bun:test';
import '../../define/stepper.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipStepper } from './stepper.js';

describe('twip-stepper', () => {
  it('marks the current step with aria-current="step"', async () => {
    const el = document.createElement('twip-stepper') as TwipStepper;
    el.steps = [
      { id: 'a', label: 'A' },
      { id: 'b', label: 'B' },
      { id: 'c', label: 'C' },
    ];
    el.current = 1;
    const { element, cleanup } = await mount(el);
    const current = element.shadowRoot?.querySelector('[aria-current="step"]');
    expect(current?.textContent?.trim()).toBe('2');
    cleanup();
  });
});
