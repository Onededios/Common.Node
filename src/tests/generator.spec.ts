import { describe } from 'node:test';
import { expect, it } from 'vitest';
import { Generator } from '../utils/generator';

describe('Generator', () => {
	describe('getRndFromArray', () => {
		it('should throw RangeError for empty array', () => {
			expect(() => Generator.getRndFromArray([])).toThrow(RangeError);
		});

		it('should return a random element from a non-empty array', () => {
			const array = [1, 2, 3, 4, 5];
			const result = Generator.getRndFromArray(array);
			expect(array).toContain(result);
		});
	});

	describe('getRndBool', () => {
		it('should return a boolean value', () => {
			const result = Generator.getRndBool();
			expect(typeof result).toBe('boolean');
		});
	});

	describe('getRndString', () => {
		it('should return an string value', () => {
			const length = 5;
			const res = Generator.getRndString(length);
			expect(typeof res).toBe('string');
			expect(res.length).toEqual(length);
		});
	});

	describe('getRndInt', () => {
		it('should return an int value', () => {
			const min = 5;
			const max = 10;
			const res = Generator.getRndInt(min, max);
			expect(typeof res).toBe('number');
			expect(res).toBeGreaterThanOrEqual(min);
			expect(res).toBeLessThanOrEqual(max);
		});
	});
});
