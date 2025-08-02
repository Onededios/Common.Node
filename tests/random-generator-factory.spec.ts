import { RandomGeneratorFactory } from './../src/factories/random-generator-factory';
import { describe } from 'node:test';
import { afterEach, expect, it, vi } from 'vitest';
import { Validator } from '../src/utils/validator';

describe('RandomGeneratorFactory', () => {
	const originalRandom = (RandomGeneratorFactory as any).random;

	afterEach(() => {
		(RandomGeneratorFactory as any).random = originalRandom;
		vi.restoreAllMocks();
	});

	describe('getRndFromArray', () => {
		it('should throw RangeError for empty array', () => {
			expect(() => RandomGeneratorFactory.getRndFromArray([])).toThrow(RangeError);
		});

		it('should return a random element from a non-empty array', () => {
			const values = ['a', 'b', 'c'];
			const integer = vi.fn().mockReturnValue(1);
			(RandomGeneratorFactory as any).random = { integer } as any;

			const result = RandomGeneratorFactory.getRndFromArray(values);

			expect(result).toBe('b');
			expect(integer).toHaveBeenCalledWith(0, values.length - 1);
		});
	});

	describe('getRndBool', () => {
		it('should return a boolean value', () => {
			const bool = vi.fn().mockReturnValue(true);
			(RandomGeneratorFactory as any).random = { bool } as any;

			const result = RandomGeneratorFactory.getRndBool();

			expect(result).toBe(true);
			expect(bool).toHaveBeenCalled();
		});
	});

	describe('getRndString', () => {
		it('should return an string value', () => {
			const string = vi.fn().mockReturnValue('abc');
			(RandomGeneratorFactory as any).random = { string } as any;

			const result = RandomGeneratorFactory.getRndString(3);

			expect(result).toBe('abc');
			expect(string).toHaveBeenCalledWith(3);
		});
	});

	describe('getRndInt', () => {
		it('should return an int value', () => {
			const integer = vi.fn().mockReturnValue(7);
			(RandomGeneratorFactory as any).random = { integer } as any;

			const result = RandomGeneratorFactory.getRndInt(5, 10);

			expect(result).toBe(7);
			expect(integer).toHaveBeenCalledWith(5, 10);
		});
	});

	describe('getRndGuid', () => {
		it('should return a valid GUID', () => {
			const result = RandomGeneratorFactory.getRndGuid();
			expect(Validator.isGUID(result)).toBe(true);
		});

		it('should throw if generated GUID is invalid', () => {
			const originalUuid = RandomGeneratorFactory['random'].uuid4;

			RandomGeneratorFactory['random'].uuid4 = vi.fn().mockReturnValue('not-a-valid-guid');

			expect(() => RandomGeneratorFactory.getRndGuid()).toThrow('Generated GUID is invalid');

			RandomGeneratorFactory['random'].uuid4 = originalUuid;
		});
	});
});
