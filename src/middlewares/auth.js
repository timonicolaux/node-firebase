export const isAuth = async (req, res, next) => {
  try {
    if (req.session.isAuth) {
      next();
    } else {
      return res.status(401).send('Unauthorized');
    }
  } catch (error) {
    return next(error);
  }
};
