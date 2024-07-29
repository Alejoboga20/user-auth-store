import { ProductModel } from '../../data';
import { CreateProductDto, CustomError } from '../../domain';
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';

export class ProductService {
	constructor() {}

	async createProdcut(createProductDto: CreateProductDto) {
		const product = ProductModel.findOne({ name: createProductDto.name });

		if (!product) throw CustomError.badRequest('Product already exists');

		try {
			const newProduct = new ProductModel(createProductDto);
			await newProduct.save();

			return { newProduct };
		} catch (error) {
			console.log({ error });
			throw CustomError.internalServerError('Error creating product');
		}
	}

	async getProduct(paginationDto: PaginationDto) {
		const { page, limit } = paginationDto;

		try {
			const [totalCount, products] = await Promise.all([
				ProductModel.countDocuments(),
				ProductModel.find()
					.skip((page - 1) * limit)
					.limit(limit),
			]);

			return {
				products,
				currentPage: page,
				limit,
				nextPage: page + 1,
				total: totalCount,
			};
		} catch (error) {
			throw CustomError.internalServerError('Error getting products');
		}
	}
}
