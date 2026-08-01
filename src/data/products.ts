export interface Product {
  id: string; name: string; blurb: string;
  href: string; repo?: string; cta: string;
}
export const products: Product[] = [
  {
    id: 'nabd',
    name: 'NABD · نبض',
    blurb: 'A serene daily ʿibāda and wird tracker for Muslims. Build consistency in worship and life — on web and Android.',
    href: 'https://nobd-frontend.vercel.app',
    repo: 'https://github.com/Ibrahim-Rezq/nabd',
    cta: 'Open NABD',
  },
  {
    id: 'quran-api',
    name: 'Quran Unified API',
    blurb: 'One TypeScript SDK over the major Quran text, audio, translation and tafsir providers — with automatic fallback.',
    href: 'https://ibrahim-rezq.github.io/quran-api-unified/',
    repo: 'https://github.com/Ibrahim-Rezq/quran-api-unified',
    cta: 'Read the docs',
  },
  {
    id: 'quiz',
    name: 'Islamic Figures Game',
    blurb: 'Name the figures of Islam — write it in Arabic or tap to answer. Playable right here on this page.',
    href: '#play',
    cta: 'Play now',
  },
];
