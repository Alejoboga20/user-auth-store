import { bcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import { RegisterUserDto, UserEntity } from '../../domain';
import { CustomError } from '../../domain/errors/custom.error';

export class AuthService {
	constructor() {}

	public async registerUser(registerUserDto: RegisterUserDto) {
		const existUser = await UserModel.findOne({ email: registerUserDto.email });
		if (existUser) throw CustomError.badRequest('Email already exists');

		try {
			const newUser = new UserModel(registerUserDto);
			newUser.password = bcryptAdapter.hash(registerUserDto.password);

			await newUser.save();

			/* Encrypt Password */
			/* Generate JWT */
			/* Send confirmation email */
			const { password, ...userEntity } = UserEntity.fromObject(newUser);

			return { user: userEntity };
		} catch (error) {
			throw CustomError.internalServerError(`Error creating user: ${error}`);
		}
	}
}
