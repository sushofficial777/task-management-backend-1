const notificationModel = require('../models/notification.model');
const taskModel = require('../models/task.model');
const {generateTaskPrompt} = require('../utils/prompt')
const {generateMassageService} = require('../services/ai/ai.message.service');

const taskJobHandler = async ({ taskId, userId, notificationType }) => {
    try {
        const task = await taskModel.findById(taskId)
            .populate("assignee.id", "name profileImageUrl");

        if (!task) {
            console.log(`Task ${taskId} not found`);
            return;
        }

        const prompt = generateTaskPrompt(task,notificationType);

        const Message = await generateMassageService(prompt) || `Say cheese!`;

        const notification = new notificationModel({
            taskId: taskId,
            userId: userId,
            type: notificationType,
            message: Message,
        });

        await notification.save();

        console.log(`Notification for task ${taskId} sent successfully`);



    } catch (error) {
        console.error('Error in taskJobHandler:', error);
    }
};

module.exports = {
    taskJobHandler
}