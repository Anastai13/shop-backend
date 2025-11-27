import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middlewares/auth.middleware';
import { getOrCreateActiveCartForUser, addItemToCart, sendCart } from '../services/cart.service';

const router = Router();
router.use(authMiddleware);

router.get('/active', async (req:AuthRequest, res, next) => {
  try { res.json(await getOrCreateActiveCartForUser(req.userId!)); } catch (e) { next(e) }
});

router.post('/items', async (req:AuthRequest, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const item = await addItemToCart(req.userId!, Number(productId), Number(quantity ?? 1));
    res.status(201).json(item);
  } catch (e) { next(e) }
});

router.post('/:id/send', async (req:AuthRequest, res, next) => {
  try {
    const id = Number(req.params.id);
    const updated = await sendCart(id, req.userId!);
    res.json(updated);
  } catch (e) { next(e) }
});

export default router;