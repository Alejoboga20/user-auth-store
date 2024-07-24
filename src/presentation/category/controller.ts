import { Request, Response } from 'express';
import { CustomError } from '../../domain';

export class CategoryController {
	// Dependency injection
	constructor() {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message });
		}

		console.log(`Error: ${error}`);
		return res.status(500).json({ error: 'Internal Server Error' });
	};

	getCategories = async (req: Request, res: Response) => {
		return res.json({ message: 'Categories' });
	};

	createCategory = async (req: Request, res: Response) => {
		return res.json({ message: 'Category created' });
	};
}
