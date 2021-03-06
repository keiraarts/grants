const user = require('./userController');

module.exports = (app) => {
  app.post('/api/registerUser', user.register);
  app.post('/api/loginUser', user.login);
  app.get('/api/getAccount', user.getAccount);
  app.post('/api/updateUser', user.updateUser);
  app.post('/api/verifyWallet', user.verifyWallet);
  app.post('/api/sendEmailVerification', user.sendEmailVerification);
  app.post('/api/verifyEmail', user.verifyEmail);
};
