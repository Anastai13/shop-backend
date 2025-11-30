import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middlewares/auth.middleware';
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/product.service';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await listProducts());
  } catch (e) { next(e); }
});

router.post('/', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { title, description, priceCents } = req.body;
    if (!title || !priceCents) return res.status(400).json({ error: 'title and priceCents required' });

    const p = await createProduct({ title, description, priceCents });
    res.status(201).json(p);
  } catch (e) { next(e); }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, description, priceCents } = req.body;

    const updated = await updateProduct(id, { title, description, priceCents });
    res.json(updated);
  } catch (e) { next(e); }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const result = await deleteProduct(id);
    res.json(result);
  } catch (e) { next(e); }
});

export default router;