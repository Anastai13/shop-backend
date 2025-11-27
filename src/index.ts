import dotenv from 'dotenv';
dotenv.config();

import { buildApp } from './app';
import { connectDB } from './db/prisma';

const port = Number(process.env.PORT ?? 3000);
const app = buildApp();

connectDB().then(() => {
  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}).catch(err => {
  console.error('Failed to connect to DB', err);
  process.exit(1);
});