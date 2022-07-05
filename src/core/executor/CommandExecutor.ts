import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { IStreamLogger } from '../handlers/streamLogger.types';
import ICommandExecutor from './CommandExecutor.types';

export abstract class CommandExecutor<Input> {
	constructor(private logger: IStreamLogger) {}

	public async execute() {
		const input = await this.prompt();
		const cmd = this.build(input);
		const stream = this.spawn(cmd);
		this.processStream(stream, this.logger);
	}

	protected abstract prompt(): Promise<Input>;
	protected abstract build(input: Input): ICommandExecutor;
	protected abstract spawn(
		cmd: ICommandExecutor
	): ChildProcessWithoutNullStreams;
	protected abstract processStream(
		stream: ChildProcessWithoutNullStreams,
		logger: IStreamLogger
	): void;
}
