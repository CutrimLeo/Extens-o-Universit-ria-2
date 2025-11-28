import express from 'express';
import * as socialController from '../controllers/socialController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/connect/:platform', auth, socialController.connectAccount);
router.get('/accounts', auth, socialController.getAccounts);
router.delete('/disconnect/:id', auth, socialController.disconnectAccount);
router.get('/validate/:id', auth, socialController.validateToken);

export default router;
