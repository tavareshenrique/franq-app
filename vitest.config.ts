import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        'node_modules/',
        'dist/',
        'coverage/',
        '**/mocks/**',
        '**/__tests__/**',
        '**/*.d.ts',
        'src/lib/utils.ts',
        'src/app/**',
        'src/template/**',
        'src/types/**',
        'src/components/ui',
        '.next/**',
        'next.config.mjs',
        'playwright.config.ts',
        'postcss.config.mjs',
        'tailwind.config.ts',
        'vitest.config.ts',
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
