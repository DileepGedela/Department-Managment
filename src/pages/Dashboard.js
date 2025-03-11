// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // For connecting to MongoDB
// import './Dashboard.css'; // Import CSS for styling

// const Dashboard = ({ username, setIsLoggedIn }) => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [selectedFaculty, setSelectedFaculty] = useState('');
//   const [newFacultyName, setNewFacultyName] = useState('');
//   const [newFacultySubjects, setNewFacultySubjects] = useState('');
//   const [newCircularFile, setNewCircularFile] = useState(null);
//   const [circularDate, setCircularDate] = useState('');
//   const [facultyMembers, setFacultyMembers] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('/api/tasks');
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     const fetchFacultyMembers = async () => {
//       try {
//         const response = await axios.get('/api/faculty');
//         setFacultyMembers(response.data); // Assuming response data contains faculty members
//       } catch (error) {
//         console.error('Error fetching faculty members:', error);
//       }
//     };

//     fetchTasks();
//     fetchFacultyMembers();
//   }, []);

//   const handleAddTask = async () => {
//     if (newTask.trim() && selectedFaculty) {
//       try {
//         const response = await axios.post('http://localhost:5000/api/tasks', {
//           task: newTask,
//           facultyId: selectedFaculty,
//         });
//         console.log('Response:', response.data);
//         setTasks((prevTasks) => [...prevTasks, response.data]); // Using functional update for tasks
//         setNewTask('');
//         setSelectedFaculty('');
//       } catch (error) {
//         console.error('Error adding task:', error);
//       }
//     } else {
//       alert('Please enter a task and select a faculty member.'); // User feedback
//     }
//   };

//   const handleAddFaculty = async () => {
//     if (newFacultyName.trim() && newFacultySubjects.trim()) {
//       try {
//         const response = await axios.post('http://localhost:5000/api/faculty', {
//           name: newFacultyName,
//           subjects: newFacultySubjects,
//         });
//         console.log('Faculty added:', response.data);
//         setFacultyMembers((prevFaculty) => [...prevFaculty, response.data]); // Update faculty members list
//         setNewFacultyName('');
//         setNewFacultySubjects('');
//       } catch (error) {
//         console.error('Error adding faculty:', error);
//       }
//     } else {
//       alert('Please enter both faculty name and subjects.'); // User feedback
//     }
//   };

//   const handleAddCircular = async () => {
//     if (newCircularFile && circularDate) {
//       const formData = new FormData();
//       formData.append('file', newCircularFile);
//       formData.append('date', circularDate);

//       try {
//         const response = await axios.post('http://localhost:5000/api/circulars', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data', // Set content type for file upload
//           },
//         });
//         console.log('Circular added:', response.data);
//         setNewCircularFile(null);
//         setCircularDate('');
//       } catch (error) {
//         console.error('Error adding circular:', error);
//       }
//     } else {
//       alert('Please select a file and choose a date.'); // User feedback
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-left">
//         <h3 className="welcome-username">Welcome, {username}</h3>
//         <h2>Assigned Tasks</h2>
//         <ul>
//           {tasks.map((task) => (
//             <li key={task._id}>{task.task}</li> // Use task._id as key
//           ))}
//         </ul>
//       </div>

//       <div className="dashboard-right">
//         <div className="task-section">
//           <h2>Add Task</h2>
//           <input
//             type="text"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="Add new task"
//           />
//           <select
//             value={selectedFaculty}
//             onChange={(e) => setSelectedFaculty(e.target.value)}
//           >
//             <option value="">Select Faculty</option>
//             {facultyMembers.map((faculty) => (
//               <option key={faculty._id} value={faculty._id}>{faculty.name}</option>
//             ))}
//           </select>
//           <button onClick={handleAddTask}>Add Task</button>
//         </div>

//         <div className="faculty-section">
//           <h2>Add Faculty</h2>
//           <input
//             type="text"
//             value={newFacultyName}
//             onChange={(e) => setNewFacultyName(e.target.value)}
//             placeholder="Faculty Name"
//           />
//           <input
//             type="text"
//             value={newFacultySubjects}
//             onChange={(e) => setNewFacultySubjects(e.target.value)}
//             placeholder="Subjects"
//           />
//           <button onClick={handleAddFaculty}>Add Faculty</button>
//         </div>

//         <div className="circular-section">
//           <h2>Add Circular</h2>
//           <input
//             type="file"
//             onChange={(e) => setNewCircularFile(e.target.files[0])}
//           />
//           <input
//             type="date"
//             value={circularDate}
//             onChange={(e) => setCircularDate(e.target.value)}
//           />
//           <button onClick={handleAddCircular}>Add Circular</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// Dashboard.js



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Dashboard.css';

// const Dashboard = ({ username, setIsLoggedIn }) => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [selectedFaculty, setSelectedFaculty] = useState('');
//   const [newFacultyName, setNewFacultyName] = useState('');
//   const [newFacultySubjects, setNewFacultySubjects] = useState('');
//   const [newFacultyPassword, setNewFacultyPassword] = useState(''); // Password state
//   const [facultyMembers, setFacultyMembers] = useState([]);
//   const [loadingFaculty, setLoadingFaculty] = useState(true);

//   // Fetch tasks and faculty members when component mounts
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/tasks');
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     const fetchFacultyMembers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/faculty');
//         setFacultyMembers(response.data);
//         setLoadingFaculty(false);
//       } catch (error) {
//         console.error('Error fetching faculty members:', error);
//         setLoadingFaculty(false);
//       }
//     };

//     fetchTasks();
//     fetchFacultyMembers();
//   }, []);

//   // Handle adding a new task
//  // Handle adding a new task
// const handleAddTask = async () => {
//   if (newTask.trim() && selectedFaculty) {
//     try {
//       // Find the selected faculty's name from the faculty list
//       const selectedFacultyData = facultyMembers.find(
//         (faculty) => faculty._id === selectedFaculty
//       );

//       if (!selectedFacultyData) {
//         alert('Faculty member not found.');
//         return;
//       }

//       // Send task, facultyId, and facultyName to the backend
//       const response = await axios.post('http://localhost:5000/api/tasks', {
//         task: newTask,
//         facultyId: selectedFaculty,
//         facultyName: selectedFacultyData.name, // Send faculty name to backend
//       });

//       setTasks((prevTasks) => [...prevTasks, response.data]);
//       setNewTask('');
//       setSelectedFaculty('');
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   } else {
//     alert('Please enter a task and select a faculty member.');
//   }
// };



//   // Handle adding a new faculty member
//   const handleAddFaculty = async () => {
//     if (newFacultyName.trim() && newFacultySubjects.trim() && newFacultyPassword.trim()) {
//       try {
//         const response = await axios.post('http://localhost:5000/api/faculty', {
//           name: newFacultyName,
//           subjects: newFacultySubjects,
//           password: newFacultyPassword, // Send password to the server
//         });
//         setFacultyMembers((prevFaculty) => [...prevFaculty, response.data]);
//         setNewFacultyName('');  // Clear input fields after adding
//         setNewFacultySubjects('');
//         setNewFacultyPassword('');
//       } catch (error) {
//         console.error('Error adding faculty:', error);
//       }
//     } else {
//       alert('Please enter faculty name, subjects, and password.');
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-left">
//         <h3 className="welcome-username">Welcome, {username}</h3>
//         <h2>Assigned Tasks</h2>
//         <ul>
//           {tasks.map((task) => (
//             <li key={task._id}>
//               {task.task} (Assigned to: {task.facultyId?.name || 'Unknown'})
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="dashboard-right">
//         <div className="task-section">
//           <h2>Add Task</h2>
//           <input
//             type="text"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="Add new task"
//           />
//           {loadingFaculty ? (
//             <p>Loading faculty members...</p>
//           ) : (
//             <select
//               value={selectedFaculty}
//               onChange={(e) => setSelectedFaculty(e.target.value)}
//             >
//               <option value="">Select Faculty</option>
//               {facultyMembers.map((faculty) => (
//                 <option key={faculty._id} value={faculty._id}>
//                   {faculty.name}
//                 </option>
//               ))}
//             </select>
//           )}
//           <button onClick={handleAddTask}>Add Task</button>
//         </div>

//         <div className="faculty-section">
//           <h2>Add Faculty</h2>
//           <input
//             type="text"
//             value={newFacultyName}
//             onChange={(e) => setNewFacultyName(e.target.value)}
//             placeholder="Faculty Name"
//           />
//           <input
//             type="text"
//             value={newFacultySubjects}
//             onChange={(e) => setNewFacultySubjects(e.target.value)}
//             placeholder="Subjects"
//           />
//           <input
//             type="password"
//             value={newFacultyPassword}
//             onChange={(e) => setNewFacultyPassword(e.target.value)}
//             placeholder="Password"
//           />
//           <button onClick={handleAddFaculty}>Add Faculty</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Dashboard.css';

// const Dashboard = ({ username, setIsLoggedIn }) => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [selectedFaculty, setSelectedFaculty] = useState('');
//   const [newFacultyName, setNewFacultyName] = useState('');
//   const [newFacultySubjects, setNewFacultySubjects] = useState('');
//   const [newFacultyPassword, setNewFacultyPassword] = useState(''); // Password state
//   const [facultyMembers, setFacultyMembers] = useState([]);
//   const [loadingFaculty, setLoadingFaculty] = useState(true);

//   // Fetch tasks and faculty members when component mounts
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/tasks');
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     const fetchFacultyMembers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/faculty');
//         setFacultyMembers(response.data);
//         setLoadingFaculty(false);
//       } catch (error) {
//         console.error('Error fetching faculty members:', error);
//         setLoadingFaculty(false);
//       }
//     };

//     fetchTasks();
//     fetchFacultyMembers();
//   }, []);

//   // Handle adding a new task
//   const handleAddTask = async () => {
//     if (newTask.trim() && selectedFaculty) {
//       try {
//         const selectedFacultyData = facultyMembers.find(
//           (faculty) => faculty._id === selectedFaculty
//         );

//         if (!selectedFacultyData) {
//           alert('Faculty member not found.');
//           return;
//         }

//         // Send task, facultyId, and facultyName to the backend
//         const response = await axios.post('http://localhost:5000/api/tasks', {
//           task: newTask,
//           facultyId: selectedFaculty,
//           facultyName: selectedFacultyData.name, // Send faculty name to backend
//         });

//         setTasks((prevTasks) => [...prevTasks, response.data]);
//         setNewTask('');
//         setSelectedFaculty('');
//       } catch (error) {
//         console.error('Error adding task:', error);
//       }
//     } else {
//       alert('Please enter a task and select a faculty member.');
//     }
//   };

//   // Handle adding a new faculty member
//   const handleAddFaculty = async () => {
//     if (newFacultyName.trim() && newFacultySubjects.trim() && newFacultyPassword.trim()) {
//       try {
//         const response = await axios.post('http://localhost:5000/api/faculty', {
//           name: newFacultyName,
//           subjects: newFacultySubjects,
//           password: newFacultyPassword, // The backend will hash this password
//         });

//         setFacultyMembers((prevFaculty) => [...prevFaculty, response.data]);
//         setNewFacultyName('');  // Clear input fields after adding
//         setNewFacultySubjects('');
//         setNewFacultyPassword('');
//       } catch (error) {
//         console.error('Error adding faculty:', error);
//       }
//     } else {
//       alert('Please enter faculty name, subjects, and password.');
//     }
//   };


//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-left">
//         <h3 className="welcome-username">Welcome, {username}</h3>
//         <h2>Assigned Tasks</h2>
//         <ul>
//           {tasks.map((task) => (
//             <li key={task._id}>
//               {task.task} (Assigned to: {task.facultyName})
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="dashboard-right">
//         <div className="task-section">
//           <h2>Add Task</h2>
//           <input
//             type="text"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="Add new task"
//           />
//           {loadingFaculty ? (
//             <p>Loading faculty members...</p>
//           ) : (
//             <select
//               value={selectedFaculty}
//               onChange={(e) => setSelectedFaculty(e.target.value)}
//             >
//               <option value="">Select Faculty</option>
//               {facultyMembers.map((faculty) => (
//                 <option key={faculty._id} value={faculty._id}>
//                   {faculty.name}
//                 </option>
//               ))}
//             </select>
//           )}
//           <button onClick={handleAddTask}>Add Task</button>
//         </div>

//         <div className="faculty-section">
//           <h2>Add Faculty</h2>
//           <input
//             type="text"
//             value={newFacultyName}
//             onChange={(e) => setNewFacultyName(e.target.value)}
//             placeholder="Faculty Name"
//           />
//           <input
//             type="text"
//             value={newFacultySubjects}
//             onChange={(e) => setNewFacultySubjects(e.target.value)}
//             placeholder="Subjects"
//           />
//           <input
//             type="password"
//             value={newFacultyPassword}
//             onChange={(e) => setNewFacultyPassword(e.target.value)}
//             placeholder="Password"
//           />
//           <button onClick={handleAddFaculty}>Add Faculty</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Dashboard.css';

// const Dashboard = ({ username, setIsLoggedIn }) => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [selectedFaculty, setSelectedFaculty] = useState('');
//   const [newFacultyName, setNewFacultyName] = useState('');
//   const [newFacultySubjects, setNewFacultySubjects] = useState('');
//   const [newFacultyPassword, setNewFacultyPassword] = useState(''); // Password state
//   const [facultyMembers, setFacultyMembers] = useState([]);
//   const [loadingFaculty, setLoadingFaculty] = useState(true);
//   const [taskStatuses, setTaskStatuses] = useState([]); // State to hold task statuses


//   // Function to fetch tasks
//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/tasks');
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   // Function to fetch faculty members
//   const fetchFacultyMembers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/faculty');
//       setFacultyMembers(response.data);
//       setLoadingFaculty(false);
//     } catch (error) {
//       console.error('Error fetching faculty members:', error);
//       setLoadingFaculty(false);
//     }
//   };

//   // Function to fetch task statuses
//   const fetchTaskStatuses = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/tasks/status');
//       console.log('Fetched task statuses:', response.data); // Log the fetched statuses
//       setTaskStatuses(response.data);
//     } catch (error) {
//       console.error('Error fetching task statuses:', error);
//     }
//   };

//   // Fetch tasks, faculty members, and task statuses when component mounts
//   useEffect(() => {
//     fetchTasks();
//     fetchFacultyMembers();
//     fetchTaskStatuses(); // Fetch task statuses on component mount
//   }, []);

//   // Handle adding a new task
//   const handleAddTask = async () => {
//     if (newTask.trim() && selectedFaculty) {
//       try {
//         const selectedFacultyData = facultyMembers.find(
//           (faculty) => faculty._id === selectedFaculty
//         );

//         if (!selectedFacultyData) {
//           alert('Faculty member not found.');
//           return;
//         }

//         // Send task, facultyId, and facultyName to the backend
//         const response = await axios.post('http://localhost:5000/api/tasks', {
//           task: newTask,
//           facultyId: selectedFaculty,
//           facultyName: selectedFacultyData.name, // Send faculty name to backend
//         });

//         setTasks((prevTasks) => [...prevTasks, response.data]);
//         setNewTask('');
//         setSelectedFaculty('');

//         // Optionally, fetch task statuses again to update the UI
//         fetchTaskStatuses(); // Update statuses after adding a task
//       } catch (error) {
//         console.error('Error adding task:', error);
//       }
//     } else {
//       alert('Please enter a task and select a faculty member.');
//     }
//   };

//   // Handle adding a new faculty member
//   const handleAddFaculty = async () => {
//     if (newFacultyName.trim() && newFacultySubjects.trim() && newFacultyPassword.trim()) {
//       try {
//         const response = await axios.post('http://localhost:5000/api/faculty', {
//           name: newFacultyName,
//           subjects: newFacultySubjects,
//           password: newFacultyPassword, // The backend will hash this password
//         });

//         setFacultyMembers((prevFaculty) => [...prevFaculty, response.data]);
//         setNewFacultyName('');  // Clear input fields after adding
//         setNewFacultySubjects('');
//         setNewFacultyPassword('');
//       } catch (error) {
//         console.error('Error adding faculty:', error);
//       }
//     } else {
//       alert('Please enter faculty name, subjects, and password.');
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-left">
//         <h3 className="welcome-username">Welcome, {username}</h3>
//         <h2>Assigned Tasks</h2>
//         <ul>
//           {tasks.map((task) => (
//             <li key={task._id}>
//               {task.task} (Assigned to: {task.facultyName})
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="dashboard-right">
//         <div className="task-section">
//           <h2>Add Task</h2>
//           <input
//             type="text"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="Add new task"
//           />
//           {loadingFaculty ? (
//             <p>Loading faculty members...</p>
//           ) : (
//             <select
//               value={selectedFaculty}
//               onChange={(e) => setSelectedFaculty(e.target.value)}
//             >
//               <option value="">Select Faculty</option>
//               {facultyMembers.map((faculty) => (
//                 <option key={faculty._id} value={faculty._id}>
//                   {faculty.name}
//                 </option>
//               ))}
//             </select>
//           )}
//           <button onClick={handleAddTask}>Add Task</button>
//         </div>

//         <div className="faculty-section">
//           <h2>Add Faculty</h2>
//           <input
//             type="text"
//             value={newFacultyName}
//             onChange={(e) => setNewFacultyName(e.target.value)}
//             placeholder="Faculty Name"
//           />
//           <input
//             type="text"
//             value={newFacultySubjects}
//             onChange={(e) => setNewFacultySubjects(e.target.value)}
//             placeholder="Subjects"
//           />
//           <input
//             type="password"
//             value={newFacultyPassword}
//             onChange={(e) => setNewFacultyPassword(e.target.value)}
//             placeholder="Password"
//           />
//           <button onClick={handleAddFaculty}>Add Faculty</button>
//         </div>

//         <div className="status-section">
//           <h2>Task Statuses</h2>
//           <ul>
//             {taskStatuses.length > 0 ? (
//               taskStatuses.map((status) => (
//                 <li key={status._id}>
//                   Task: {status.taskId.task}, Assigned to: {status.facultyId.name}, Status: {status.status}
//                 </li>
//               ))
//             ) : (
//               <p>No task statuses available.</p>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Dashboard.css';

// const Dashboard = ({ username, setIsLoggedIn }) => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [selectedFaculty, setSelectedFaculty] = useState('');
//   const [newFacultyName, setNewFacultyName] = useState('');
//   const [newFacultySubjects, setNewFacultySubjects] = useState('');
//   const [newFacultyPassword, setNewFacultyPassword] = useState('');
//   const [facultyMembers, setFacultyMembers] = useState([]);
//   const [loadingFaculty, setLoadingFaculty] = useState(true);
//   const [taskStatuses, setTaskStatuses] = useState([]);

//   // Fetch tasks
//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/tasks');
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   // Fetch faculty members
//   const fetchFacultyMembers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/faculty');
//       setFacultyMembers(response.data);
//       setLoadingFaculty(false);
//     } catch (error) {
//       console.error('Error fetching faculty members:', error);
//       setLoadingFaculty(false);
//     }
//   };

//   // Fetch task statuses
//   const fetchTaskStatuses = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/tasks/status');
//       setTaskStatuses(response.data);
//     } catch (error) {
//       console.error('Error fetching task statuses:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//     fetchFacultyMembers();
//     fetchTaskStatuses();
//   }, []);

//   // Handle adding a new task
//   const handleAddTask = async () => {
//     if (newTask.trim() && selectedFaculty) {
//       try {
//         const selectedFacultyData = facultyMembers.find(
//           (faculty) => faculty._id === selectedFaculty
//         );

//         if (!selectedFacultyData) {
//           alert('Faculty member not found.');
//           return;
//         }

//         const response = await axios.post('http://localhost:5000/api/tasks', {
//           task: newTask,
//           facultyId: selectedFaculty,
//           facultyName: selectedFacultyData.name,
//         });

//         setTasks((prevTasks) => [...prevTasks, response.data]);
//         setNewTask('');
//         setSelectedFaculty('');
//         fetchTaskStatuses();
//       } catch (error) {
//         console.error('Error adding task:', error);
//       }
//     } else {
//       alert('Please enter a task and select a faculty member.');
//     }
//   };

//   // Handle adding a new faculty member
//   const handleAddFaculty = async () => {
//     if (newFacultyName.trim() && newFacultySubjects.trim() && newFacultyPassword.trim()) {
//       try {
//         const response = await axios.post('http://localhost:5000/api/faculty', {
//           name: newFacultyName,
//           subjects: newFacultySubjects,
//           password: newFacultyPassword,
//         });

//         setFacultyMembers((prevFaculty) => [...prevFaculty, response.data]);
//         setNewFacultyName('');
//         setNewFacultySubjects('');
//         setNewFacultyPassword('');
//       } catch (error) {
//         console.error('Error adding faculty:', error);
//       }
//     } else {
//       alert('Please enter faculty name, subjects, and password.');
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-left">
//         <h3 className="welcome-username">Welcome, {username}</h3>
//         <h2>Assigned Tasks</h2>
//         <div className="task-grid">
//           {tasks.map((task) => (
//             <div key={task._id} className="task-item">
//               {task.task} <br />
//               (Assigned to: {task.facultyName})
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="dashboard-right">
//         <div className="task-section">
//           <h2>Add Task</h2>
//           <input
//             type="text"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="Add new task"
//           />
//           {loadingFaculty ? (
//             <p>Loading faculty members...</p>
//           ) : (
//             <select
//               value={selectedFaculty}
//               onChange={(e) => setSelectedFaculty(e.target.value)}
//             >
//               <option value="">Select Faculty</option>
//               {facultyMembers.map((faculty) => (
//                 <option key={faculty._id} value={faculty._id}>
//                   {faculty.name}
//                 </option>
//               ))}
//             </select>
//           )}
//           <button onClick={handleAddTask}>Add Task</button>
//         </div>

//         <div className="faculty-section">
//           <h2>Add Faculty</h2>
//           <input
//             type="text"
//             value={newFacultyName}
//             onChange={(e) => setNewFacultyName(e.target.value)}
//             placeholder="Faculty Name"
//           />
//           <input
//             type="text"
//             value={newFacultySubjects}
//             onChange={(e) => setNewFacultySubjects(e.target.value)}
//             placeholder="Subjects"
//           />
//           <input
//             type="password"
//             value={newFacultyPassword}
//             onChange={(e) => setNewFacultyPassword(e.target.value)}
//             placeholder="Password"
//           />
//           <button onClick={handleAddFaculty}>Add Faculty</button>
//         </div>

//         <div className="status-section">
//           <h2>Task Statuses</h2>
//           <div className="status-grid">
//             {taskStatuses.map((status) => (
//               <div key={status._id} className="status-item">
//                 Task: {status.taskId.task}, <br />
//                 Assigned to: {status.facultyId.name}, <br />
//                 Status: {status.status}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Dashboard.css';

// const Dashboard = ({ username, setIsLoggedIn }) => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [selectedFaculty, setSelectedFaculty] = useState('');
//   const [newFacultyName, setNewFacultyName] = useState('');
//   const [newFacultySubjects, setNewFacultySubjects] = useState('');
//   const [newFacultyPassword, setNewFacultyPassword] = useState('');
//   const [facultyMembers, setFacultyMembers] = useState([]);
//   const [loadingFaculty, setLoadingFaculty] = useState(true);
//   const [taskStatuses, setTaskStatuses] = useState([]);
//   const [statusUpdate, setStatusUpdate] = useState({}); // For handling status updates

//   const [successMessage, setSuccessMessage] = useState(''); // Success message state

//   // Fetch tasks
//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/tasks');
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   // Fetch faculty members
//   const fetchFacultyMembers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/faculty');
//       setFacultyMembers(response.data);
//       setLoadingFaculty(false);
//     } catch (error) {
//       console.error('Error fetching faculty members:', error);
//       setLoadingFaculty(false);
//     }
//   };

//   // Fetch task statuses
//   const fetchTaskStatuses = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/tasks/status');
//       setTaskStatuses(response.data);
//     } catch (error) {
//       console.error('Error fetching task statuses:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//     fetchFacultyMembers();
//     fetchTaskStatuses();
//   }, []);

//   // Handle adding a new task
//   const handleAddTask = async () => {
//     if (newTask.trim() && selectedFaculty) {
//       try {
//         const selectedFacultyData = facultyMembers.find(
//           (faculty) => faculty._id === selectedFaculty
//         );

//         if (!selectedFacultyData) {
//           alert('Faculty member not found.');
//           return;
//         }

//         const response = await axios.post('http://localhost:5000/api/tasks', {
//           task: newTask,
//           facultyId: selectedFaculty,
//           facultyName: selectedFacultyData.name,
//         });

//         setTasks((prevTasks) => [...prevTasks, response.data]);
//         setNewTask('');
//         setSelectedFaculty('');
//         fetchTaskStatuses();
//       } catch (error) {
//         console.error('Error adding task:', error);
//       }
//     } else {
//       alert('Please enter a task and select a faculty member.');
//     }
//   };

//   // Handle adding a new faculty member
//   const handleAddFaculty = async () => {
//     if (newFacultyName.trim() && newFacultySubjects.trim() && newFacultyPassword.trim()) {
//       try {
//         const response = await axios.post('http://localhost:5000/api/faculty', {
//           name: newFacultyName,
//           subjects: newFacultySubjects,
//           password: newFacultyPassword,
//         });

//         setFacultyMembers((prevFaculty) => [...prevFaculty, response.data]);
//         setNewFacultyName('');
//         setNewFacultySubjects('');
//         setNewFacultyPassword('');
//       } catch (error) {
//         console.error('Error adding faculty:', error);
//       }
//     } else {
//       alert('Please enter faculty name, subjects, and password.');
//     }
//   };

//   // const handleStatusChange = async (taskId, newStatus, comment, facultyId) => {
//   //   try {
//   //     const response = await axios.put(`http://localhost:5000/api/tasks/status/${taskId}`, {
//   //       status: newStatus,
//   //       facultyId: facultyId,
//   //     });

//   //     // Success message and refresh logic
//   //     setSuccessMessage(response.data.message);
//   //     setTimeout(() => setSuccessMessage(''), 3000);
//   //     fetchTaskStatuses();
//   //   } catch (error) {
//   //     console.error('Error updating task status:', error);
//   //   }
//   // };


//   // // Handle form input changes for status updates
//   // const handleStatusUpdateChange = (taskId, field, value) => {
//   //   setStatusUpdate((prevStatusUpdate) => ({
//   //     ...prevStatusUpdate,
//   //     [taskId]: {
//   //       ...prevStatusUpdate[taskId],
//   //       [field]: value,
//   //     },
//   //   }));
//   // };

//   const handleStatusChange = async (taskId, newStatus, facultyId) => {
//     if (!newStatus || !taskId || !facultyId) {
//       alert('Please select a valid status.');
//       return;
//     }

//     try {
//       const response = await axios.put(`http://localhost:5000/api/tasks/status/${taskId}`, {
//         status: newStatus, // The new status selected
//         facultyId: facultyId, // Pass the faculty ID to update the correct record
//       });

//       // Show success message
//       setSuccessMessage(response.data.message);
//       setTimeout(() => setSuccessMessage(''), 3000);

//       // Refresh the task statuses after successful update
//       fetchTaskStatuses();
//     } catch (error) {
//       console.error('Error updating task status:', error);
//     }
//   };

//   // Handle form input changes for status updates
//   const handleStatusUpdateChange = (taskId, field, value) => {
//     setStatusUpdate((prevStatusUpdate) => ({
//       ...prevStatusUpdate,
//       [taskId]: {
//         ...prevStatusUpdate[taskId],
//         [field]: value,
//       },
//     }));
//   };




//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-left">
//         <h3 className="welcome-username">Welcome, {username}</h3>
//         <h2>Assigned Tasks</h2>
//         <div className="task-grid">
//           {tasks.map((task) => (
//             <div key={task._id} className="task-item">
//               {task.task} <br />
//               (Assigned to: {task.facultyName})
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="dashboard-right">
//         <div className="task-section">
//           <h2>Add Task</h2>
//           <input
//             type="text"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="Add new task"
//           />
//           {loadingFaculty ? (
//             <p>Loading faculty members...</p>
//           ) : (
//             <select
//               value={selectedFaculty}
//               onChange={(e) => setSelectedFaculty(e.target.value)}
//             >
//               <option value="">Select Faculty</option>
//               {facultyMembers.map((faculty) => (
//                 <option key={faculty._id} value={faculty._id}>
//                   {faculty.name}
//                 </option>
//               ))}
//             </select>
//           )}
//           <button onClick={handleAddTask}>Add Task</button>
//         </div>

//         <div className="faculty-section">
//           <h2>Add Faculty</h2>
//           <input
//             type="text"
//             value={newFacultyName}
//             onChange={(e) => setNewFacultyName(e.target.value)}
//             placeholder="Faculty Name"
//           />
//           <input
//             type="text"
//             value={newFacultySubjects}
//             onChange={(e) => setNewFacultySubjects(e.target.value)}
//             placeholder="Subjects"
//           />
//           <input
//             type="password"
//             value={newFacultyPassword}
//             onChange={(e) => setNewFacultyPassword(e.target.value)}
//             placeholder="Password"
//           />
//           <button onClick={handleAddFaculty}>Add Faculty</button>
//         </div>

//         <div className="status-section">
//           <h2>Task Statuses</h2>
//           <div className="status-grid">
//             {taskStatuses.map((status) => (
//               <div key={status._id} className="status-item">
//                 Task: {status.taskId.task}, <br />
//                 Assigned to: {status.facultyId.name}, <br />
//                 Status: {status.status} <br />

//                 {/* Status Update Form */}
//                 <select
//                   value={statusUpdate[status._id]?.newStatus || ''}
//                   onChange={(e) =>
//                     handleStatusUpdateChange(status._id, 'newStatus', e.target.value)
//                   }
//                 >
//                   <option value="">Select Status</option>
//                   <option value="reassign">Reassign</option>
//                   <option value="done">Done</option>
//                 </select>
//                 <button
//                   onClick={() =>
//                     handleStatusChange(
//                       status.taskId._id, // Task ID
//                       statusUpdate[status._id]?.newStatus || '', // New Status
//                       status.facultyId._id // Faculty ID (pass it to the backend)
//                     )
//                   }
//                 >
//                   Submit
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Success message */}
//           {successMessage && <div className="success-message">{successMessage}</div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
const Dashboard = ({ username }) => {
  const [tasks, setTasks] = useState([]);
  const [taskStatuses, setTaskStatuses] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [newTask, setNewTask] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [newFacultyName, setNewFacultyName] = useState('');
  const [newFacultySubjects, setNewFacultySubjects] = useState('');
  const [newFacultyPassword, setNewFacultyPassword] = useState('');
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [loadingFaculty, setLoadingFaculty] = useState(true);
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  const fetchTaskStatuses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks/status');
      setTaskStatuses(response.data);
    } catch (error) {
      console.error('Error fetching task statuses:', error);
    }
  };
  const fetchFacultyMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/faculty');
      setFacultyMembers(response.data);
      setLoadingFaculty(false);
    } catch (error) {
      console.error('Error fetching faculty members:', error);
      setLoadingFaculty(false);
    }
  };
  useEffect(() => {
    fetchTasks();
    fetchFacultyMembers();
    fetchTaskStatuses();
  }, []);
  const handleAddTask = async () => {
    if (newTask.trim() && selectedFaculty) {
      try {
        const selectedFacultyData = facultyMembers.find(
          (faculty) => faculty._id === selectedFaculty
        );

        if (!selectedFacultyData) {
          alert('Faculty member not found.');
          return;
        }
        const response = await axios.post('http://localhost:5000/api/tasks', {
          task: newTask,
          facultyId: selectedFaculty,
          facultyName: selectedFacultyData.name,
        });
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setNewTask('');
        setSelectedFaculty('');
        fetchTaskStatuses();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    } else {
      alert('Please enter a task and select a faculty member.');
    }
  };
  const handleAddFaculty = async () => {
    if (newFacultyName.trim() && newFacultySubjects.trim() && newFacultyPassword.trim()) {
      try {
        const response = await axios.post('http://localhost:5000/api/faculty', {
          name: newFacultyName,
          subjects: newFacultySubjects,
          password: newFacultyPassword,
        });

        setFacultyMembers((prevFaculty) => [...prevFaculty, response.data]);
        setNewFacultyName('');
        setNewFacultySubjects('');
        setNewFacultyPassword('');
      } catch (error) {
        console.error('Error adding faculty:', error);
      }
    } else {
      alert('Please enter faculty name, subjects, and password.');
    }
  };
  const handleStatusUpdateChange = (taskId, value) => {
    setStatusUpdate((prevStatusUpdate) => ({
      ...prevStatusUpdate,
      [taskId]: value,
    }));
  };
  const handleStatusChange = async (taskId, newStatus, facultyId) => {
    if (!newStatus || !taskId || !facultyId) {
      alert('Please select a valid status.');
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/status/${taskId}`,
        {
          status: newStatus, 
          facultyId: facultyId,
        }
      );
      if (response.data && response.data.message) {
        setSuccessMessage(response.data.message);
      }
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchTaskStatuses();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <h3 className="welcome-username">Welcome, {username}</h3>
        <h2>Assigned Tasks</h2>
        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task._id} className="task-item">
              {task.task} <br />
              (Assigned to: {task.facultyName})
            </div>
          ))}
        </div>
      </div>
      <div className="dashboard-right">
        <div className="task-section">
          <h2>Add Task</h2>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task"
          />
          {loadingFaculty ? (
            <p>Loading faculty members...</p>
          ) : (
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
            >
              <option value="">Select Faculty</option>
              {facultyMembers.map((faculty) => (
                <option key={faculty._id} value={faculty._id}>
                  {faculty.name}
                </option>
              ))}
            </select>
          )}
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <div className="faculty-section">
          <h2>Add Faculty</h2>
          <input
            type="text"
            value={newFacultyName}
            onChange={(e) => setNewFacultyName(e.target.value)}
            placeholder="Faculty Name"
          />
          <input
            type="text"
            value={newFacultySubjects}
            onChange={(e) => setNewFacultySubjects(e.target.value)}
            placeholder="Subjects"
          />
          <input
            type="password"
            value={newFacultyPassword}
            onChange={(e) => setNewFacultyPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleAddFaculty}>Add Faculty</button>
        </div>
        <div className="status-section">
          <h2>Task Statuses</h2>
          <div className="status-grid">
            {taskStatuses.map((status) => (
              <div key={status._id} className="status-item">
                Task: {status.taskId.task}, <br />
                Assigned to: {status.facultyId.name}, <br />
                Status: {status.status} <br />

                {/* Status Update Form */}
                <select
                  value={statusUpdate[status._id] || ''}
                  onChange={(e) =>
                    handleStatusUpdateChange(status._id, e.target.value)
                  }
                >
                  <option value="">Select Status</option>
                  <option value="Reassign">Reassign</option>
                  <option value="Done">Done</option>
                </select>
                <button
                  onClick={() =>
                    handleStatusChange(
                      status.taskId._id, // Task ID
                      statusUpdate[status._id] || '', // New Status
                      status.facultyId._id // Faculty ID
                    )
                  }
                >
                  Submit
                </button>
              </div>
            ))}
          </div>

          {/* Success message */}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
