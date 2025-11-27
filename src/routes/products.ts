import { Router } from 'express';
import { listProducts, createProduct } from '../services/product.service';
import { authMiddleware, AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', async (req, res, next) => {
  try { res.json(await listProducts()); } catch (e) { next(e) }
});

// защищённый маршрут для создания товара 
router.post('/', authMiddleware, async (req:AuthRequest, res, next) => {
  try {
    const { title, description, priceCents } = req.body;
    if (!title || !priceCents) return res.status(400).json({ error: 'title and priceCents required' });
    const p = await createProduct({ title, description, priceCents });
    res.status(201).json(p);
  } catch (e) { next(e) }
});

export default router;