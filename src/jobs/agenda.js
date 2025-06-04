const Agenda = require('agenda');
const { taskJobHandler } = require('./jobs.service');
const  { SCHEDULER_TYPES } = require('../config/appConstants');
const agenda = new Agenda({
  db: {
    address: process.env.MONGODB_URL,
    collection: 'agendaJobs',
    options: { useNewUrlParser: true, useUnifiedTopology: true }
  },
  processEvery: '30 seconds',
  maxConcurrency: 20
});

agenda.define(SCHEDULER_TYPES.TASK_JOB, async (job) => {
  const { taskId, userId, notificationType } = job.attrs.data;
  try {

    taskJobHandler({ taskId, userId, notificationType });

  } catch (error) {
    console.error('Error in send task notification job:', error);
  }

});


agenda.define(SCHEDULER_TYPES.TASK_STARTED, async (job) => {
  const { taskId, userId, notificationType } = job.attrs.data;
  try {

    taskJobHandler({ taskId, userId, notificationType });

  } catch (error) {
    console.error('Error in send task notification job:', error);
  }

});

// Start Agenda
(async function () {
  await agenda.start();
  console.log('Agenda scheduler started');
})();

// Graceful shutdown
process.on('SIGTERM', async () => {
  await agenda.stop();
  process.exit(0);
});

module.exports = agenda;