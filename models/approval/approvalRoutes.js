require('./approvalModel.js');
const approval = require('./approvalController');

module.exports = (app) => {
  app.post('/submitApproval', approval.submitApproval);
};
