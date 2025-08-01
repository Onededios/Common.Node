import { FileHandler } from '../src/handlers/file-handler';
import fs from 'node:fs/promises';
import path from 'path';
import { describe, afterEach, it, expect } from 'vitest';

describe('FileHandler', () => {
	const testDir = path.resolve(__dirname, '..');
	const tempFileName = 'temp_test_file.txt';
	const tempJsonName = 'temp_test.json';
	const tempFilePath = path.join(testDir, tempFileName);
	const tempJsonPath = path.join(testDir, tempJsonName);

	afterEach(async () => {
		await fs.rm(tempFilePath, { force: true });
		await fs.rm(tempJsonPath, { force: true });
	});

	it('should read file contents asynchronously', async () => {
		const content = 'Hello, world!';
		await fs.writeFile(tempFilePath, content);
		const handler = new FileHandler<string>(tempFileName);
		const result = await handler.readAsync();
		expect(result).toBe(content);
	});

	it('should read and parse JSON asynchronously', async () => {
		const data = { a: 1, b: 'text' };
		await fs.writeFile(tempFilePath, JSON.stringify(data));
		const handler = new FileHandler<typeof data>(tempFileName);
		const result = await handler.readJSONAsync();
		expect(result).toEqual(data);
	});

	it('should throw an error when the file does not exist in readJSONAsync', async () => {
		const missingFile = 'non_existent.json';
		const handler = new FileHandler(missingFile);
		await expect(handler.readJSONAsync()).rejects.toThrowError(`Missing file at ${path.resolve(testDir, missingFile)}`);
	});
});
