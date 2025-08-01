import { describe, it, expect, afterEach } from 'vitest';
import { EnvironmentBuilder } from '../config/environment-builder';
import { Parser } from '../utils/parser';

describe('EnvironmentBuilder', () => {
	const originalEnv = { ...process.env };

	afterEach(() => {
		process.env = { ...originalEnv };
	});

	it('should parse environment variables with provided parsers', () => {
		process.env.PORT = '8080';
		process.env.DEBUG = 'false';
		const envBuilder = new EnvironmentBuilder({
			PORT: Parser.parseAsInt,
			DEBUG: Parser.parseAsBool,
		});
		expect(envBuilder.variables.PORT).toBe(8080);
		expect(envBuilder.variables.DEBUG).toBe(false);
	});

	it('should pass an empty string to the parser when the variable is missing', () => {
		delete process.env.MISSING;
		const envBuilder = new EnvironmentBuilder({
			MISSING: Parser.parseAsString,
		});
		expect(envBuilder.variables.MISSING).toBe('');
	});
});
