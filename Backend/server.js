
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const taskRoutes = require('./routes/taskRoutes'); // Task routes
// const facultyRoutes = require('./routes/facultyRoutes'); // Faculty routes

// const app = express();
// app.use(cors());
// app.use(express.json()); // Middleware to parse JSON

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/Project', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected...'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Use API routes
// app.use('/api/tasks', taskRoutes); // Route for tasks
// app.use('/api/faculty', facultyRoutes); // Route for faculty

// // Start the server
// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const taskRoutes = require('./routes/taskRoutes');
// const facultyRoutes = require('./routes/facultyRoutes');
// const app = express();
// app.use(cors());
// app.use(express.json());
// mongoose.connect('mongodb://localhost:27017/Project', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected...'))
//   .catch(err => console.error('MongoDB connection error:', err));
// app.use('/api/tasks', taskRoutes); 
// app.use('/api/faculty', facultyRoutes); 
// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const facultyRoutes = require('./routes/facultyRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection string with your credentials
//const mongoURI = 'mongodb+srv://dileepgedela18:pzg00AYdPM8p5iKb@cluster0.mongodb.net/Managment?retryWrites=true&w=majority';
const mongoURI = "mongodb+srv://dileepgedela18:pzg00AYdPM8p5iKb@cluster0.cssru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Atlas connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use API routes
app.use('/api/tasks', taskRoutes); // Route for tasks
app.use('/api/faculty', facultyRoutes); // Route for faculty

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
