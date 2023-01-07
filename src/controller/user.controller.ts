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

export const logOut = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) {
      res.status(200).send('Logged out');
      return;
    }
    const [, token] = bearer.split(' ');
    if (!token) {
      res.status(200).send('Logged out');
      return;
    }
    // Add token to blacklist in service
    await userService.blacklistToken(token);
    req.user = null;
    res.status(200).send('Logged out');
  } catch (error) {
    next(error);
  }
};
