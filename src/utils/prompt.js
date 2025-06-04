const { TASK_SCHEDULER_TYPES } = require('../config/appConstants');
const generateTaskPrompt = (task, notificationType) => {
    let prompt = '';

    switch (notificationType) {
        case TASK_SCHEDULER_TYPES.TASK_CREATED:
            prompt = `
            You are a smart assistant. Generate a single-line, fun and engaging reminder message in plain text only (no formatting or markdown).
            🎯 Use humor and emojis to make it friendly.
            🧼 Keep the message production-ready and clean.
            🚫 Do NOT include any explanations, labels, or extra words — just the message string itself.
            📝 Task Info:
            • Task Title: ${task.title}
            • Assigned To: ${task.assignee.id.name}
            • Description: ${task.description}
            • Due Date: ${task.dueDate}
            • Priority: ${task.priority}
            • Status: ${task.stage} (0 = Not started, 1 = In progress, 2 = Completed)
            ⚠️ Output must be a single short reminder message with emojis and humor, e.g., like: "🚨 Hey John! Your high-priority task 'Fix UI Bug' is due soon. Get moving before the code turns into spaghetti!"
            Now, generate the reminder message:
            `;

            break;
        case TASK_SCHEDULER_TYPES.TASK_REMINDER:
            prompt = `
            You are a witty, friendly assistant. Craft a short, clean, and fun reminder message in plain text (no markdown or formatting) for a user about their task.
            🎯 Make it funny, encouraging, and friendly.
            🧼 Production-ready output — no extra words, no labels.
            📛 Output only the message string. No prefixes, no explanations.
            📝 Task Details:
            • Task: ${task.title}
            • Assigned To: ${task.assignee.id.name}
            • Description: ${task.description}
            • Due Date: ${task.dueDate}
            • Priority: ${task.priority}
            • Status: ${task.stage} (0 = Not started, 1 = In progress, 2 = Completed)
            Example style: 
            "⏰ Hey Alex! Just popping in to say your task 'Submit TPS report' is still waiting. Let’s not ghost it 👻."
            Now generate your own message:
            `;
            break;

        case TASK_SCHEDULER_TYPES.TASK_STARTED:
            prompt = `
            You are a witty, friendly assistant. Generate a short, clean, and fun message in plain text to let a user know their task has officially started.
            🎯 Make it energetic, lightly funny, and motivating.
            🧼 Keep it production-ready — no extra labels, no formatting, and no explanations.
            🚫 Do NOT include markdown, emojis (optional but not necessary), or prefixes like "Reminder:"
            📛 Output ONLY the message string.
            📋 Task Info:
            • Task Title: ${task.title}
            • Assigned To: ${task.assignee.id.name}
            • Description: ${task.description}
            • Due Date: ${task.dueDate}
            • Priority: ${task.priority}
            • Estimated Time (hrs): ${task.time}
            • Start Time: ${task.startedAt}
            • Status Code: ${task.stage} (0 = Not started, 1 = In progress, 2 = Completed)
            
            ✅ Example Style:
            "Time to roll, Alex! ‘Submit TPS report’ has just kicked off. Make it legendary."
            
            Now generate your own message:
            `;
            break;

        case TASK_SCHEDULER_TYPES.TASK_COMPLETED:
            prompt = `
              You are a witty, friendly assistant. Craft a short, fun, and cheerful message in plain text to celebrate the user's task completion.
              
              🎉 The tone should be light-hearted, playful, and encouraging.
              🕒 Mention how long ago the task was completed using the provided endedAt timestamp.
              🕒 Mention the **exact time and date** the task was completed using the provided "endedAt" timestamp. Format it clearly.
              🧼 The output must be clean and production-ready. No labels, no formatting, no markdown.
              📛 Output only the message string. No JSON, no prefixes, no explanations.
              
              📋 Task Info:
              • Task Title: ${task.title}
              • Assigned To: ${task.assignee.id.name}
              • Description: ${task.description}
              • Due Date: ${task.dueDate}
              • Priority: ${task.priority}
              • Estimated Time (hrs): ${task.time}
              • Start Time: ${task.startedAt}
              • Completed At: ${task.endedAt}
              • Status Code: ${task.stage} (0 = Not started, 1 = In progress, 2 = Completed)
              
              ✅ Example style:
              "🎉 Woohoo! Alex wrapped up ‘Submit TPS report’ just at ''. Feels good to be on fire, huh?"
              
              Now generate a similar cheerful message:
              `;
            break;

        default:
            prompt = 'Generate a reminder message in palin text tell user to this is the remondar for task give only message no extra word and clean production ready in funny way';
    }

    return prompt;
};

module.exports = { generateTaskPrompt };