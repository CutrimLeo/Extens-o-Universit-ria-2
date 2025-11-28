import express from 'express';
import * as activityController from '../controllers/activityController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, activityController.getActivities);
router.get('/:id', auth, activityController.getActivity);

export default router;
