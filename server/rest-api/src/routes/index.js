import express from 'express';
import cardRoutes from './cards';
import lookupRoutes from './lookups';

const router = express.Router();
router.get('/heath-check', (req, res) => res.send('OK'));

router.use('/cards', cardRoutes);
router.use('/lookup', lookupRoutes);

export default router;
