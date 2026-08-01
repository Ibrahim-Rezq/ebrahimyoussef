import { describe, it, expect } from 'vitest';
import { normalizeArabic, matchesAnswer } from '../src/components/game/arabic';
import { figures } from '../src/data/figures';

const bilal = figures.find((f) => f.id === 'bilal')!;

describe('normalizeArabic', () => {
  it('strips harakat and tatweel', () =>
    expect(normalizeArabic('بِـلَالٌ')).toBe('بلال'));
  it('unifies alef forms', () =>
    expect(normalizeArabic('أإآٱ')).toBe('اااا'));
  it('unifies ta marbuta and alef maqsura', () =>
    expect(normalizeArabic('خديجة موسى')).toBe(normalizeArabic('خديجه موسي')));
  it('collapses whitespace', () =>
    expect(normalizeArabic('  بلال   بن  رباح ')).toBe('بلال بن رباح'));
});

describe('matchesAnswer', () => {
  it('accepts full name', () => expect(matchesAnswer('بلال بن رباح', bilal)).toBe(true));
  it('accepts short form', () => expect(matchesAnswer('بلال', bilal)).toBe(true));
  it('accepts vocalized input', () => expect(matchesAnswer('بِلال', bilal)).toBe(true));
  it('rejects wrong name', () => expect(matchesAnswer('عمر', bilal)).toBe(false));
  it('rejects empty', () => expect(matchesAnswer('  ', bilal)).toBe(false));
});
