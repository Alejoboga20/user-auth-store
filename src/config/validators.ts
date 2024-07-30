import mongoose from 'mongoose';

export class Validators {
	static isMongoID(id: string): boolean {
		const isValidObjectId = mongoose.isValidObjectId(id);

		return isValidObjectId;
	}
}
