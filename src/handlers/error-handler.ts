import { Logger } from '../logging/logger';

export class ErrorHandler {
	constructor(private readonly handleErrors = true, private readonly logger: Logger) {}

	public handle(error: unknown): void;
	public async handle(error: unknown, cb: () => void | Promise<void>): Promise<void>;

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
