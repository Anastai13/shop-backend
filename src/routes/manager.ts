import { Router } from 'express';
import { prisma } from '../db/prisma';
import { authMiddleware, requireManager, AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

// Защитим endpoint — только менеджер
router.get('/carts/sent', authMiddleware, requireManager, async (req:AuthRequest, res, next) => {
  try {
    const carts = await prisma.cart.findMany({
      where: { sent: true },
      include: {
        user: { select: { id: true, email: true, name: true } },
        items: { include: { product: true } }
      },
      orderBy: { sentAt: 'desc' }
    });
    res.json(carts);
  } catch (e) { next(e) }
});

export default router;