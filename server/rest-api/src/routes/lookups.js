import express from 'express';
import lookupCtrl from '../controllers/lookup';
const router = express.Router();

router
  .route('/teams')
  .get(lookupCtrl.teams);

router
  .route('/cardtypes')
  .get(lookupCtrl.cardTypes);

router
  .route('/powers')
  .get(lookupCtrl.powers);


export default router;
