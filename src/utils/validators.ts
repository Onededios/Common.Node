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
	 * This method only checks segment **length**, not hexadecimal **content** or version bits.
	 */
	public static isGUID(value: string): value is GUID {
		const parts = value.split('-');
		return parts.length === 5 && parts[0].length === 8 && parts[1].length === 4 && parts[2].length === 4 && parts[3].length === 4 && parts[4].length === 12;
	}
}
