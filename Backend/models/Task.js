
// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//   task: { type: String, required: true },
//   facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }, // Reference to faculty member
//   facultyName: { type: String, required: true }, // Store faculty name
// }, { timestamps: true });

// module.exports = mongoose.model('Task', taskSchema);


const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true,
  },
  facultyName: {
    type: String,
    required: true, // Store the faculty's name associated with the task
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
