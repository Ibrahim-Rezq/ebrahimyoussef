import type { Figure } from '../../data/figures';

export type Mode = 'tap' | 'write';
export type Phase = 'question' | 'reveal' | 'done';
export interface GameState {
  mode: Mode; phase: Phase; ids: string[]; roundIx: number;
  score: number; lastCorrect: boolean;
}
export type GameAction =
  | { type: 'answer'; correct: boolean }
  | { type: 'next' };

export function initGame(mode: Mode, ids: string[]): GameState {
  return { mode, phase: 'question', ids, roundIx: 0, score: 0, lastCorrect: false };
}

export function gameReducer(s: GameState, a: GameAction): GameState {
  switch (a.type) {
    case 'answer':
      if (s.phase !== 'question') return s;
      return { ...s, phase: 'reveal', lastCorrect: a.correct, score: s.score + (a.correct ? 1 : 0) };
    case 'next':
      if (s.phase !== 'reveal') return s;
      return s.roundIx + 1 >= s.ids.length
        ? { ...s, phase: 'done' }
        : { ...s, phase: 'question', roundIx: s.roundIx + 1 };
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickSession(all: Figure[], n = 7): Figure[] {
  return shuffle(all).slice(0, n);
}

export function pickOptions(target: Figure, all: Figure[]): Figure[] {
  const sameCat = all.filter((f) => f.category === target.category && f.id !== target.id);
  const others = all.filter((f) => f.category !== target.category && f.id !== target.id);
  const distractors = shuffle(sameCat).slice(0, 3);
  while (distractors.length < 3) distractors.push(shuffle(others)[distractors.length]);
  return shuffle([target, ...distractors]);
}
