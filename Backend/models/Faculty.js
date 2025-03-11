

// const mongoose = require('mongoose');

// const facultySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   subjects: { type: String, required: true },
//   password: { type: String, required: true }, // Include password field
// }, { timestamps: true });

// module.exports = mongoose.model('Faculty', facultySchema);

const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subjects: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, // Password field
  },
});

module.exports = mongoose.model('Faculty', FacultySchema);
