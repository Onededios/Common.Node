import { Validator } from '../utils/validator';
import { Random } from 'random-js';
import { GUID } from '../types/base.types';

/**
 * Static **random helper** that wraps a single {@link Random} instance to
 * provide quick one-liners for:
 *
 * - Picking a random element from an array (`getRndFromArray`)
 * - Generating booleans, integers, or fixed-length strings
 *
 * @remarks
 * Under the hood it uses a PRNG from the `Random` class
 * (e.g. `random-js`, `@ngneat/falso`, or your own abstraction).
 * Replace the implementation if you need a cryptographically secure source.
 *
 * @example
 * ```ts
 * import { Generator } from './Generator';
 *
 * const roll  = Generator.getRndInt(1, 6);         // 1 … 6
 * const flags = Generator.getRndBool();            // true | false
 * const uuid  = Generator.getRndString(8);         // 'kP9xN8bQ'
 * const card  = Generator.getRndFromArray(['♠', '♥', '♦', '♣']);
 * ```
 */
export class RandomGeneratorFactory {
	/** Shared pseudo-random number generator. */
	private static readonly random = new Random();

	/**
	 * Uniformly selects one element from a **non-empty** array.
	 *
	 * @typeParam T - Element type of the supplied array.
	 * @param array - Candidates to choose from.
	 * @returns     A single random element.
	 *
	 * @throws RangeError If `array` is empty.
	 */
	public static getRndFromArray<T>(array: T[]): T {
		if (array.length === 0) {
			throw new RangeError('Cannot pick from an empty array.');
		}
		const index = this.random.integer(0, array.length - 1);
		return array[index];
	}

	/**
	 * Generates a **random boolean** (`true` or `false` with equal probability).
	 */
	public static readonly getRndBool = (): boolean => this.random.bool();

	/**
	 * Produces a **random alphanumeric string** of a given length.
	 *
	 * @param length - Desired string length (must be ≥ 1).
	 * @returns      Pseudo-random string, e.g. `'x7B9Qa'`.
	 */
	public static readonly getRndString = (length: number): string => this.random.string(length);

	/**
	 * Returns a **random integer** within the inclusive range `[min, max]`.
	 *
	 * @param min - Lower bound (default `1`).
	 * @param max - Upper bound (default `10000`).
	 * @returns   Number such that `min ≤ n ≤ max`.
	 */
	public static readonly getRndInt = (min = 1, max = 10000): number => this.random.integer(min, max);

	/**
	 * Generates a **random {@link GUID}**.
	 */
	public static readonly getRndGuid = (): GUID => {
		const guid = this.random.uuid4();
		if (!Validator.isGUID(guid)) throw new Error('Generated GUID is invalid');
		return guid;
	};
}
