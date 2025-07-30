import { describe, it, expect, vi } from 'vitest';
import { Logger } from '../logging/logger';

describe('Logger', () => {
	it('INFO should call console.info with a formatted message', () => {
		const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
		Logger.INFO('Test message');
		expect(spy).toHaveBeenCalledTimes(1);
		const arg = spy.mock.calls[0][0] as string;
		expect(arg).toContain('[INFO]');
		expect(arg).toContain('Test message');
		spy.mockRestore();
	});

	it('WARN should call console.warn with a formatted message', () => {
		const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		Logger.WARN('Warning!');
		expect(spy).toHaveBeenCalledTimes(1);
		const arg = spy.mock.calls[0][0] as string;
		expect(arg).toContain('[WARN]');
		expect(arg).toContain('Warning!');
		spy.mockRestore();
	});

	it('ERROR should call console.error with a formatted message', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
		Logger.ERROR('An error occurred');
		expect(spy).toHaveBeenCalledTimes(1);
		const arg = spy.mock.calls[0][0] as string;
		expect(arg).toContain('[ERROR]');
		expect(arg).toContain('An error occurred');
		spy.mockRestore();
	});

	it('SUCCESS should call console.log with a formatted message', () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
		Logger.SUCCESS('Completed');
		expect(spy).toHaveBeenCalledTimes(1);
		const arg = spy.mock.calls[0][0] as string;
		expect(arg).toContain('[SUCCESS]');
		expect(arg).toContain('Completed');
		spy.mockRestore();
	});
});
