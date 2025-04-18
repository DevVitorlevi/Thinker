// helpers/adminAuth.js

const adminAuth = (req, res, next) => {
    try {
      // 1. Verificar se o usuário está autenticado
      if (!req.user) {
        return res.status(401).json({ message: 'Não autorizado - usuário não autenticado' });
      }
  
      // 2. Verificar se o usuário tem permissão de admin
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Acesso negado - requer privilégios de administrador' });
      }
  
      // 3. Se tudo estiver ok, prosseguir para a próxima função middleware/controller
      next();
    } catch (error) {
      console.error('Erro no middleware adminAuth:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };
  
  module.exports = adminAuth;