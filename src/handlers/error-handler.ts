import { Logger } from '../logging/logger';

export class ErrorHandler {
	public static handle(error: unknown): void {
		if (error instanceof Error) Logger.ERROR(`${error.name} - ${error.message}`, error.stack);
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
