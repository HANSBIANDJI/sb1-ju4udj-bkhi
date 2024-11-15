import { Router } from 'express';
import { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/product.controller.js';
import { authenticateToken, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Routes publiques
router.get('/', getProducts);
router.get('/:id', getProduct);

// Routes protégées (admin uniquement)
router.post('/', authenticateToken, isAdmin, createProduct);
router.put('/:id', authenticateToken, isAdmin, updateProduct);
router.delete('/:id', authenticateToken, isAdmin, deleteProduct);

export default router;