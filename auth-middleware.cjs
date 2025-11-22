module.exports = (req, res, next) => {
  // Простейшая имитация задержки сети
  // setTimeout(next, 500); 
  
  // Если это логин, пропускаем
  if (req.path === '/auth/login' || (req.path === '/users' && req.method === 'GET')) {
    next();
    return;
  }

  next();
}
