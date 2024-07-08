import { Request, Response } from 'express';
import { RegisterUserDto } from '../../domain';
import { AuthService } from './auth.service';

export class AuthController {
	// Dependency injection
	constructor(public readonly authService: AuthService) {}

	registerUser = (req: Request, res: Response) => {
		const [error, registerUserDto] = RegisterUserDto.create(req.body);

		if (error) return res.status(400).json({ error });

		this.authService.registerUser(registerUserDto!).then((user) => res.json(user));
	};

	loginUser = (req: Request, res: Response) => {
		res.json({ message: 'loginUser' });
	};

	validateEmail = (req: Request, res: Response) => {
		res.json({ message: 'validateEmail' });
	};
}
