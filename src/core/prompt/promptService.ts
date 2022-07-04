import inquirer from 'inquirer';
import { PromptType } from './prompt.types';

export default class PromptService {
	public async input<T>(message: string, type: PromptType) {
		const { res } = await inquirer.prompt<{ res: T }>({
			name: 'res',
			type,
			message,
		});

		return res;
	}
}
