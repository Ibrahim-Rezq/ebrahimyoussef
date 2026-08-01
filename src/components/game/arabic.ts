import type { Figure } from '../../data/figures';

export function normalizeArabic(s: string): string {
  return s
    .replace(/[ً-ٰٟـ]/g, '') // harakat, dagger alif, tatweel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchesAnswer(input: string, fig: Figure): boolean {
  const n = normalizeArabic(input);
  if (!n) return false;
  return fig.accepted.some((a) => normalizeArabic(a) === n);
}
