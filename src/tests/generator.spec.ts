import { describe } from 'node:test';
import { afterEach, expect, it, vi } from 'vitest';
import { Generator } from '../utils/generator';

describe('Generator', () => {
	const originalRandom = (Generator as any).random;

	afterEach(() => {
		(Generator as any).random = originalRandom;
		vi.restoreAllMocks();
	});

	describe('getRndFromArray', () => {
		it('should throw RangeError for empty array', () => {
			expect(() => Generator.getRndFromArray([])).toThrow(RangeError);
		});

		it('should return a random element from a non-empty array', () => {
			const values = ['a', 'b', 'c'];
			const integer = vi.fn().mockReturnValue(1);
			(Generator as any).random = { integer } as any;

			const result = Generator.getRndFromArray(values);

			expect(result).toBe('b');
			expect(integer).toHaveBeenCalledWith(0, values.length - 1);
		});
	});

	describe('getRndBool', () => {
		it('should return a boolean value', () => {
			const bool = vi.fn().mockReturnValue(true);
			(Generator as any).random = { bool } as any;

			const result = Generator.getRndBool();

			expect(result).toBe(true);
			expect(bool).toHaveBeenCalled();
		});
	});

	describe('getRndString', () => {
		it('should return an string value', () => {
			const string = vi.fn().mockReturnValue('abc');
			(Generator as any).random = { string } as any;

			const result = Generator.getRndString(3);

			expect(result).toBe('abc');
			expect(string).toHaveBeenCalledWith(3);
		});
	});

	describe('getRndInt', () => {
		it('should return an int value', () => {
			const integer = vi.fn().mockReturnValue(7);
			(Generator as any).random = { integer } as any;

			const result = Generator.getRndInt(5, 10);

			expect(result).toBe(7);
			expect(integer).toHaveBeenCalledWith(5, 10);
		});
	});
});
