const applicant = require('./applicantController');

module.exports = (app) => {
  app.post('/api/submitApplication', applicant.submitApplication);
  app.post('/api/updateApplication', applicant.updateApplication);
  app.get('/api/viewAllApplications', applicant.viewAllApplications);
  app.get('/api/viewTopApplications', applicant.viewTopApplications);
  app.post('/api/approveApplicant', applicant.approveApplicant);
  app.post('/api/rejectApplicant', applicant.rejectApplicant);
  app.post('/api/flagApplicant', applicant.flagApplicant);
  app.post('/api/removeFlag', applicant.removeFlag);
  app.get('/api/asdf', applicant.asdf);
};
