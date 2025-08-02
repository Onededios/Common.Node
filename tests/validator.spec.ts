import { describe, expect, it } from 'vitest';
import { Validator } from '../src/utils/validator';

describe('Validator', () => {
	describe('isGUID()', () => {
		const invalidGuids = ['123e4567-e89b-12d3-a456-42661417400', '550e8400-e29b-41d4-a716-44665544000x', '550e8400-e29b-41d4-a716-4466554400000', 'invalid-guid', '550e8400-e29b-41d4-a716-44665544000'];
		const validGuids = ['123e4567-e89b-12d3-a456-426614174000', '550e8400-e29b-41d4-a716-446655440000', '123e4567-e89b-12d3-a456-426614174001'];

		it('should validate correct GUIDs', () => {
			validGuids.forEach((guid) => expect(Validator.isGUID(guid)).toBe(true));
		});
		it('should invalidate incorrect GUIDs', () => {
			invalidGuids.forEach((guid) => expect(Validator.isGUID(guid)).toBe(false));
		});
	});

	describe('isEmail()', () => {
		const validEmails = ['test@example.com', 'user.name+tag+sorting@example.com', 'user/name=tag@example.com'];
		const invalidEmails = ['plainaddress', '@missingusername.com', 'username@.com'];

		it('should validate correct emails', () => {
			validEmails.forEach((email) => expect(Validator.isEmail(email)).toBe(true));
		});
		it('should invalidate incorrect emails', () => {
			invalidEmails.forEach((email) => expect(Validator.isEmail(email)).toBe(false));
		});
	});

	describe('isNumber()', () => {
		const validNumbers = [123, -456, 0, 3.14, Number.MAX_VALUE];
		const invalidNumbers = ['123', 'abc', NaN, Infinity, null, undefined];
		it('should validate correct numbers', () => {
			validNumbers.forEach((num) => expect(Validator.isNumber(num)).toBe(true));
		});
		it('should invalidate incorrect numbers', () => {
			invalidNumbers.forEach((num) => expect(Validator.isNumber(num)).toBe(false));
		});
	});

	describe('isNonEmptyString()', () => {
		const validStrings = ['hello', '  world  ', '123', 'a'];
		const invalidStrings = ['', ' ', null, undefined, 123];

		it('should validate non-empty strings', () => {
			validStrings.forEach((str) => expect(Validator.isNonEmptyString(str)).toBe(true));
		});
		it('should invalidate empty or non-string values', () => {
			invalidStrings.forEach((str) => expect(Validator.isNonEmptyString(str)).toBe(false));
		});
	});

	describe('isISODate()', () => {
		const validDates = ['2023-10-01', '2023-10-01T12:00:00Z', '2023-10-01T12:00:00+02:00'];
		const invalidDates = ['01/10/2023', '2023-10-01T12:00:00', 'invalid-date', '2023-13-01', '2023-10-32', '2023-10-01T25:00:00Z', '2023-10-01T12:60:00Z', '2023-10-01T12:00:60Z'];

		it('should validate correct ISO date strings', () => {
			validDates.forEach((date) => expect(Validator.isISODate(date)).toBe(true));
		});

		it('should invalidate incorrect ISO date strings', () => {
			invalidDates.forEach((date) => expect(Validator.isISODate(date)).toBe(false));
		});
	});
});
