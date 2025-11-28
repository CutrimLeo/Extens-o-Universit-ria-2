const errorHandler = (err, req, res, next) => {
  console.error('❌ Erro:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Erro de validação',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'ID inválido' });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Erro interno do servidor'
  });
};

export default errorHandler;
