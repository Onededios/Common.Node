import { describe, expect, it } from 'vitest';
import { MisoSoupCalculator } from '../src/utils/miso-soup-calculator';

describe('MisoSoupCalculator', () => {
	describe('calculate()', () => {
		it('should calculate correct ingredients for 1 serving', () => {
			const result = MisoSoupCalculator.calculate(1);
			expect(result.liters).toBeCloseTo(0.2);
			expect(result.kelpKnots).toBe(1);
			expect(result.misoPasteGrams).toBe(15);
		});

		it('should calculate correct ingredients for 5 servings', () => {
			const result = MisoSoupCalculator.calculate(5);
			expect(result.liters).toBeCloseTo(1.0);
			expect(result.kelpKnots).toBe(5);
			expect(result.misoPasteGrams).toBe(75);
		});

		it('should calculate correct ingredients for 10 servings', () => {
			const result = MisoSoupCalculator.calculate(10);
			expect(result.liters).toBeCloseTo(2.0);
			expect(result.kelpKnots).toBe(10);
			expect(result.misoPasteGrams).toBe(150);
		});

		it('should scale linearly with servings', () => {
			const one = MisoSoupCalculator.calculate(1);
			const five = MisoSoupCalculator.calculate(5);
			expect(five.liters).toBeCloseTo(one.liters * 5);
			expect(five.kelpKnots).toBe(one.kelpKnots * 5);
			expect(five.misoPasteGrams).toBe(one.misoPasteGrams * 5);
		});

		it('should throw an error for zero servings', () => {
			expect(() => MisoSoupCalculator.calculate(0)).toThrowError('Invalid servings: "0". Must be a positive integer.');
		});

		it('should throw an error for negative servings', () => {
			expect(() => MisoSoupCalculator.calculate(-3)).toThrowError('Invalid servings: "-3". Must be a positive integer.');
		});

		it('should throw an error for non-integer servings', () => {
			expect(() => MisoSoupCalculator.calculate(2.5)).toThrowError('Invalid servings: "2.5". Must be a positive integer.');
		});
	});
});
