



// const express = require('express');
// const Faculty = require('../models/Faculty');
// const router = express.Router();

// // Get all faculty members
// router.get('/', async (req, res) => {
//   try {
//     const facultyMembers = await Faculty.find();
//     res.json(facultyMembers);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch faculty members' });
//   }
// });

// // Add new faculty member
// router.post('/', async (req, res) => {
//   try {
//     const faculty = new Faculty({
//       name: req.body.name,
//       subjects: req.body.subjects,
//       password: req.body.password,
//     });
//     await faculty.save();
//     res.json(faculty);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add faculty member' });
//   }
// });

// // Login route for faculty members
// router.post('/login', async (req, res) => {
//   const { name, password } = req.body;

//   try {
//     // Perform case-insensitive search for faculty name
//     const faculty = await Faculty.findOne({
//       name: { $regex: new RegExp(`^${name}$`, 'i') }, // Case-insensitive search
//     });

//     if (faculty && faculty.password === password) {
//       res.json({ success: true, facultyId: faculty._id });
//     } else {
//       res.json({ success: false, message: 'Invalid username or password' });
//     }
//   } catch (error) {
//     console.error('Login failed:', error);
//     res.status(500).json({ error: 'Login failed' });
//   }
// });

// module.exports = router;



// const express = require('express');
// const Faculty = require('../models/Faculty');

// const router = express.Router();

// // Get all faculty members
// router.get('/', async (req, res) => {
//   try {
//     const facultyMembers = await Faculty.find();
//     res.json(facultyMembers);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch faculty members' });
//   }
// });

// // Add a new faculty member
// router.post('/', async (req, res) => {
//   const { name, subjects, password } = req.body;
//   try {
//     const faculty = new Faculty({ name, subjects, password });
//     await faculty.save();
//     res.json(faculty);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add faculty member' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const Faculty = require('../models/Faculty');
// const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// const router = express.Router();

// // Get all faculty members
// router.get('/', async (req, res) => {
//   try {
//     const facultyMembers = await Faculty.find();
//     res.json(facultyMembers);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch faculty members' });
//   }
// });

// // Route to add a new faculty member
// router.post('/', async (req, res) => {
//   const { name, subjects, password } = req.body;

//   try {
//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newFaculty = new Faculty({
//       name,
//       subjects,
//       password: hashedPassword, // Save the hashed password
//     });

//     const savedFaculty = await newFaculty.save();
//     res.json(savedFaculty);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add faculty member' });
//   }
// });



// module.exports = router;

const express = require('express');
const Faculty = require('../models/Faculty');
const bcrypt = require('bcrypt');
const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const facultyMembers = await Faculty.find();
    res.json(facultyMembers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch faculty members' });
  }
});
router.post('/', async (req, res) => {
  const { name, subjects, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newFaculty = new Faculty({
      name,
      subjects,
      password: hashedPassword, // Save the hashed password
    });
    const savedFaculty = await newFaculty.save();
    res.json(savedFaculty);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add faculty member' });
  }
});
router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const facultyMember = await Faculty.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (!facultyMember) {
      return res.status(400).json({ success: false, message: 'Faculty not found' });
    }
    const isMatch = await bcrypt.compare(password, facultyMember.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }
    res.json({ success: true, facultyId: facultyMember._id, facultyName: facultyMember.name });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});
module.exports = router;


