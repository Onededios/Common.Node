import { Logger } from '@onededios/common.node';

export interface Logger {
	/**
	 * Writes an **informational** message to the console.
	 *
	 * @param msg - The human-readable message to output.
	 *
	 * @example Logger.INFO('Connection established with database.');
	 */
	INFO(msg: string): void;

	/**
	 * Writes an **warning** message to the console.
	 *
	 * @param msg - The human-readable message to output.
	 *
	 * @example Logger.WARN('Could not find the desired file.');
	 */
	WARN(msg: string): void;

	/**
	 * Writes an **error** message to the console.
	 *
	 * @param msg - The human-readable message to output.
	 *
	 * @example Logger.ERROR('Could not establish connection with database.');
	 */
	ERROR(msg: string): void;

	/**
	 * Writes a **success** message to the console.
	 *
	 * @param msg - The human-readable message to output.
	 *
	 * @example Logger.SUCCESS('Record saved.');
	 */
	SUCCESS(msg: string): void;

	/**
	 * Writes a **debug** message to the console.
	 *
	 * @remarks
	 * Must set currentEnv different of **pro** to enable debug logs.
	 *
	 * @param msg - The human-readable message to output.
	 * @param currentEnv - The current environment.
	 *
	 * @example Logger.DEBUG('Connecting to database with user "manolo"...');
	 */
	DEBUG(msg: string, currentEnv = 'pro'): void;
}
