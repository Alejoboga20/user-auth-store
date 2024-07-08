import { UserModel } from '../../data';
import { RegisterUserDto } from '../../domain';
import { CustomError } from '../../domain/errors/custom.error';

export class AuthService {
	constructor() {}

	public async registerUser(registerUserDto: RegisterUserDto) {
		const { email, name, password } = registerUserDto;

		const existUser = await UserModel.findOne({ email });
		if (existUser) throw CustomError.badRequest('Email already exists');

		return 'registerUser';
	}
}
