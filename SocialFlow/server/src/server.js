import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config.js';

import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import socialRoutes from './routes/social.js';
import metricsRoutes from './routes/metrics.js';
import activityRoutes from './routes/activities.js';
import errorHandler from './middleware/errorHandler.js';
import schedulerService from './services/schedulerService.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/activities', activityRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✓ Conectado ao MongoDB');
  
  schedulerService.start();
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✓ Servidor rodando na porta ${PORT}`);
  });
})
.catch((err) => {
  console.error('✗ Erro ao conectar ao MongoDB:', err);
  process.exit(1);
});

export default app;