import { describe, expect, test } from 'vitest';
import { copyShareText } from '../src/components/game/shareCard';

describe('share text fallback', () => {
  test('reports unavailable when the browser has no clipboard writer', async () => {
    await expect(copyShareText(undefined, 'result')).resolves.toBe('unavailable');
  });

  test('writes the result and reports success when clipboard access exists', async () => {
    let written = '';
    const clipboard = {
      async writeText(text: string) {
        written = text;
      },
    };

    await expect(copyShareText(clipboard, 'result')).resolves.toBe('copied');
    expect(written).toBe('result');
  });
});
