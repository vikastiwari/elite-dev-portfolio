import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
      exclude: ['src/env.d.ts', 'src/pages', 'src/layouts', 'src/components/canvas', 'src/utils', 'src/components/RecruiterResume.astro', 'eslint.config.js']
    },
  },
});
