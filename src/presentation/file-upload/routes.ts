import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';

export class FileUploadRoutes {
	static get routes(): Router {
		const router = Router();
		const service = new FileUploadService();
		const controller = new FileUploadController(service);

		router.post('/single/:type', controller.uploadFile);
		router.post('/multiple/:type', controller.uploadMultipleFiles);

		return router;
	}
}
