const applicant = require('./applicantController');

module.exports = (app) => {
  app.post('/submitApplication', applicant.submitApplication);
  app.post('/updateApplication', applicant.updateApplication);
  app.get('/viewAllApplications', applicant.viewAllApplications);
  app.post('/approveApplicant', applicant.approveApplicant);
  app.post('/rejectApplicant', applicant.rejectApplicant);
  app.post('/flagApplicant', applicant.flagApplicant);
  app.post('/removeFlag', applicant.removeFlag);
  app.get('/asdf', applicant.asdf);
};
