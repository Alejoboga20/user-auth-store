import path from 'path';
import fs from 'fs';
import type { UploadedFile } from 'express-fileupload';

export class FileUploadService {
	constructor() {}

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
			this.checkFolderExists(destination);

			file.mv(destination + `/${file.name}.${fileExtension}`);
		} catch (error) {
			console.log({ error });
		}
	}
}
