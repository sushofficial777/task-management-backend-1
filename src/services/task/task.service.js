
const agenda = require('../../jobs/agenda');
const { SCHEDULER_TYPES, TASK_SCHEDULER_TYPES } = require('../../config/appConstants');
const scheduleTaskNotifications = async (task, type) => {
  const now = new Date();

  let notificationSchedules = [];

  switch (type) {
    case TASK_SCHEDULER_TYPES.TASK_COMPLETED:
      notificationSchedules = [
        { time: new Date(Date.now() + 1 * 1000), type: TASK_SCHEDULER_TYPES.TASK_COMPLETED },
      ];
      break;
    case TASK_SCHEDULER_TYPES.TASK_STARTED:
      notificationSchedules = [
        { time: new Date(Date.now() + 1 * 1000), type: TASK_SCHEDULER_TYPES.TASK_STARTED },
      ]
      break;
    case TASK_SCHEDULER_TYPES.TASK_REMINDER:
      notificationSchedules = [
        { time: new Date(Date.now() + task.notifications * 60 * 1000), type: SCHEDULER_TYPES.TASK_REMINDER }
      ]
      break;
    case TASK_SCHEDULER_TYPES.TASK_CREATED:
      notificationSchedules = [
        { time: new Date(Date.now() + 1 * 1000), type: TASK_SCHEDULER_TYPES.TASK_CREATED },
      ]
      break;
    default:
      break;
  }



  for (const schedule of notificationSchedules) {
    if (schedule.time > now) {
      await agenda.schedule(schedule.time, SCHEDULER_TYPES.TASK_JOB, {
        taskId: task._id,
        userId: task.assignee.id,
        notificationType: schedule.type
      });
      console.log(`notification scheduled for - ${schedule.type}`);
    }
  }
};

module.exports = { scheduleTaskNotifications };