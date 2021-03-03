const user = require('./userController');

module.exports = (app) => {
  app.post('/registerUser', user.register);
  app.post('/loginUser', user.login);
  app.get('/getAccount', user.getAccount);
};
