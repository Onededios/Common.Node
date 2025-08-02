import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			provider: 'v8',
			reporter: ['lcov'],
			reportsDirectory: 'coverage',
			all: true,
			reportOnFailure: true,
			include: ['src/**/*.ts'],
			exclude: ['**/*.spec.ts', 'tests/**', 'src/types/**'],
		},
	},
});
