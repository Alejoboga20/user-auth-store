import { Request, Response } from 'express';
import { FileUploadService } from '../services/file-upload.service';
import { CustomError } from '../../domain';

export class FileUploadController {
	constructor(private readonly fileUploadService: FileUploadService) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message });
		}

		console.log(`Error: ${error}`);
		return res.status(500).json({ error: 'Internal Server Error' });
	};

	uploadFile = (req: Request, res: Response) => {
		if (!req.files || Object.keys(req.files).length === 0)
			return res.status(400).send('No files were selected.');

		const file = req.files.file;

		this.fileUploadService
			.uploadSingle(file as any)
			.then((uploaded) => res.json(uploaded))
			.catch((err) => this.handleError(err, res));
	};

	uploadMultipleFiles = (req: Request, res: Response) => {
		res.json({ message: 'Multiple files uploaded successfully' });
	};
}
