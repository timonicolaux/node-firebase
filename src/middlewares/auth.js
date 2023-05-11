import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const JWT = require('jsonwebtoken');

export const isAuth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  try {
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    JWT.verify(token, process.env.JWT_PRIVATE_KEY, function (err) {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        next();
      }
    });
  } catch (error) {
    return next(error);
  }
};
