import { Router } from 'express';
import { ImageController } from './controller';

export class ImageRoutes {
	static get routes(): Router {
		const router = Router();
		const controller = new ImageController();

		router.get('/:type/:imageName', controller.getImage);

		return router;
	}
}
