import { describe, it, expect, vi } from 'vitest';
import { ErrorHandler } from '../handlers/error-handler';
import { Logger } from '../logging/logger';

describe('ErrorHandler.handle()', () => {
	it('should log error name and message for Error instances', () => {
		const spy = vi.spyOn(Logger, 'ERROR').mockImplementation(() => {});
		const err = new Error('Something went wrong');
		ErrorHandler.handle(err);
		expect(spy).toHaveBeenCalledTimes(1);
		const [message, trace] = spy.mock.calls[0];
		expect(message).toBe('Error - Something went wrong');
		expect(typeof trace).toBe('string');
		spy.mockRestore();
	});

	it('should serialize and log unknown error objects', () => {
		const spy = vi.spyOn(Logger, 'ERROR').mockImplementation(() => {});
		const obj = { foo: 'bar' };
		ErrorHandler.handle(obj);
		expect(spy).toHaveBeenCalledTimes(1);
		const [message] = spy.mock.calls[0];
		expect(message).toBe('Unknown error object: {"foo":"bar"}');
		spy.mockRestore();
	});

	it('should log a generic message when the error object cannot be serialized', () => {
		const spy = vi.spyOn(Logger, 'ERROR').mockImplementation(() => {});
		const obj: any = {};
		obj.self = obj;
		ErrorHandler.handle(obj);
		expect(spy).toHaveBeenCalledTimes(1);
		const [message] = spy.mock.calls[0];
		expect(message).toBe('Unknown error: No serializable representation!');
		spy.mockRestore();
	});
});
