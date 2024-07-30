import { Validators } from '../../../config';

export class CreateProductDto {
	private constructor(
		public readonly name: string,
		public readonly price: number,
		public readonly description: string,
		public readonly available: boolean,
		public readonly user: string, // ID
		public readonly category: string // ID
	) {}

	static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
		const { name, price, description, available, user, category } = props;

		if (!name) return ['Name is required'];
		if (!price) return ['Price is required'];
		if (!user) return ['User is required'];
		if (!category) return ['Category is required'];

		if (!Validators.isMongoID(user)) return ['User is invalid'];
		if (!Validators.isMongoID(category)) return ['Category is invalid'];

		return [
			undefined,
			new CreateProductDto(name, price, description, Boolean(available), user, category),
		];
	}
}
