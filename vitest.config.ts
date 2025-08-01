import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html', 'lcov'],
			reportsDirectory: 'coverage',
			all: true,
			reportOnFailure: true,
			include: ['src/**/*.ts'],
			exclude: ['**/*.spec.ts', '**/*.test.ts', 'src/tests/**', 'src/types/**'],
		},
	},
});
