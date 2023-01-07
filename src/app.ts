import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { logOut } from './controller/user.controller';
import { checkToken } from './middleware/checkToken';
import { authGuard } from './utils/authUtils';
import router from './router/router';
import { handleError } from './middleware/error';
import authRouter from './router/authRoute';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello from server' });
});
app.get('/logout', logOut);
app.use('/auth', authRouter);
app.use('/api/v1', checkToken, authGuard, router);

app.use(handleError);

export default app;
