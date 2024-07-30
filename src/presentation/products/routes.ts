import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductController } from './controller';
import { ProductService } from '../services/product.service';

export class ProductRoutes {
	static get routes(): Router {
		const router = Router();
		const service = new ProductService();
		const controller = new ProductController(service);

		router.get('/', controller.getProducts);
		router.post('/', [AuthMiddleware.validateJwt], controller.createProduct);

		return router;
	}
}
