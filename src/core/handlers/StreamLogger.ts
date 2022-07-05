import { ChildProcessWithoutNullStreams } from 'child_process';
import { IStreamLogger } from './streamLogger.types';

export default class StreamLogger {
	constructor(private logger: IStreamLogger) {}

	processOutput(process: ChildProcessWithoutNullStreams) {
		process.stdout.on('data', (data: any) => {
			this.logger.log(data.toString());
		});

		process.stderr.on('data', (data: any) => {
			this.logger.error(data.toString());
		});

		process.on('close', this.logger.end);
	}
}
