import { Router } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'требуется адрес электронной почты и пароль' });
    const u = await registerUser(email, password, name, role);
    res.status(201).json(u);
  } catch (e) { next(e) }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    if (!result) return res.status(401).json({ error: 'Неверные учетные данные' });
    res.json(result);
  } catch (e) { next(e) }
});

export default router;