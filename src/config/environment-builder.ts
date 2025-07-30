import { config } from 'dotenv';
import { Logger } from '../logging/logger';

export class EnvironmentBuilder<P extends Record<string, (raw: string) => unknown>> {
	public readonly variables: { [K in keyof P]: ReturnType<P[K]> };
	constructor(private readonly parsers: P) {
		config();

		const tmp = {} as { [K in keyof P]: ReturnType<P[K]> };

		(Object.keys(parsers) as (keyof P)[]).forEach((key) => (tmp[key] = this.getVar(key)));

		this.variables = Object.freeze(tmp);

		Logger.SUCCESS('Successfully loaded all .env variables');
	}

	private getVar<K extends keyof P>(key: K): ReturnType<P[K]> {
		const raw = process.env[key as string] ?? '';
		const parser = this.parsers[key] as (raw: string) => ReturnType<P[K]>;
		return parser(raw);
	}
}
