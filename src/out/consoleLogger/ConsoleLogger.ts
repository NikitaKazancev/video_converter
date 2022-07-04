import { IStreamLogger } from '../../core/handlers/streamLogger.types';

export default class ConsoleLogger implements IStreamLogger {
	private static logger: ConsoleLogger;
	public static getInstance(): ConsoleLogger {
		if (!this.logger) this.logger = new ConsoleLogger();
		return this.logger;
	}

	log(...args: any[]): void {
		console.log(args);
	}
	error(...args: any[]): void {
		console.error(args);
	}
	end(): void {
		console.log('Готово');
	}
}
