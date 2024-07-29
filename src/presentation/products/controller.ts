import { Request, Response } from 'express';
import { CreateProductDto, CustomError, PaginationDto } from '../../domain';
import { ProductService } from '../services/product.service';

export class ProductController {
	constructor(private readonly productService: ProductService) {}

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

		if (error) return res.status(400).json({ error });

		this.productService
			.getProduct(paginationDto!)
			.then((products) => res.json(products))
			.catch((error) => this.handleError(error, res));
	};

	createProduct = async (req: Request, res: Response) => {
		const [error, createProductDto] = CreateProductDto.create(req.body);

		if (error) return res.status(400).json({ error });

		this.productService
			.createProdcut(createProductDto!)
			.then((product) => res.json(product))
			.catch((error) => this.handleError(error, res));
	};
}
