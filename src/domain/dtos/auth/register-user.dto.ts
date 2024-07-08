import { regularExps } from '../../../config';

export class RegisterUserDto {
	// Private constructor to only allow the static method to create instances
	private constructor(
		public readonly name: string,
		public readonly email: string,
		public readonly password: string
	) {}

	static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
		const { name, email, password } = object;

		if (!name) return ['Missing name'];
		if (!email) return ['Missing email'];
		if (!regularExps.email.test(email)) return ['Invalid email'];
		if (!password) return ['Missing password'];
		if (password.length < 6) return ['Password must be at least 6 characters long'];

		return [undefined, new RegisterUserDto(name, email, password)];
	}
}
