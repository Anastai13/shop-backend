import express from 'express';
import authRouter from './routes/auth';
import productsRouter from './routes/products';
import cartsRouter from './routes/carts';
import managerRouter from './routes/manager';

export function buildApp() {
  const app = express();
  app.use(express.json());

  app.use('/api/auth', authRouter);
  app.use('/api/products', productsRouter);
  app.use('/api/carts', cartsRouter);
  app.use('/api/manager', managerRouter);

  app.use((req, res) => res.status(404).json({ error: 'Not Found' }));
  app.use((err:any, _req:any, res:any, _next:any) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
}