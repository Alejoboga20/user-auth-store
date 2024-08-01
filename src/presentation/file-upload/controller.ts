import { Request, Response } from 'express';
import { FileUploadService } from '../services/file-upload.service';
import { CustomError } from '../../domain';
import { UploadedFile } from 'express-fileupload';

const VALID_TYPES = ['users', 'products', 'categories'];

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
		const type = req.params.type;

		if (!VALID_TYPES.includes(type))
			return res.status(400).json({ error: 'Invalid type', validTypes: VALID_TYPES });

		const file = req.body.files[0] as UploadedFile;

		this.fileUploadService
			.uploadSingle(file, `uploads/${type}`)
			.then((uploaded) => res.json(uploaded))
			.catch((err) => this.handleError(err, res));
	};

	uploadMultipleFiles = (req: Request, res: Response) => {
		const type = req.params.type;

		if (!VALID_TYPES.includes(type))
			return res.status(400).json({ error: 'Invalid type', validTypes: VALID_TYPES });

		const files = req.body.files as UploadedFile[];

		this.fileUploadService
			.uploadMultiple(files, `uploads/${type}`)
			.then((uploaded) => res.json(uploaded))
			.catch((err) => this.handleError(err, res));
	};
}
