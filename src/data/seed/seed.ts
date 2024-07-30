import { envs } from '../../config';
import { MongoDatabase, CategoryModel, ProductModel, UserModel } from '../mongo';
import { seedData } from './seedData';

(async () => {
	await MongoDatabase.connect({
		dbName: envs.MONGO_DB_NAME,
		mongoUrl: envs.MONGO_URL,
	});
	await main();

	await MongoDatabase.disconnect();
})();

const randomBetween = (max: number) => {
	return Math.floor(Math.random() * max);
};

async function main() {
	// Clear the database
	await Promise.all([
		UserModel.deleteMany({}),
		CategoryModel.deleteMany({}),
		ProductModel.deleteMany({}),
	]);
	// Create Users
	const users = await UserModel.insertMany(seedData.users);
	// Create Categories
	const categories = await CategoryModel.insertMany(
		seedData.categories.map((category) => ({
			...category,
			user: users[randomBetween(users.length - 1)].id,
		}))
	);
	// Create Products
	const products = await ProductModel.insertMany(
		seedData.products.map((product) => ({
			...product,
			user: users[randomBetween(users.length - 1)].id,
			category: categories[randomBetween(categories.length - 1)].id,
		}))
	);
}
