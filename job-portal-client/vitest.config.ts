import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		coverage: {
      reporter: ['text', 'lcov'],
      provider: 'istanbul'
		},
    setupFiles: ['src/__tests__/vitest.setup.ts']
  },
})

