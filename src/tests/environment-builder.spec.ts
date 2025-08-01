import { describe, it, expect, afterEach, vi } from 'vitest';
import { EnvironmentBuilder } from '../config/environment-builder';
import { Parser } from '../utils/parser';

describe('EnvironmentBuilder', () => {
	const originalEnv = { ...process.env };

	vi.mock('dotenv', () => ({
		config: vi.fn(),
	}));

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

	it('should freeze the resulting variables object', () => {
		const envBuilder = new EnvironmentBuilder({
			FOO: Parser.parseAsString,
		});
		expect(Object.isFrozen(envBuilder.variables)).toBe(true);
	});

	it('should invoke dotenv.config when instantiated', async () => {
		const { config } = await import('dotenv');
		(config as unknown as { mockClear: () => void }).mockClear();
		new EnvironmentBuilder({
			BAR: Parser.parseAsString,
		});
		expect((config as unknown as { mock: { calls: unknown[] } }).mock.calls.length).toBe(1);
	});

	it('should use current env values only during construction', () => {
		process.env.TEST = 'first';
		const envBuilder = new EnvironmentBuilder({
			TEST: Parser.parseAsString,
		});
		process.env.TEST = 'second';
		expect(envBuilder.variables.TEST).toBe('first');
	});

	it('should call provided parser with raw env value', () => {
		const spy = vi.fn().mockReturnValue('done');
		process.env.SPY = 'value';
		const envBuilder = new EnvironmentBuilder({
			SPY: spy,
		});
		expect(spy).toHaveBeenCalledWith('value');
		expect(envBuilder.variables.SPY).toBe('done');
	});
});
