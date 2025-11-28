import express from 'express';
import * as metricsController from '../controllers/metricsController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/post/:postId', auth, metricsController.getPostMetrics);
router.get('/overview', auth, metricsController.getMetricsOverview);
router.get('/platform/:platform', auth, metricsController.getPlatformMetrics);
router.post('/refresh/:postId', auth, metricsController.refreshMetrics);

export default router;
