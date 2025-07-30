import { describe, it, expect, vi, afterEach } from 'vitest';
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

	it('should freeze the variables object', () => {
		process.env.KEY = 'value';
		const envBuilder = new EnvironmentBuilder({
			KEY: Parser.parseAsString,
		});
		expect(Object.isFrozen(envBuilder.variables)).toBe(true);
	});

	it('should log success after loading variables', () => {
		// Intercept the underlying console.log call instead of Logger.SUCCESS,
		// because Logger.SUCCESS formats the message and forwards it to the console.
		const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
		process.env.X = '1';
		const envBuilder = new EnvironmentBuilder({
			X: Parser.parseAsInt,
		});
		expect(spy).toHaveBeenCalled();
		const messages = spy.mock.calls.map((call) => call[0] as string);
		const found = messages.some((m) => m.includes('[SUCCESS]') && m.includes('Successfully loaded all .env variables'));
		expect(found).toBe(true);
		expect(envBuilder.variables.X).toEqual(1);
		spy.mockRestore();
	});
});
