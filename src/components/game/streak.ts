const KEY = 'ey-game';
interface Persisted { streak: number; lastPlayed: string; best: number; }

function localDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function loadStreak(): Persisted {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) throw new Error('empty');
    const p = JSON.parse(raw) as Persisted;
    if (typeof p.streak !== 'number' || typeof p.lastPlayed !== 'string') throw new Error('shape');
    return { streak: p.streak, lastPlayed: p.lastPlayed, best: p.best ?? 0 };
  } catch {
    return { streak: 0, lastPlayed: '', best: 0 };
  }
}

export function recordSession(score: number, now: Date = new Date()) {
  const prev = loadStreak();
  const today = localDate(now);
  const yesterday = localDate(new Date(now.getTime() - 86_400_000));
  const streak =
    prev.lastPlayed === today ? Math.max(prev.streak, 1)
    : prev.lastPlayed === yesterday ? prev.streak + 1
    : 1;
  const next: Persisted = { streak, lastPlayed: today, best: Math.max(prev.best, score) };
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* private mode: play, don't persist */ }
  return { streak: next.streak, best: next.best };
}
