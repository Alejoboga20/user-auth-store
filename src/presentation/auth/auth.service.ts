import { bcryptAdapter, JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import { LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';
import { CustomError } from '../../domain/errors/custom.error';

export class AuthService {
	constructor() {}

	private async generateToken(id: string, email: string) {
		const token = await JwtAdapter.generateToken({
			id,
			email,
		});

		if (!token) throw CustomError.internalServerError('Error generating token');

		return token;
	}

	public async registerUser(registerUserDto: RegisterUserDto) {
		const existUser = await UserModel.findOne({ email: registerUserDto.email });
		if (existUser) throw CustomError.badRequest('Email already exists');

		try {
			const newUser = new UserModel(registerUserDto);
			newUser.password = bcryptAdapter.hash(registerUserDto.password);

			await newUser.save();

			const { password, ...userEntity } = UserEntity.fromObject(newUser);

			const token = await this.generateToken(userEntity.id, userEntity.email);

			return {
				user: userEntity,
				token,
			};
		} catch (error) {
			throw CustomError.internalServerError(`Error creating user: ${error}`);
		}
	}

	public async loginUser(loginUserDto: LoginUserDto) {
		const { email, password } = loginUserDto;
		const user = await UserModel.findOne({ email });

		if (!user) throw CustomError.badRequest('Invalid User/Password combination');

		const isPasswordMatch = bcryptAdapter.compare(password, user.password);

		if (!isPasswordMatch) throw CustomError.badRequest('Invalid User/Password combination');

		const token = await this.generateToken(user.id, user.email);

		const userEntity = UserEntity.fromObject(user);

		return {
			user: userEntity,
			token,
		};
	}
}
