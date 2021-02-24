require('./userModel.js');
const user = require('./userController');

module.exports = (app) => {
  app.post('/registerUser', user.register);
};
