import { describe, it, expect } from 'vitest';
import { Parser } from '../utils/parser';

describe('parseAsBool()', () => {
	const validTrue = ['1', 'true', 'TRUE', 'TrUe'];
	const validFalse = ['0', 'false', 'FALSE', 'FaLsE'];
	const invalidValues = ['yes', 'no', '', '2', 'Trueee', 'null', 'undefined'];

	it('should return true for valid true values', () => {
		validTrue.forEach((value) => expect(Parser.parseAsBool(value)).toBe(true));
	});

	it('should return false for valid false values', () => {
		validFalse.forEach((value) => expect(Parser.parseAsBool(value)).toBe(false));
	});

	it('should throw an error for invalid values', () => {
		invalidValues.forEach((value) => {
			expect(() => Parser.parseAsBool(value)).toThrowError(`Invalid boolean: "${value}"`);
		});
	});
});
