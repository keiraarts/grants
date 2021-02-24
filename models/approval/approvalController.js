const Approval = require('mongoose').model('Approval');
const auth = require('../../services/authorization-service');
const errorMessages = require('../../services/error-messages');

exports.submitApproval = (req, res) => {
  res.json(true);
};
