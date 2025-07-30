export class Logger {
	public static readonly INFO = (msg: string, trace?: string) => console.info(this.format('INFO', '', msg, trace));
	public static readonly WARN = (msg: string, trace?: string) => console.warn(this.format('WARN', '', msg, trace));
	public static readonly ERROR = (msg: string, trace?: string) => console.error(this.format('ERROR', '', msg, trace));
	public static readonly SUCCESS = (msg: string, trace?: string) => console.log(this.format('SUCCESS', '', msg, trace));

	private static format(level: string, symbol: string, msg: string, trace?: string): string {
		let log = `${symbol}:${new Date().toISOString()}:[${level}]`;
		log += trace ? `- ${trace}` : '';
		log += `\n${msg}`;
		return log;
	}
}
