import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validation';
import * as userController from '../controller/user.controller';

const authRouter = Router();

authRouter.post(
  '/user',
  [body('username').exists(), body('password').exists()],
  validate,
  userController.createUser
);

authRouter.post(
  '/login',
  [body('username').exists(), body('password').exists()],
  validate,
  userController.loginUser
);

export default authRouter;
