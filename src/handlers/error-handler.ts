import { Logger } from '../logging/logger';

/**
 * ErrorHandler is responsible for logging and optionally propagating unknown or thrown errors.
 * It supports optional execution of a callback (sync or async) before handling the error.
 */
export class ErrorHandler {
	constructor(private readonly logger: Logger, private readonly handleErrors = true) {}

	/**
	 * Handles an error and logs it. Optionally executes a callback before handling.
	 * @param error - The error object to handle (can be any type).
	 * @param cb - Optional callback to execute before handling the error.
	 */
	public async handle(error: unknown, cb?: () => void | Promise<void>): Promise<void> {
		if (cb) await cb();

		if (error instanceof Error) this.logger.ERROR(`${error.name} - ${error.message}`);
		else {
			try {
				const serialized = JSON.stringify(error);
				this.logger.ERROR(`Unknown error object: ${serialized}`);
			} catch {
				this.logger.ERROR(`Unknown error: No serializable representation!`);
			}
		}

		if (!this.handleErrors) throw error;
	}
}
