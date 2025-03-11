
const express = require('express');
const multer = require('multer');
const Task = require('../models/Task');
const TaskStatus = require('../models/TaskStatus.js');
const Faculty = require('../models/Faculty');
const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('facultyId'); // Populate faculty details
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});
router.post('/', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.body.facultyId); // Find faculty by ID
    if (!faculty) {
      return res.status(400).json({ error: 'Faculty member not found' });
    }
    const task = new Task({
      task: req.body.task,
      facultyId: req.body.facultyId, 
      facultyName: faculty.name,     
    });

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add task' });
  }
});
router.get('/faculty/:facultyId', async (req, res) => {
  const { facultyId } = req.params;
  try {
    const tasks = await Task.find({ facultyId });
    const tasksWithStatus = await Promise.all(
      tasks.map(async (task) => {
        const taskStatus = await TaskStatus.findOne({ taskId: task._id, facultyId }).exec();
        return {
          ...task.toObject(),
          status: taskStatus ? taskStatus.status : 'Not assigned', // Use 'Not assigned' if no status is found
        };
      })
    );

    res.json(tasksWithStatus);
  } catch (error) {
    console.error('Error fetching tasks with statuses:', error);
    res.status(500).json({ error: 'Failed to fetch tasks with statuses' });
  }
});
router.post('/updateStatus', async (req, res) => {
  const { taskId, facultyId, status, taskName } = req.body;

  if (!taskId || !facultyId || !status || !taskName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const taskStatus = await TaskStatus.findOneAndUpdate(
      { taskId, facultyId }, // Find by taskId and facultyId
      { status, taskName },   // Update with new status and taskName
      { upsert: true, new: true } // Create if not exists, return new
    );

    res.json({ message: 'Task status updated successfully', taskStatus });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Failed to update task status' });
  }
});
router.get('/status', async (req, res) => {
  try {
    const taskStatuses = await TaskStatus.find()
      .populate('facultyId', 'name') // Populate faculty name
      .populate('taskId', 'task'); // Populate task details
    res.json(taskStatuses);
  } catch (error) {
    console.error('Error fetching task statuses:', error);
    res.status(500).json({ error: 'Failed to fetch task statuses' });
  }
});
router.put('/status/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { status, facultyId } = req.body;
  try {
    const updatedTaskStatus = await TaskStatus.findOneAndUpdate(
      { taskId: taskId, facultyId: facultyId }, // Ensure to match taskId and facultyId
      { status: status }, // Update the status
      { new: true } // Return the updated document
    );

    if (!updatedTaskStatus) {
      return res.status(404).json({ error: 'TaskStatus not found for this task and faculty' });
    }

    res.json({ message: 'Task status updated successfully', updatedTaskStatus });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Failed to update task status' });
  }
});

router.get('/api/tasks/faculty/:facultyId', async (req, res) => {
  try {
    const tasks = await Task.find({ facultyId: req.params.facultyId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});
router.post('/api/tasks/updateStatus', async (req, res) => {
  const { taskId, facultyId, status, taskName } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );
    if (task) {
      res.json({ status: 'reassigned' }); 
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating status' });
  }
});

module.exports = router;


// const express = require('express');
// const Task = require('../models/Task');
// const TaskStatus = require('../models/TaskStatus');
// const Faculty = require('../models/Faculty');
// const router = express.Router();

// // Get all tasks with faculty information
// router.get('/', async (req, res) => {
//   try {
//     const tasks = await Task.find().populate('facultyId'); // Populate faculty details
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch tasks' });
//   }
// });

// // Add a new task and assign it to a faculty member
// router.post('/', async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.body.facultyId); // Find faculty by ID
//     if (!faculty) {
//       return res.status(400).json({ error: 'Faculty member not found' });
//     }

//     // Save both facultyId and facultyName
//     const task = new Task({
//       task: req.body.task,
//       facultyId: req.body.facultyId, // Reference to the selected faculty
//       facultyName: faculty.name,     // Store faculty name alongside the task
//     });

//     await task.save();
//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add task' });
//   }
// });

// // Get tasks for a specific faculty
// router.get('/faculty/:facultyId', async (req, res) => {
//   const { facultyId } = req.params;
//   try {
//     const tasks = await Task.find({ facultyId }); // Ensure tasks are filtered by facultyId
//     res.json(tasks);
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//     res.status(500).json({ error: 'Failed to fetch tasks' });
//   }
// });

// router.put('/status/:taskId', async (req, res) => {
//   const { taskId } = req.params; // Extract taskId from the route parameter
//   const { status, comment, facultyId } = req.body; // Extract status, comment, and facultyId from the request body

//   try {
//     // Find the task by ID and update its status and comment
//     const task = await Task.findById(taskId);

//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     // Update the task's status and comment
//     task.status = status;
//     task.comment = comment;
//     task.facultyId = facultyId; // Optionally update facultyId if needed

//     // Save the updated task
//     await task.save();

//     return res.status(200).json({ message: 'Task status updated successfully' });
//   } catch (error) {
//     console.error('Error updating task status:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;
