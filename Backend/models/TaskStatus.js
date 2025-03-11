// const mongoose = require('mongoose');

// // Define the TaskStatus schema
// const taskStatusSchema = new mongoose.Schema({
//   taskId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Task',
//     required: true,
//   },
//   facultyId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Faculty',
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'ongoing', 'completed'],
//     default: 'pending',
//   },
//   taskName: {
//     type: String,
//     required: true,
//   },
// }, { timestamps: true });

// // Create the TaskStatus model
// const TaskStatus = mongoose.model('TaskStatus', taskStatusSchema);
// module.exports = TaskStatus;


const mongoose = require('mongoose');

// Define the TaskStatus schema
const taskStatusSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'ongoing', 'completed','Reassign','Done'],
    default: 'pending',
  },
  taskName: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Create the TaskStatus model
const TaskStatus = mongoose.model('TaskStatus', taskStatusSchema);
module.exports = TaskStatus;
