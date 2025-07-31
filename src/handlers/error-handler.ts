import { Logger } from '../logging/logger';

export class ErrorHandler {
	public static handle(error: unknown): void;
	public static async handle(error: unknown, cb: () => void | Promise<void>): Promise<void>;

	public static async handle(error: unknown, cb?: () => void | Promise<void>): Promise<void> {
		if (cb) await cb();
		if (error instanceof Error) Logger.ERROR(`${error.name} - ${error.message}`);
		else {
			try {
				const serialized = JSON.stringify(error);
				Logger.ERROR(`Unknown error object: ${serialized}`);
			} catch {
				Logger.ERROR(`Unknown error: No serializable representation!`);
			}
		}
	}
}
