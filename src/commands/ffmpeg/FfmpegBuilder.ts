export default class FfmpegBuilder {
	private inputPath: string;
	private args: string[];

	constructor() {
		this.args.push('-c:v', 'libx264');
	}

	input(inputPath: string): this {
		this.inputPath = inputPath;
		return this;
	}

	setSize(width: number, height: number): this {
		this.args.push('-s', `${width}x${height}`);
		return this;
	}

	output(outputPath: string): string[] {
		return ['-i', this.inputPath, ...this.args, outputPath];
	}
}
