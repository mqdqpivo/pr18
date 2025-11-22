module.exports = (req, res, next) => {
  // Простейшая имитация задержки сети
  // setTimeout(next, 500); 
  
  // Если это логин, пропускаем
  if (req.path === '/auth/login' || (req.path === '/users' && req.method === 'GET')) {
    next();
    return;
  }

  // Для остальных запросов проверяем наличие заголовка (упрощенно)
  // В реальном проекте здесь была бы валидация JWT
  /*
  if (req.method !== 'GET' && !req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  */
  
  next();
}
