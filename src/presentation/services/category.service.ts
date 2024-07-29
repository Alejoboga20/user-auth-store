import { CategoryModel } from '../../data';
import { CustomError } from '../../domain';
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

	async getCategories() {
		try {
			const categories = await CategoryModel.find();

			return categories.map((category) => ({
				id: category.id,
				name: category.name,
				available: category.available,
			}));
		} catch (error) {
			throw CustomError.internalServerError('Error getting categories');
		}
	}
}
