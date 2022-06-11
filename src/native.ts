import { spawn } from 'child_process';
import inquirer from 'inquirer';

(async function () {
	const { result: fullPath } = await inquirer.prompt([
		{
			type: 'input',
			name: 'result',
			message: 'Путь до исходного файла',
		},
	]);
	const { result: width } = await inquirer.prompt([
		{
			type: 'number',
			name: 'result',
			message: 'Ширина',
		},
	]);
	const { result: height } = await inquirer.prompt([
		{
			type: 'number',
			name: 'result',
			message: 'Высота',
		},
	]);
	const { result: name } = await inquirer.prompt([
		{
			type: 'input',
			name: 'result',
			message: 'Название',
		},
	]);
	const { result: ext } = await inquirer.prompt([
		{
			type: 'input',
			name: 'result',
			message: 'Расширение',
		},
	]);

	const path: string = fullPath.match(/(.+)\\.+/)[1];

	const res = spawn('ffmpeg', [
		'-i',
		fullPath,
		'-c:v',
		'libx264',
		'-s',
		`${width}x${height}`,
		`${path}\\${name}.${ext}`,
	]);

	res.stdout.on('data', (data: any) => {
		console.log(data.toString());
	});

	res.stderr.on('data', (data: any) => {
		console.log(data.toString());
	});

	res.on('close', () => {
		console.log('Done');
	});
})();
