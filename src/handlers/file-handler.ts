import path from 'path';
import { existsSync, promises } from 'fs';

/**
 * Generic FileHandler class for reading files and JSON content.
 * @template T - The expected type of the parsed JSON object.
 *
 * @example
 * // Reading a text file
 * const handler = new FileHandler('data.txt');
 * handler.readAsync().then(console.log);
 *
 * @example
 * // Reading a JSON file
 * interface Config { port: number; }
 * const handler = new FileHandler<Config>('config.json');
 * handler.readJSONAsync().then(cfg => console.log(cfg.port));
 */
export class FileHandler<T = unknown> {
	private readonly filePath: string;

	/**
	 * Constructs a FileHandler.
	 * @param filePath - Relative or absolute path to the file.
	 * @param baseDir - Base directory to resolve the file path (defaults to current working directory).
	 */
	constructor(filePath: string, baseDir = process.cwd()) {
		this.filePath = path.resolve(baseDir, filePath);
	}

	/**
	 * Reads the file asynchronously as a string.
	 * @param encoding - The encoding to use (default is 'utf-8').
	 * @returns Promise resolving to the file contents as a string.
	 *
	 * @example
	 * const handler = new FileHandler('notes.txt');
	 * handler.readAsync().then(console.log);
	 */
	public readonly readAsync = async (encoding: BufferEncoding = 'utf-8') => await promises.readFile(this.fullPath(), encoding);

	/**
	 * Reads and parses the file as JSON.
	 * @returns Promise resolving to the parsed JSON object of type T.
	 * @throws Error if the file does not exist.
	 *
	 * @example
	 * interface User { name: string; }
	 * const handler = new FileHandler<User>('user.json');
	 * handler.readJSONAsync().then(user => console.log(user.name));
	 */
	public async readJSONAsync(): Promise<T> {
		if (!existsSync(this.fullPath())) throw new Error(`Missing file at ${this.filePath}`);
		return JSON.parse(await this.readAsync());
	}

	private readonly fullPath = (): string => path.resolve(this.filePath);
}
