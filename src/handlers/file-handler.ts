import { resolve } from 'path';
import { existsSync, promises } from 'fs';

export class FileHandler<T> {
	private readonly filePath: string;

	constructor(filePath: string) {
		const config = resolve(__dirname, '..');
		this.filePath = resolve(config, filePath);
	}

	public readonly readAsync = async (encoding: BufferEncoding = 'utf-8') => await promises.readFile(this.filePath, encoding);

	public async readJSONAsync(): Promise<T> {
		if (!existsSync(this.filePath)) throw new Error(`Missing file at ${this.filePath}`);
		return JSON.parse(await this.readAsync());
	}
}
