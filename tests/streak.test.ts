import { describe, it, expect, beforeEach } from 'vitest';
import { loadStreak, recordSession } from '../src/components/game/streak';

const store = new Map<string, string>();
beforeEach(() => {
  store.clear();
  globalThis.localStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  } as Storage;
});

describe('recordSession', () => {
  it('first ever play → streak 1', () =>
    expect(recordSession(5, new Date('2026-08-01T10:00')).streak).toBe(1));
  it('same-day replay keeps streak', () => {
    recordSession(5, new Date('2026-08-01T10:00'));
    expect(recordSession(3, new Date('2026-08-01T22:00')).streak).toBe(1);
  });
  it('consecutive day increments', () => {
    recordSession(5, new Date('2026-08-01T10:00'));
    expect(recordSession(4, new Date('2026-08-02T09:00')).streak).toBe(2);
  });
  it('gap resets to 1', () => {
    recordSession(5, new Date('2026-08-01T10:00'));
    expect(recordSession(4, new Date('2026-08-04T09:00')).streak).toBe(1);
  });
  it('best score is monotonic', () => {
    recordSession(5, new Date('2026-08-01T10:00'));
    expect(recordSession(3, new Date('2026-08-01T11:00')).best).toBe(5);
    expect(recordSession(7, new Date('2026-08-01T12:00')).best).toBe(7);
  });
  it('corrupt stored JSON treated as fresh', () => {
    store.set('ey-game', '{nope');
    expect(recordSession(2, new Date('2026-08-01T10:00')).streak).toBe(1);
  });
  it('loadStreak reflects what recordSession persisted', () => {
    recordSession(6, new Date('2026-08-01T10:00'));
    const loaded = loadStreak();
    expect(loaded.streak).toBe(1);
    expect(loaded.best).toBe(6);
    expect(loaded.lastPlayed).toBe('2026-08-01');
  });
});
