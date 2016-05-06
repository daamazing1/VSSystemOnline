import express from 'express';
import cardCtrl from '../controllers/card';
const router = express.Router();

router
  .route('/')
  .get(cardCtrl.list);
router
  .route('/query')
  .post(cardCtrl.query);


export default router;
