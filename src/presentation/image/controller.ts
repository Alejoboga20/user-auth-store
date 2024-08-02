import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

export class ImageController {
	constructor() {}

	getImage = (req: Request, res: Response) => {
		const { type = '', imageName = '' } = req.params;

		const imagePath = path.resolve(__dirname, `../../../uploads/${type}/${imageName}`);

		if (!fs.existsSync(imagePath)) {
			return res.status(404).json({ message: 'Image not found' });
		}

		res.sendFile(imagePath);
	};
}
