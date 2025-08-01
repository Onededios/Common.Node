import path, { resolve } from 'path';
import { existsSync, promises } from 'fs';

export class FileHandler<T = unknown> {
	private readonly filePath: string;

	constructor(filePath: string, baseDir = process.cwd()) {
		this.filePath = path.resolve(baseDir, filePath);
	}

	public readonly readAsync = async (encoding: BufferEncoding = 'utf-8') => await promises.readFile(this.fullPath(), encoding);

	public async readJSONAsync(): Promise<T> {
		if (!existsSync(this.fullPath())) throw new Error(`Missing file at ${this.filePath}`);
		return JSON.parse(await this.readAsync());
	}

	private readonly fullPath = (): string => path.resolve(this.filePath);
}
