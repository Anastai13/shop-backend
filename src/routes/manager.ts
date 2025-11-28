import { Router } from 'express';
import { prisma } from '../db/prisma';
import { authMiddleware, requireManager, AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

// Менеджер получает только отправленные корзины
router.get('/carts/sent', authMiddleware, requireManager, async (req: AuthRequest, res, next) => {
  try {
    const carts = await prisma.cart.findMany({
      where: { sent: true },
      include: {
        user: { select: { id: true, email: true, name: true, role: true } },
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { id: 'desc' } //  сортируем по ID
    });

    res.json(carts);
  } catch (e) {
    next(e);
  }
});

export default router;