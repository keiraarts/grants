const user = require('./userController');

module.exports = (app) => {
  app.post('/api/registerUser', user.register);
  app.post('/api/loginUser', user.login);
  app.get('/api/getAccount', user.getAccount);
  app.post('/api/verifyWallet', user.verifyWallet);
};
