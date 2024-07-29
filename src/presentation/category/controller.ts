import { Request, Response } from 'express';
import { CreateCategoryDto, CustomError } from '../../domain';
import { CategoryService } from '../services/category.service';

export class CategoryController {
	// Dependency injection
	constructor(private readonly categoryService: CategoryService) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message });
		}

		console.log(`Error: ${error}`);
		return res.status(500).json({ error: 'Internal Server Error' });
	};

	getCategories = async (req: Request, res: Response) => {
		this.categoryService
			.getCategories()
			.then((categories) => res.status(200).json(categories))
			.catch((error) => this.handleError(error, res));
	};

	createCategory = (req: Request, res: Response) => {
		const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

		if (error) return res.status(400).json({ error });
		if (!createCategoryDto) return res.status(500).json({ error: 'Internal Server Error' });

		return this.categoryService
			.createCategory(createCategoryDto, req.body.user)
			.then((category) => res.status(201).json(category))
			.catch((error) => this.handleError(error, res));
	};
}
