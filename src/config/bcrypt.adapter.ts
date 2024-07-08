import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const bcryptAdapter = {
	hash: (password: string) => {
		const salt = genSaltSync(10);
		const hashedPassword = hashSync(password, salt);

		return hashedPassword;
	},
	compare: (password: string, hashedPassword: string) => {
		const isValidPassword = compareSync(password, hashedPassword);

		return isValidPassword;
	},
};
