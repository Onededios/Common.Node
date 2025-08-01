import { describe, it, expect, vi, afterEach } from 'vitest';
import { ErrorHandler } from '../handlers/error-handler';
import { Logger } from '../logging/logger';

describe('ErrorHandler.handle()', () => {
	const logger = { ERROR: vi.fn() } as unknown as Logger;
	const handler = new ErrorHandler(logger);

	afterEach(() => vi.resetAllMocks());

	it('should log name and message for Error instances', async () => {
		const err = new Error('Something went wrong');

		await handler.handle(err);

		expect(logger.ERROR).toHaveBeenCalledWith('Error - Something went wrong');
	});

	it('should log serialized message for unknown objects', async () => {
		const err = { foo: 'bar' };

		await handler.handle(err);

		expect(logger.ERROR).toHaveBeenCalledWith('Unknown error object: {"foo":"bar"}');
	});

	it('should log fallback message for unserializable error', async () => {
		const err: any = {};
		err.self = err;

		await handler.handle(err);

		expect(logger.ERROR).toHaveBeenCalledWith('Unknown error: No serializable representation!');
	});

	it('should execute the callback before handling', async () => {
		const cb = vi.fn();

		const err = new Error('test');

		await handler.handle(err, cb);

		expect(cb).toHaveBeenCalled();
		expect(logger.ERROR).toHaveBeenCalledWith('Error - test');
	});

	it('should re-throw error if handleErrors is false', async () => {
		const notHandler = new ErrorHandler(logger, false);

		const err = new Error('Throw me');

		await expect(notHandler.handle(err)).rejects.toThrow('Throw me');
	});
});
