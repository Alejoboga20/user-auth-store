import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import { UserEntity } from '../../domain';

export class AuthMiddleware {
	static async validateJwt(req: Request, res: Response, next: NextFunction) {
		const authorization = req.header('Authorization');

		if (!authorization) return res.status(401).json({ message: 'Unauthorized' });
		if (!authorization.startsWith('Bearer '))
			return res.status(401).json({ message: 'Invalid Bearer Token' });

		const token = authorization.split(' ')[1];

		try {
			const payload = await JwtAdapter.validateToken<{ id: string }>(token);
			if (!payload) return res.status(401).json({ message: 'Unauthorized' });

			const user = await UserModel.findById(payload.id);
			if (!user) return res.status(401).json({ message: 'Invalid Token' });

			req.body.user = UserEntity.fromObject(user);
			next();
		} catch (error) {
			console.log({ error });
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}
}
