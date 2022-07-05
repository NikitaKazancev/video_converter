import ICommandExecutor from '../core/executor/CommandExecutor.types';

export interface IFfmpegInput {
	width: number;
	height: number;
	path: string;
	name: string;
}

export interface IFfmpegCommandExec extends ICommandExecutor {
	output: string;
}
