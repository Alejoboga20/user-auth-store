import path from 'path';
import fs from 'fs';
import type { UploadedFile } from 'express-fileupload';
import { UUIDAdapter } from '../../config';

export class FileUploadService {
	constructor(private readonly uuid = UUIDAdapter.v4) {}

	private checkFolderExists(folderPath: string) {
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath);
		}
	}

	uploadMultiple(
		file: File[],
		folder: string = 'uploads',
		validExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif']
	) {
		throw new Error('not implemented');
	}

	async uploadSingle(
		file: UploadedFile,
		folder: string = 'uploads',
		validExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif']
	) {
		try {
			const fileExtension = file.mimetype.split('/')[1];
			const destination = path.resolve(__dirname, '../../../', folder);
			const fileName = `${this.uuid()}.${fileExtension}`;

			this.checkFolderExists(destination);

			file.mv(`${destination}/${fileName}`);

			return { fileName };
		} catch (error) {
			console.log({ error });
		}
	}
}
