import { bcryptAdapter, envs, JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import { LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';
import { CustomError } from '../../domain/errors/custom.error';
import { EmailService } from './email.service';

export class AuthService {
	constructor(private readonly emailService: EmailService) {}

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
			await this.sendEmailValidationLink(registerUserDto.email);

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

	private sendEmailValidationLink = async (email: string) => {
		const token = await JwtAdapter.generateToken({ email });

		if (!token) throw CustomError.internalServerError('Error generating token');

		const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

		const html = `
      <h1>Click on the link below to validate your email</h1>
      <div>
        <p>Click on the following link: </p><a href="${link}">Validate Email</a>
      </div>`;

		const options = {
			to: email,
			subject: 'Validate your email',
			htmlBody: html,
		};

		const isSent = await this.emailService.sendEmail(options);

		if (!isSent) throw CustomError.internalServerError('Error sending email');

		return true;
	};

	public validateEmail = async (token: string) => {
		const payload = await JwtAdapter.validateToken(token);
		if (!payload) throw CustomError.badRequest('Invalid token');

		const { email } = payload as { email: string };
		if (!email) throw CustomError.internalServerError('Error validating email');

		const user = await UserModel.findOne({ email });
		if (!user) throw CustomError.internalServerError('Error finding the email');

		user.emailValidated = true;
		await user.save();

		return { message: 'Email validated' };
	};
}
