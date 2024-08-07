import mongoose, { mongo } from 'mongoose';

interface Options {
	mongoUrl: string;
	dbName: string;
}

export class MongoDatabase {
	static async connect(options: Options) {
		const { mongoUrl, dbName } = options;

		try {
			await mongoose.connect(mongoUrl, {
				dbName,
			});
			console.log('Mongo connected');
		} catch (error) {
			console.log('Mongo connection error');
			throw error;
		}
	}

	static async disconnect() {
		await mongoose.disconnect();
		console.log('Mongo disconnected');
	}
}
