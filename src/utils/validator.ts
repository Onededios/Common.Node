import { GUID } from '../types/base.types';

/**
 * Collection of static validation helpers for common data formats.
 *
 * @remarks
 * The `Validator` class contains lightweight, self-contained methods that
 * check structural validity of primitive values. These are **non-throwing** checks
 * — they return `true` or `false` depending on whether the input is valid.
 *
 * Intended for use in:
 * - Runtime guards (`if (Validator.isGUID(value)) { ... }`)
 * - Type refinement (`value is GUID`)
 * - Fail-fast parsing utilities
 */
export class Validator {
	/**
	 * Checks whether a given string matches the structure of a valid GUID.
	 *
	 * @param value - The string to validate.
	 * @returns `true` if the value matches the `8-4-4-4-12` segment pattern, `false` otherwise.
	 *
	 * @example
	 * ```ts
	 * Validator.isGUID('550e8400-e29b-41d4-a716-446655440000'); // true
	 * Validator.isGUID('invalid-guid');                        // false
	 * ```
	 *
	 * @remarks
	 * This method checks that the input matches the `8-4-4-4-12` segment pattern and that all characters are valid hexadecimal digits (0-9, a-f, A-F), but does not check version bits.
	 */
	public static readonly isGUID = (value: string): value is GUID => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value);

	/**
	 * Checks if a value is a valid email address (simple RFC 5322 pattern).
	 *
	 * @param value - The string to validate.
	 * @returns `true` if the value is a valid email, `false` otherwise.
	 *
	 * @example
	 * Validator.isEmail('user@example.com'); // true
	 * Validator.isEmail('not-an-email');     // false
	 */
	public static isEmail(value: string): boolean {
		if (typeof value !== 'string' || value.length > 320) return false;
		const at = value.indexOf('@');
		if (at < 1 || at !== value.lastIndexOf('@')) return false;
		const local = value.slice(0, at);
		const domain = value.slice(at + 1);
		if (!local || !domain || local.length > 64 || domain.length > 255) return false;
		if (domain.indexOf('.') === -1) return false;
		if (domain.startsWith('.') || domain.endsWith('.')) return false; // <-- Prevents '@.com' and 'user@com.'
		if (/\s/.test(value)) return false;
		return true;
	}

	/**
	 * Checks if a value is a valid (finite) number.
	 *
	 * @param value - The value to check.
	 * @returns `true` if the value is a finite number, `false` otherwise.
	 *
	 * @example
	 * Validator.isNumber(123);      // true
	 * Validator.isNumber('123');    // false
	 * Validator.isNumber(NaN);      // false
	 */
	public static readonly isNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

	/**
	 * Checks if a value is a non-empty string.
	 *
	 * @param value - The value to check.
	 * @returns `true` if the value is a non-empty string, `false` otherwise.
	 *
	 * @example
	 * Validator.isNonEmptyString('hello'); // true
	 * Validator.isNonEmptyString('');      // false
	 * Validator.isNonEmptyString(123);     // false
	 */
	public static readonly isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

	/**
	 * Checks if a value is a valid ISO 8601 date string.
	 *
	 * @param value - The string to validate.
	 * @returns `true` if the value is a valid ISO date, `false` otherwise.
	 *
	 * @example
	 * Validator.isISODate('2023-08-01T12:00:00Z'); // true
	 * Validator.isISODate('2023-08-01');           // true
	 * Validator.isISODate('01/08/2023');           // false
	 */
	public static isISODate(value: string): boolean {
		const isoDateRegex = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2}))?$/;
		if (!isoDateRegex.test(value)) return false;

		const date = new Date(value);
		if (isNaN(date.getTime())) return false;

		if (value.length === 10) return date.toISOString().startsWith(value);
		return true;
	}
}
