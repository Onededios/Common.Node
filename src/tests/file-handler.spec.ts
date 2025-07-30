import { describe, it, expect, afterEach } from 'vitest';
import { FileHandler } from '../handlers/file-handler';
import { promises as fs, existsSync } from 'fs';
import path from 'path';

describe('FileHandler', () => {
	const testDir = path.resolve(__dirname, '..');
	const tempFileName = 'temp_test_file.txt';
	const tempJsonName = 'temp_test.json';
	const tempFilePath = path.resolve(testDir, tempFileName);
	const tempJsonPath = path.resolve(testDir, tempJsonName);

	afterEach(async () => {
		if (existsSync(tempFilePath)) await fs.unlink(tempFilePath);
		if (existsSync(tempJsonPath)) await fs.unlink(tempJsonPath);
	});

	it('should read file contents asynchronously', async () => {
		const content = 'Hello, world!';
		await fs.writeFile(tempFilePath, content, 'utf-8');
		const handler = new FileHandler<string>(tempFileName);
		const result = await handler.readAsync();
		expect(result).toBe(content);
	});

	it('should read and parse JSON asynchronously', async () => {
		const data = { a: 1, b: 'text' };
		await fs.writeFile(tempJsonPath, JSON.stringify(data), 'utf-8');
		const handler = new FileHandler<typeof data>(tempJsonName);
		const result = await handler.readJSONAsync();
		expect(result).toEqual(data);
	});

	it('should throw an error when the file does not exist in readJSONAsync', async () => {
		const missingFile = 'non_existent.json';
		const handler = new FileHandler(missingFile);
		await expect(handler.readJSONAsync()).rejects.toThrowError(`Missing file at ${path.resolve(testDir, missingFile)}`);
	});
});
