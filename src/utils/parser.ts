export class Parser {
	public static parseAsBool(value: string): boolean {
		if (/^(1|true)$/i.test(value)) return true;
		if (/^(0|false)$/i.test(value)) return false;
		throw new Error(`Invalid boolean: "${value}"`);
	}

	public static parseAsInt(value: string): number {
		if (!/^-?\d+$/.test(value)) throw new Error(`Invalid integer: "${value}"`);
		return Number(value);
	}

	public static parseAsFloat(value: string): number {
		if (!/^-?\d+(\.\d+)?$/.test(value)) throw new Error(`Invalid float: "${value}"`);
		return Number(value);
	}

	public static parseAsDate(value: string): Date {
		const ms = Date.parse(value);
		if (Number.isNaN(ms)) throw new Error(`Invalid date: "${value}"`);
		return new Date(ms);
	}

	public static readonly parseAsJson = <T = unknown>(value: string): T => JSON.parse(value) as T;

	public static readonly parseAsCsv = (value: string, delimiter = ','): string[] => value.split(delimiter).map((s) => s.trim());

	public static readonly parseAsArray = <T>(value: string, itemParser: (raw: string) => T): T[] => Parser.parseAsCsv(value).map(itemParser);

	public static readonly parseAsString = (value: string): string => value;

	public static parseAsEnum<T extends string>(value: string, allowed: readonly T[]): T {
		if (allowed.includes(value as T)) return value as T;
		throw new Error(`Invalid value "${value}", allowed: ${allowed.join(', ')}`);
	}
}
