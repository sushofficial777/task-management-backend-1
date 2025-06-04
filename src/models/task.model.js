const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  dueDate: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true
  },

  stage: {
    type: String,
    enum: ['0', '1', '2'], // 0: Not started, 1: In progress, 2: Completed
    default: '0'
  },
  team: {
    type: String,
    required: true
  },
  assignee: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  completed: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  },
  notifications: {
    type: Number,
    default: 0
  },
  time: {
    type: Number,
    required: false
  },
  startedAt: {
    type: Date,
    required: false
  },
  endedAt: {
    type: Date,
    required: false
  },
  files: {
    type: [String],
    required: false,
    default: [],
  },
  links: {
    type: [String],
    required: false,
    default: [],
  },


}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);