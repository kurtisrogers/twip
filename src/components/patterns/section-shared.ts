import { html, nothing, type TemplateResult } from 'lit';
import { cx } from '../../internal/cx.js';

export type TwipSectionAlign = 'left' | 'center';
export type TwipSectionSize = 'sm' | 'md' | 'lg';
export type TwipSectionColumns = 2 | 3 | 4;

export const SECTION_PADDING: Record<TwipSectionSize, string> = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-20',
  lg: 'py-20 sm:py-28',
};

export const GRID_COLUMNS: Record<TwipSectionColumns, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4',
};

function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${String(value)}`);
}

export function alignClass(align: TwipSectionAlign): string {
  switch (align) {
    case 'left':
      return 'text-left';
    case 'center':
      return 'text-center';
    default:
      return assertNever(align);
  }
}

export function gridColumnsClass(columns: TwipSectionColumns): string {
  switch (columns) {
    case 2:
    case 3:
    case 4:
      return GRID_COLUMNS[columns];
    default:
      return assertNever(columns);
  }
}

export interface SectionHeaderOptions {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  align?: TwipSectionAlign;
  className?: string;
}

export function renderSectionHeader({
  eyebrow,
  heading,
  description,
  align = 'center',
  className,
}: SectionHeaderOptions): TemplateResult {
  const alignCls = alignClass(align);
  const itemsAlign = align === 'center' ? 'items-center' : 'items-start';

  return html`
    <header
      part="header"
      class=${cx('mx-auto flex max-w-2xl flex-col gap-4', itemsAlign, alignCls, className)}
    >
      <div class="empty:hidden">
        <slot name="eyebrow">
          ${eyebrow
            ? html`<p class="text-sm font-semibold text-brand-600">${eyebrow}</p>`
            : nothing}
        </slot>
      </div>
      ${heading
        ? html`<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            ${heading}
          </h2>`
        : html`<div class="empty:hidden">
            <slot name="heading"></slot>
          </div>`}
      ${description
        ? html`<p class="text-lg text-gray-600">${description}</p>`
        : html`<div class="empty:hidden text-lg text-gray-600">
            <slot name="description"></slot>
          </div>`}
    </header>
  `;
}
