import { describe, it, expect } from 'vitest';
import { gameReducer, initGame, pickSession, pickOptions } from '../src/components/game/reducer';
import { figures } from '../src/data/figures';

describe('session sampling', () => {
  it('picks 7 unique figures', () => {
    const s = pickSession(figures);
    expect(s).toHaveLength(7);
    expect(new Set(s.map((f) => f.id)).size).toBe(7);
  });
  it('options: 4, target included once', () => {
    const target = figures[0];
    const opts = pickOptions(target, figures);
    expect(opts).toHaveLength(4);
    expect(opts.filter((o) => o.id === target.id)).toHaveLength(1);
  });
});

describe('gameReducer', () => {
  const ids = figures.slice(0, 7).map((f) => f.id);
  it('walks question → reveal → next and scores correct answers only', () => {
    let s = initGame('tap', ids);
    expect(s.phase).toBe('question');
    s = gameReducer(s, { type: 'answer', correct: true });
    expect(s.phase).toBe('reveal');
    expect(s.score).toBe(1);
    s = gameReducer(s, { type: 'next' });
    expect(s.phase).toBe('question');
    expect(s.roundIx).toBe(1);
    s = gameReducer(s, { type: 'answer', correct: false });
    expect(s.score).toBe(1);
  });
  it('finishes after last round', () => {
    let s = initGame('write', ids);
    for (let i = 0; i < 7; i++) {
      s = gameReducer(s, { type: 'answer', correct: true });
      s = gameReducer(s, { type: 'next' });
    }
    expect(s.phase).toBe('done');
    expect(s.score).toBe(7);
  });
});
