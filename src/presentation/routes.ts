import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { ProductRoutes } from './products/routes';
import { FileUploadRoutes } from './file-upload/routes';
import { ImageRoutes } from './image/routes';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/api/auth', AuthRoutes.routes);
		router.use('/api/category', CategoryRoutes.routes);
		router.use('/api/product', ProductRoutes.routes);
		router.use('/api/file-upload', FileUploadRoutes.routes);
		router.use('/api/image', ImageRoutes.routes);

		return router;
	}
}
