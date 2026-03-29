import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded._id).select('-password');

      next();
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  } catch (err) {
    res.status(401).send({ message: 'Invalid Token' });
  }
};