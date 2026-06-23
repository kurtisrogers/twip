import { describe, expect, it } from 'bun:test';
import '../../define/patterns.js';
import { mount } from '../../../tests/helpers.js';
import type { TwipHeroSection } from './hero-section.js';
import type { TwipFeaturesSection } from './features-section.js';
import type { TwipCtaSection } from './cta-section.js';
import type { TwipFaqSection } from './faq-section.js';
import type { TwipBannerSection } from './banner-section.js';

describe('twip-hero-section', () => {
  it('renders heading and description', async () => {
    const el = document.createElement('twip-hero-section') as TwipHeroSection;
    el.heading = 'Build faster';
    el.description = 'Ship beautiful interfaces with Twip.';
    const { element, cleanup } = await mount(el);
    expect(element.shadowRoot?.querySelector('h1')?.textContent?.trim()).toBe(
      'Build faster',
    );
    expect(element.shadowRoot?.querySelector('p')?.textContent?.trim()).toBe(
      'Ship beautiful interfaces with Twip.',
    );
    cleanup();
  });

  it('renders split layout', async () => {
    const el = document.createElement('twip-hero-section') as TwipHeroSection;
    el.layout = 'split';
    el.heading = 'Split hero';
    const { element, cleanup } = await mount(el);
    expect(element.getAttribute('layout')).toBe('split');
    expect(element.shadowRoot?.querySelector('[part="media"]')).toBeTruthy();
    cleanup();
  });
});

describe('twip-features-section', () => {
  it('renders section header and grid', async () => {
    const el = document.createElement('twip-features-section') as TwipFeaturesSection;
    el.heading = 'Features';
    el.columns = 3;
    const { element, cleanup } = await mount(el);
    expect(element.shadowRoot?.querySelector('h2')?.textContent?.trim()).toBe('Features');
    expect(element.shadowRoot?.querySelector('[part="grid"]')).toBeTruthy();
    cleanup();
  });
});

describe('twip-cta-section', () => {
  it('renders with brand variant', async () => {
    const el = document.createElement('twip-cta-section') as TwipCtaSection;
    el.heading = 'Ready to start?';
    el.variant = 'brand';
    const { element, cleanup } = await mount(el);
    expect(element.getAttribute('variant')).toBe('brand');
    expect(element.shadowRoot?.querySelector('h2')?.textContent?.trim()).toBe(
      'Ready to start?',
    );
    cleanup();
  });
});

describe('twip-faq-section', () => {
  it('renders faq section', async () => {
    const el = document.createElement('twip-faq-section') as TwipFaqSection;
    el.heading = 'FAQ';
    const { element, cleanup } = await mount(el);
    expect(element.shadowRoot?.querySelector('[part="faq"]')).toBeTruthy();
    cleanup();
  });
});

describe('twip-banner-section', () => {
  it('renders banner with tone', async () => {
    const el = document.createElement('twip-banner-section') as TwipBannerSection;
    el.tone = 'info';
    const { element, cleanup } = await mount(el);
    expect(element.getAttribute('tone')).toBe('info');
    expect(element.shadowRoot?.querySelector('[part="banner"]')).toBeTruthy();
    cleanup();
  });
});
