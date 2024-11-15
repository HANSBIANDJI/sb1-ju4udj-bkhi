import { Router } from 'express';
import { 
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  cancelOrder
} from '../controllers/order.controller.js';
import { authenticateToken, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Routes client
router.post('/', authenticateToken, createOrder);
router.get('/my-orders', authenticateToken, getOrders);
router.get('/:id', authenticateToken, getOrder);
router.post('/:id/cancel', authenticateToken, cancelOrder);

// Routes admin
router.get('/', authenticateToken, isAdmin, getOrders);
router.put('/:id/status', authenticateToken, isAdmin, updateOrderStatus);

export default router;