import { EnumValues } from '../types/enum.types';
import { EnumFactory } from '../factories/enum-factory';

export class Logger {
	public static readonly INFO = (msg: string) => console.info(this.format(this.LevelEnum.info, '', msg));
	public static readonly WARN = (msg: string) => console.warn(this.format(this.LevelEnum.warn, '', msg));
	public static readonly ERROR = (msg: string) => console.error(this.format(this.LevelEnum.error, '', msg));
	public static readonly SUCCESS = (msg: string) => console.log(this.format(this.LevelEnum.success, '', msg));

	public static DEBUG(msg: string, currentEnv: string) {
		if (currentEnv.toLowerCase() === 'pro') return;
		console.debug(this.format(this.LevelEnum.debug, '', msg));
	}

	private static readonly LevelEnum = EnumFactory.create({
		info: 'INFO',
		warn: 'WARN',
		error: 'ERROR',
		success: 'SUCCESS',
		debug: 'DEBUG',
	});

	private static format(level: string, symbol: string, msg: string, signature = 4): string {
		const time = new Date().toISOString();
		const header = `${time} - ${symbol} ${level}`;
		const currentColor = this.getColor(level);
		const resetColor = this.getColor();

		return `${currentColor}${header} - ${this.getSignature(signature)}${resetColor}\n - ${msg}`;
	}

	private static getSignature(skip: number) {
		const stack = new Error().stack?.split('\n');

		if (!stack || stack.length <= skip) return 'Unknown origin';

		const line = stack[skip].trim();
		const full = new RegExp(/at\s+(.*?)\s+\((.*):(\d+):(\d+)\)/);
		const short = new RegExp(/at\s+(.*):(\d+):(\d+)/);

		let match = full.exec(line);

		if (match) {
			const [, method, path, line, col] = match;
			const file = path.split(/[\\/]/).pop();
			return `Method '${method}' from (${file}:${line}:${col})`;
		}

		match = short.exec(line);
		if (match) {
			const [, path, line, col] = match;
			const file = path.split(/[\\/]/).pop();
			return `(${file}:${line}:${col})`;
		}

		return 'Unknown origin';
	}

	private static getColor(level?: EnumValues<typeof this.LevelEnum>) {
		switch (level) {
			case this.LevelEnum.info:
				return '\x1b[34m';
			case this.LevelEnum.warn:
				return '\x1b[33m';
			case this.LevelEnum.error:
				return '\x1b[31m';
			case this.LevelEnum.success:
				return '\x1b[32m';
			case this.LevelEnum.debug:
				return '\x1b[35m';
			default:
				return '\x1b[0m';
		}
	}
}
