const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
      // Se o usuário estiver autenticado, vá para a próxima rota
      return next();
    } else {
      // Se o usuário não estiver autenticado, retorne um erro
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }
  };
  
  module.exports = { requireAuth };
  