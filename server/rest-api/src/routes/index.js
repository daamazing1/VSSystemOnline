import express from 'express';
import cardRoutes from './cards';

const router = express.Router();
router.get('/heath-check', (req, res) => res.send('OK'));

router.use('/cards', cardRoutes);

export default router;
