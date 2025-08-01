import { describe, it, expect } from 'vitest';
import { EnumFactory } from '../factories/enum-factory';

describe('EnumFactory', () => {
	describe('create from list of keys', () => {
		it('should assign incremental values starting from 0', () => {
			const Direction = EnumFactory.create('Up', 'Down', 'Left', 'Right');
			expect(Direction).toEqual({ Up: 0, Down: 1, Left: 2, Right: 3 });
		});
	});

	describe('create from object map', () => {
		it('should return shallow copy of the provided map', () => {
			const Status = EnumFactory.create({ OPEN: 'O', CLOSED: 'C' });
			expect(Status).toEqual({ OPEN: 'O', CLOSED: 'C' });
		});

		it('should retain numeric values', () => {
			const Http = EnumFactory.create({ OK: 200, NOT_FOUND: 404 });
			expect(Http.OK).toBe(200);
			expect(Http.NOT_FOUND).toBe(404);
		});
	});

	describe('values', () => {
		it('should return array of values', () => {
			const Color = EnumFactory.create({ Red: '#f00', Green: '#0f0' });
			const values = EnumFactory.values<string>(Color);
			expect(values).toEqual(['#f00', '#0f0']);
		});
	});

	describe('keys', () => {
		it('should return array of keys', () => {
			const Days = EnumFactory.create({ Mon: 1, Tue: 2 });
			const keys = EnumFactory.keys(Days);
			expect(keys).toEqual(['Mon', 'Tue']);
		});
	});

	describe('isValidKey', () => {
		it('should return true for valid keys', () => {
			const Actions = EnumFactory.create({ RUN: 'R', STOP: 'S' });
			expect(EnumFactory.isValidKey(Actions, 'RUN')).toBe(true);
			expect(EnumFactory.isValidKey(Actions, 'STOP')).toBe(true);
		});

		it('should return false for invalid keys or non-string', () => {
			const Actions = EnumFactory.create({ RUN: 'R', STOP: 'S' });
			expect(EnumFactory.isValidKey(Actions, 'JUMP')).toBe(false);
			expect(EnumFactory.isValidKey(Actions, 123)).toBe(false);
		});
	});

	describe('isValidValue', () => {
		it('should return true for valid values', () => {
			const Status = EnumFactory.create({ ENABLED: 1, DISABLED: 0 });
			expect(EnumFactory.isValidValue(Status, 1)).toBe(true);
			expect(EnumFactory.isValidValue(Status, 0)).toBe(true);
		});

		it('should return false for unknown values', () => {
			const Status = EnumFactory.create({ ENABLED: 1, DISABLED: 0 });
			expect(EnumFactory.isValidValue(Status, 2)).toBe(false);
		});
	});

	describe('create with invalid arguments', () => {
		it('should throw if argument is null or undefined', () => {
			expect(() => EnumFactory.create(undefined as any)).toThrowError('Invalid arguments! First argument cannot be null or undefined.');
			expect(() => EnumFactory.create(null as any)).toThrowError('Invalid arguments! First argument cannot be null or undefined.');
		});

		it('should throw error if called with invalid types', () => {
			expect(() => EnumFactory.create(true as any)).toThrowError('Invalid arguments! Must be a string list or an object map.');
			expect(() => EnumFactory.create(Symbol('invalid') as any)).toThrowError('Invalid arguments! Must be a string list or an object map.');
			expect(() => EnumFactory.create(123 as any)).toThrowError('Invalid arguments! Must be a string list or an object map.');
		});

		it('should throw if array contains non-string keys', () => {
			expect(() => EnumFactory.create(['A', 123] as any)).toThrowError('Invalid enum key(s)! All keys must be strings.');
		});

		it('should throw if variadic keys are not all strings', () => {
			expect(() => EnumFactory.create('A', 'B', 99 as any)).toThrowError('Invalid enum key(s)! All keys must be strings.');
		});
	});
});
