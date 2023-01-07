import * as userService from '../services/user.service';


export const createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const response = await userService.create(username, password);
    res.status(201).json({ token: response.token });
  } catch (e) {
    e.type = 'input';
    next(e);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const response = await userService.signIn(username, password);
    res.status(200).json({ token: response.token });
  } catch (e) {
    e.type = 'auth';
    next(e);
  }
};