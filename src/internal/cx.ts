/**
 * Tiny `classnames`-style helper.
 *
 * Combines string and object inputs into a single space-separated
 * class string. Used in place of Lit's `classMap` directive so the
 * components remain agnostic to the directive's parser quirks across
 * runtimes (Bun's test harness in particular has been observed to
 * mis-parse `classMap` inside conditional sub-templates).
 */
export type CxValue = string | false | null | undefined | Record<string, boolean>;

export function cx(...inputs: CxValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string') {
      if (input.length > 0) out.push(input);
      continue;
    }
    for (const [key, value] of Object.entries(input)) {
      if (value && key) out.push(key);
    }
  }
  return out.join(' ');
}
