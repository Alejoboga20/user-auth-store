export class CreateCategoryDto {
	private constructor(public readonly name: string, public readonly available: boolean) {}

	static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
		const { name, available = false } = object;

		let availableBoolean = available;

		if (!name) {
			return ['Name is required'];
		}

		if (typeof name !== 'string') {
			return ['Name must be a string'];
		}

		if (name.length < 3) {
			return ['Name must be at least 3 characters long'];
		}

		if (typeof availableBoolean !== 'boolean') {
			availableBoolean = availableBoolean === 'true';
		}

		return [undefined, new CreateCategoryDto(name, availableBoolean)];
	}
}
