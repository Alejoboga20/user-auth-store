import { CategoryModel } from '../../data';
import { CustomError, PaginationDto } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { UserEntity } from '../../domain/entities/user.entity';

export class CategoryService {
	constructor() {}

	async createCategory(createCategoryDto: CreateCategoryDto, userEntity: UserEntity) {
		const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name });

		if (categoryExists) {
			throw CustomError.badRequest('Category already exists');
		}

		try {
			const newCategory = new CategoryModel({
				...createCategoryDto,
				user: userEntity.id,
			});
			await newCategory.save();

			return {
				id: newCategory.id,
				name: newCategory.name,
				available: newCategory.available,
			};
		} catch (error) {
			console.log({ error });
			throw CustomError.internalServerError('Error creating category');
		}
	}

	async getCategories(paginationDto: PaginationDto) {
		const { page, limit } = paginationDto;

		try {
			const [totalCount, categories] = await Promise.all([
				CategoryModel.countDocuments(),
				CategoryModel.find()
					.skip((page - 1) * limit)
					.limit(limit),
			]);

			return {
				categories: categories.map((category) => ({
					id: category.id,
					name: category.name,
					available: category.available,
				})),
				currentPage: page,
				limit,
				nextPage: page + 1,
				total: totalCount,
			};
		} catch (error) {
			throw CustomError.internalServerError('Error getting categories');
		}
	}
}
