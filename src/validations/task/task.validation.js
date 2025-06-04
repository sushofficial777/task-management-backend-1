const Joi = require('joi');

const createTask = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        dueDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
        priority: Joi.string().valid('High', 'Medium', 'Low').required(),
        stage: Joi.string().valid('0', '1', '2').default('0'),
        team: Joi.string().required(),
        assignee: Joi.object({
            name: Joi.string().required(),
            id: Joi.string().required(),
        }),
        description: Joi.string().required(),
        notifications: Joi.number().default(0),
        completed: Joi.boolean().default(false),
        time: Joi.number(),
        startedAt: Joi.date(),
        endedAt: Joi.date(),
        isNotification: Joi.boolean()
    })
};

const updateTask = {
    params: Joi.object().keys({
        id: Joi.string().required()
    }),
    body: Joi.object().keys({
        title: Joi.string(),
        dueDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
        priority: Joi.string().valid('High', 'Medium', 'Low'),
        stage: Joi.string().valid('0', '1', '2'),
        team: Joi.string(),
        assignee: Joi.object({
            name: Joi.string().required(),
            id: Joi.string().required(),
        }),
        description: Joi.string(),
        notifications: Joi.number(),
        completed: Joi.boolean(),
        time: Joi.number(),
        startedAt: Joi.date(),
        endedAt: Joi.date(),
        isNotification: Joi.boolean(),
        files: Joi.array().items(Joi.string().uri()),   
        links: Joi.array().items(Joi.string().uri()) 
    }).min(1)
};

const getTask = {
    params: Joi.object().keys({
        id: Joi.string().required()
    })
};

module.exports = {
    createTask,
    updateTask,
    getTask
};