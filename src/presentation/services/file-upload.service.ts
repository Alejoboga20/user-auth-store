export class FileUploadService {
	constructor() {}

	private checkFolderExists(folderPath: string) {
		throw new Error('not implemmented');
	}

	uploadMultiple(
		file: File[],
		folder: string = 'uploads',
		validExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif']
	) {
		throw new Error('not implemented');
	}

	uploadSingle(
		file: File,
		folder: string = 'uploads',
		validExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif']
	) {
		throw new Error('not implemmented');
	}
}
