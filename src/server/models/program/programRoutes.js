const program = require('./programController');

module.exports = (app) => {
  app.get('/api/program/getPrograms', program.getPrograms);
  app.post('/api/program/getProgram', program.getProgram);
  app.post('/api/program/createProgram', program.createProgram);
  app.post('/api/program/updateProgram', program.updateProgram);
  app.post('/api/program/submitApplication', program.submitApplication);
  app.post('/api/program/updateApplication', program.updateApplication);
  app.get('/api/program/viewAllApplications', program.viewAllApplications);
  app.get('/api/program/viewTopApplications', program.viewTopApplications);
  app.post('/api/program/approveApplicant', program.approveApplicant);
  app.post('/api/program/rejectApplicant', program.rejectApplicant);
  app.post('/api/program/flagApplicant', program.flagApplicant);
  app.post('/api/program/removeFlag', program.removeFlag);
};
