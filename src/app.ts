import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { body } from 'express-validator';
import * as userController from './controller/user.controller'


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello from server' });
});

app.use('/api/v1', (req,res)=>{})
app.post(
  '/user',
  [body('username').exists(), body('password').exists()], userController.createUser);
app.post(
  '/login',
  [body('username').exists(), body('password').exists()], userController.loginUser);

app.use((err, req, res, next) => {
  if (err.type == 'auth') {
    res.status(401).json({ message: 'Invalid Username or Password' });
  } else if (err.type == 'input') {
    res.status(400).json({ message: `Bad Request, ${err.message}` });
  } else if (err.type == 'not found') {
    res.status(404).json({ message: `${err.message}` });
  } else {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default app;
