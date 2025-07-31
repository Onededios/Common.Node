export class EnumFactory {
	public static create<T extends string[]>(...keys: T): Record<T[number], number>;
	public static create<T extends Record<string, string | number>>(map: T): T;

	public static create(...args: any[]): any {
		if (typeof args[0] === 'object') return { ...args[0] };

		if (typeof args[0] === 'string') {
			return args.reduce((acc, key, index) => {
				acc[key] = index;
				return acc;
			}, {} as Record<string, number>);
		}

		throw new Error('Invalid arguments!');
	}

	public static readonly values = <T>(obj: Record<string, any>): T[] => Object.values(obj) as T[];
	public static readonly keys = <T extends Record<string, any>>(obj: T): (keyof T)[] => Object.keys(obj) as (keyof T)[];
	public static readonly isValidKey = <T extends Record<string, any>>(obj: T, key: unknown): key is keyof T => typeof key === 'string' && key in obj;
	public static readonly isValidValue = <T extends Record<string, any>>(obj: T, value: unknown): value is T[keyof T] => Object.values(obj).includes(value as any);
}
