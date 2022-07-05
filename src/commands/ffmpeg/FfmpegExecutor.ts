import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executor/CommandExecutor';
import FileService from '../../core/files/FileService';
import StreamLogger from '../../core/handlers/StreamLogger';
import { IStreamLogger } from '../../core/handlers/streamLogger.types';
import PromptService from '../../core/prompt/promptService';
import { IFfmpegCommandExec, IFfmpegInput } from '../ffmpeg.types';
import FfmpegBuilder from './FfmpegBuilder';

export default class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
	private fileService: FileService = new FileService();
	private promptService: PromptService = new PromptService();

	constructor(logger: IStreamLogger) {
		super(logger);
	}

	protected async prompt(): Promise<IFfmpegInput> {
		const width = await this.promptService.input<number>('Ширина', 'number');
		const height = await this.promptService.input<number>('Высота', 'number');
		const path = await this.promptService.input<string>(
			'Путь до файла',
			'input'
		);
		const name = await this.promptService.input<string>('Имя файла', 'input');

		return { width, height, path, name };
	}

	protected build({
		height,
		name,
		path,
		width,
	}: IFfmpegInput): IFfmpegCommandExec {
		const output = this.fileService.getFilePath(path, name, '.mp4');
		const args = new FfmpegBuilder()
			.input(path)
			.setSize(width, height)
			.output(output);

		return { command: 'ffmpeg', args, output };
	}

	protected spawn({
		output,
		command,
		args,
	}: IFfmpegCommandExec): ChildProcessWithoutNullStreams {
		this.fileService.deleteFile(output);
		return spawn(command, args);
	}

	protected processStream(
		stream: ChildProcessWithoutNullStreams,
		logger: IStreamLogger
	): void {
		const handler = new StreamLogger(logger);
		handler.processOutput(stream);
	}
}
