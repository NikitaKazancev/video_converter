import FfmpegExecutor from './commands/ffmpeg/FfmpegExecutor';
import ConsoleLogger from './out/consoleLogger/ConsoleLogger';

export default class App {
	async run() {
		new FfmpegExecutor(ConsoleLogger.getInstance()).execute();
	}
}

const app = new App();
app.run();
