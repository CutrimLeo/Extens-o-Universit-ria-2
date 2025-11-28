import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ');

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
