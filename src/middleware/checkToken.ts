import prisma from '../../prisma/db';

export const checkToken = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;

    if (!bearer) {
      res.status(401).send('Authorization Error');
      return;
    }

    const [, token] = bearer.split(' ');
    if (!token) {
      res.status(401).send('Authorization Error');
      return;
    }
    const validToken = await prisma.blackList.findFirst({
      where: {
        token
      }
    });
    if (!!validToken) {
      res.status(401).send('Invalid Token');
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};
