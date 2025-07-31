import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { Logger } from '../logging/logger';

describe('Logger', () => {
	const stubConsole = () => ({
		info: vi.spyOn(console, 'info').mockImplementation(() => {}),
		warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
		error: vi.spyOn(console, 'error').mockImplementation(() => {}),
		log: vi.spyOn(console, 'log').mockImplementation(() => {}),
		debug: vi.spyOn(console, 'debug').mockImplementation(() => {}),
	});

	const msg = 'hello world';
	let spies: ReturnType<typeof stubConsole>;

	beforeEach(() => (spies = stubConsole()));
	afterEach(() => Object.values(spies).forEach((spy) => spy.mockRestore()));

	it('INFO should call console.info with a formatted message', () => {
		Logger.INFO(msg);

		expect(spies.info).toHaveBeenCalledOnce();
		const output = spies.info.mock.calls[0][0] as string;
		expect(output).toContain('INFO');
		expect(output).toContain(msg);
	});

	it('WARN should call console.warn with a formatted message', () => {
		Logger.WARN(msg);

		expect(spies.warn).toHaveBeenCalledOnce();
		const output = spies.warn.mock.calls[0][0] as string;
		expect(output).toContain('WARN');
		expect(output).toContain(msg);
	});

	it('ERROR should call console.error with a formatted message', () => {
		Logger.ERROR(msg);

		expect(spies.error).toHaveBeenCalledOnce();
		const output = spies.error.mock.calls[0][0] as string;
		expect(output).toContain('ERROR');
		expect(output).toContain(msg);
	});

	it('SUCCESS should call console.log with a formatted message', () => {
		Logger.SUCCESS(msg);

		expect(spies.log).toHaveBeenCalledOnce();
		const output = spies.log.mock.calls[0][0] as string;
		expect(output).toContain('SUCCESS');
		expect(output).toContain(msg);
	});

	it('logs DEBUG when env is not "pro"', () => {
		Logger.DEBUG(msg, 'dev');

		expect(spies.debug).toHaveBeenCalledOnce();
		const output = spies.debug.mock.calls[0][0] as string;
		expect(output).toContain('DEBUG');
		expect(output).toContain(msg);
	});

	it('does NOT log DEBUG in production env', () => {
		Logger.DEBUG(msg, 'PRO');

		expect(spies.debug).not.toHaveBeenCalled();
	});
});
