import { Request, Response } from 'express';

export class FileUploadController {
	constructor() {}

	uploadFile = (req: Request, res: Response) => {
		res.json({ message: 'File uploaded successfully' });
	};

	uploadMultipleFiles = (req: Request, res: Response) => {
		res.json({ message: 'Multiple files uploaded successfully' });
	};
}
