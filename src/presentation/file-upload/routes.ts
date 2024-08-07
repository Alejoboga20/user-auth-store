import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';

const VALID_TYPES = ['users', 'products', 'categories'];

export class FileUploadRoutes {
	static get routes(): Router {
		const router = Router();
		const service = new FileUploadService();
		const controller = new FileUploadController(service);

		router.use(FileUploadMiddleware.containFiles);
		router.use(TypeMiddleware.validTypes(VALID_TYPES));

		router.post('/single/:type', controller.uploadFile);
		router.post('/multiple/:type', controller.uploadMultipleFiles);

		return router;
	}
}
