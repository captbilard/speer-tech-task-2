import { Router } from 'express';
import { body } from 'express-validator';
import * as balanceController from '../controller/balance.controller';
import { validate } from '../middleware/validation';

const router = Router();

//Add balance
router.post(
  '/add-balance',
  body('amount'),
  validate,
  balanceController.addBalance
);

export default router;
