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

describe('parseAsInt()', () => {
	const invalidIntegers = ['abc', '12.5', '4.', '+10', '', '--5'];

	it('should parse valid integer strings', () => {
		expect(Parser.parseAsInt('0')).toBe(0);
		expect(Parser.parseAsInt('123')).toBe(123);
		expect(Parser.parseAsInt('-45')).toBe(-45);
	});

	it('should throw an error for invalid integer strings', () => {
		invalidIntegers.forEach((value) => {
			expect(() => Parser.parseAsInt(value)).toThrowError(`Invalid integer: "${value}"`);
		});
	});
});

describe('parseAsFloat()', () => {
	const invalidFloats = ['abc', '12.3.4', '--3', 'NaN', '', '4.'];

	it('should parse valid float strings', () => {
		expect(Parser.parseAsFloat('0')).toBe(0);
		expect(Parser.parseAsFloat('10')).toBe(10);
		expect(Parser.parseAsFloat('-3.14')).toBeCloseTo(-3.14);
		expect(Parser.parseAsFloat('2.718')).toBeCloseTo(2.718);
		expect(Parser.parseAsFloat('5.0')).toBeCloseTo(5.0);
	});

	it('should throw an error for invalid float strings', () => {
		invalidFloats.forEach((value) => {
			expect(() => Parser.parseAsFloat(value)).toThrowError(`Invalid float: "${value}"`);
		});
	});
});

describe('parseAsDate()', () => {
	it('should parse valid ISO date strings', () => {
		const date = Parser.parseAsDate('2025-01-01T00:00:00Z');
		expect(date instanceof Date).toBe(true);
		expect(date.toISOString()).toBe('2025-01-01T00:00:00.000Z');
	});

	it('should parse simple date strings', () => {
		const date = Parser.parseAsDate('1995-12-17');
		expect(date).toBeInstanceOf(Date);
		expect(date.getFullYear()).toBe(1995);
		expect(date.getMonth()).toBe(11);
		expect(date.getDate()).toBe(17);
	});

	it('should throw an error for invalid date strings', () => {
		const invalidDates = ['invalid-date', ''];
		invalidDates.forEach((value) => {
			expect(() => Parser.parseAsDate(value)).toThrowError(`Invalid date: "${value}"`);
		});
	});
});

describe('parseAsJson()', () => {
	it('should parse valid JSON objects', () => {
		const obj = Parser.parseAsJson<{ a: number; b: number }>('{"a":1,"b":2}');
		expect(obj).toEqual({ a: 1, b: 2 });
	});

	it('should parse valid JSON arrays', () => {
		const arr = Parser.parseAsJson<number[]>('[1,2,3]');
		expect(arr).toEqual([1, 2, 3]);
	});

	it('should throw an error for invalid JSON strings', () => {
		const invalidJsons = ['{', '{"a":1', '', '{"a":1,,}'];
		invalidJsons.forEach((value) => {
			expect(() => Parser.parseAsJson(value)).toThrow();
		});
	});
});

describe('parseAsCsv()', () => {
	it('should split comma-separated values and trim whitespace', () => {
		const result = Parser.parseAsCsv('a, b ,c');
		expect(result).toEqual(['a', 'b', 'c']);
	});

	it('should use a custom delimiter when provided', () => {
		const result = Parser.parseAsCsv('a; b; c', ';');
		expect(result).toEqual(['a', 'b', 'c']);
	});
});

describe('parseAsArray()', () => {
	it('should map values using the provided parser', () => {
		const result = Parser.parseAsArray('1,2,3', (val) => Parser.parseAsInt(val));
		expect(result).toEqual([1, 2, 3]);
	});

	it('should throw an error when the item parser fails', () => {
		expect(() => Parser.parseAsArray('a,b', (val) => Parser.parseAsInt(val))).toThrowError('Invalid integer: "a"');
	});
});

describe('parseAsString()', () => {
	it('should return the same string', () => {
		expect(Parser.parseAsString('hello')).toBe('hello');
		expect(Parser.parseAsString('123')).toBe('123');
		expect(Parser.parseAsString('')).toBe('');
	});
});

describe('parseAsEnum()', () => {
	const allowed = ['red', 'green', 'blue'] as const;

	it('should return the value when it is in the allowed list', () => {
		expect(Parser.parseAsEnum('red', allowed)).toBe('red');
		expect(Parser.parseAsEnum('green', allowed)).toBe('green');
		expect(Parser.parseAsEnum('blue', allowed)).toBe('blue');
	});

	it('should throw an error when the value is not allowed', () => {
		expect(() => Parser.parseAsEnum('yellow', allowed)).toThrowError('Invalid value "yellow", allowed: red, green, blue');
	});
});
