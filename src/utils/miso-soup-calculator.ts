/**
 * Result of a miso soup ingredients calculation.
 */
export interface MisoSoupIngredients {
	/** Liters of water or dashi broth required. */
	liters: number;
	/** Number of kelp (kombu) knots required. */
	kelpKnots: number;
	/** Grams of miso paste required. */
	misoPasteGrams: number;
}

/**
 * Utility class for calculating **miso soup ingredients** for a given number
 * of servings.
 *
 * @remarks
 * Per-serving reference amounts used:
 * - **Water / dashi**: 0.2 L (200 ml)
 * - **Kelp knots**: 1 kombu knot
 * - **Miso paste**: 15 g (≈ 1 tablespoon)
 *
 * @example
 * ```ts
 * const ingredients = MisoSoupCalculator.calculate(5);
 * // { liters: 1, kelpKnots: 5, misoPasteGrams: 75 }
 * ```
 */
export class MisoSoupCalculator {
	/** Liters of water / dashi broth per serving. */
	public static readonly LITERS_PER_SERVING = 0.2;

	/** Kelp (kombu) knots per serving. */
	public static readonly KELP_KNOTS_PER_SERVING = 1;

	/** Grams of miso paste per serving. */
	public static readonly MISO_PASTE_GRAMS_PER_SERVING = 15;

	/**
	 * Calculates the miso soup ingredients required for the given number of
	 * servings.
	 *
	 * @param servings - Number of people / servings. Must be a positive integer.
	 * @returns        Object with `liters`, `kelpKnots`, and `misoPasteGrams`.
	 *
	 * @throws Error If `servings` is not a positive integer.
	 */
	public static calculate(servings: number): MisoSoupIngredients {
		if (!Number.isInteger(servings) || servings <= 0) {
			throw new Error(`Invalid servings: "${servings}". Must be a positive integer.`);
		}

		return {
			liters: MisoSoupCalculator.LITERS_PER_SERVING * servings,
			kelpKnots: MisoSoupCalculator.KELP_KNOTS_PER_SERVING * servings,
			misoPasteGrams: MisoSoupCalculator.MISO_PASTE_GRAMS_PER_SERVING * servings,
		};
	}
}
