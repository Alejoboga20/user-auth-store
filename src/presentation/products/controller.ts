import { Request, Response } from 'express';
import { CustomError, PaginationDto } from '../../domain';

export class ProductController {
	constructor() {}
	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message });
		}

		console.log(`Error: ${error}`);
		return res.status(500).json({ error: 'Internal Server Error' });
	};

	getProducts = async (req: Request, res: Response) => {
		const { page = 1, limit = 10 } = req.query;
		const [error, paginationDto] = PaginationDto.create(Number(page), Number(limit));
	};

	createProduct = async (req: Request, res: Response) => {};
}
