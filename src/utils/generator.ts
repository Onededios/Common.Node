import { Random } from 'random-js';

export class Generator {
	private static readonly random = new Random();

	public static getRndFromArray<T>(array: T[]): T {
		const index = this.random.integer(0, array.length - 1);
		return array[index];
	}

	public static readonly getRndBool = () => this.random.bool();

	public static readonly getRndString = (length: number) => this.random.string(length);

	public static readonly getRndInt = (min = 1, max = 10000) => this.random.integer(min, max);
}
