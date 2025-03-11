

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import './FacultyDashboard.css';

// const FacultyDashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const location = useLocation();
//   const { facultyId, facultyName } = location.state || {}; // Destructure facultyId and facultyName from location state

//   useEffect(() => {
//     const fetchTasks = async () => {
//       if (!facultyId) {
//         console.error('No facultyId provided'); // Debugging
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:5000/api/tasks/faculty/${facultyId}`);
//         setTasks(response.data); // Set the tasks received from the API response
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, [facultyId]);

//   return (
//     <div className="dashboard-container">
//       <h2>Welcome, {facultyName}</h2>
//       <h3>Assigned Tasks</h3>
//       {
//         <ul className="task-list">
//           {tasks.length > 0 ? (
//             tasks.map((task) => (
//               <li className="task-card" key={task._id}>
//                 <p>{task.task}</p>
//               </li>
//             ))
//           ) : (
//             <p>No tasks assigned.</p>
//           )}
//         </ul>

//       }
//     </div>
//   );
// };

// export default FacultyDashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import './FacultyDashboard.css';

// const FacultyDashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [selectedStatus, setSelectedStatus] = useState({});
//   const [statusUpdateMessage, setStatusUpdateMessage] = useState({});
//   const location = useLocation();
//   const { facultyId, facultyName } = location.state || {};

//   useEffect(() => {
//     const fetchTasks = async () => {
//       if (!facultyId) {
//         console.error('No facultyId provided');
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:5000/api/tasks/faculty/${facultyId}`);
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, [facultyId]);

//   const handleStatusChange = (taskId, status) => {
//     setSelectedStatus((prevStatus) => ({
//       ...prevStatus,
//       [taskId]: status,
//     }));
//   };

//   const handleSubmitStatus = async (taskId, taskName) => {
//     if (!selectedStatus[taskId]) {
//       setStatusUpdateMessage((prevMessage) => ({
//         ...prevMessage,
//         [taskId]: 'Please select a status',
//       }));
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/tasks/updateStatus', {
//         taskId,
//         facultyId,
//         status: selectedStatus[taskId],
//         taskName,
//       });

//       setStatusUpdateMessage((prevMessage) => ({
//         ...prevMessage,
//         [taskId]: 'Status updated successfully',
//       }));
//     } catch (error) {
//       console.error('Error updating status:', error);
//       setStatusUpdateMessage((prevMessage) => ({
//         ...prevMessage,
//         [taskId]: 'Error updating status',
//       }));
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="header">
//         <h2>Welcome, {facultyName}</h2>
//         <h3 className="task-heading">Assigned Tasks</h3>
//       </div>
//       <ul className="task-list">
//         {tasks.length > 0 ? (
//           tasks.map((task) => (
//             <li className="task-card" key={task._id}>
//               <p>{task.task}</p>
//               <div className="status-buttons">
//                 <label>Status:</label>
//                 <button
//                   className={`status-btn ${selectedStatus[task._id] === 'pending' ? 'pending active' : 'pending'}`}
//                   onClick={() => handleStatusChange(task._id, 'pending')}
//                 >
//                   Pending
//                 </button>
//                 <button
//                   className={`status-btn ${selectedStatus[task._id] === 'ongoing' ? 'ongoing active' : 'ongoing'}`}
//                   onClick={() => handleStatusChange(task._id, 'ongoing')}
//                 >
//                   Ongoing
//                 </button>
//                 <button
//                   className={`status-btn ${selectedStatus[task._id] === 'completed' ? 'completed active' : 'completed'}`}
//                   onClick={() => handleStatusChange(task._id, 'completed')}
//                 >
//                   Completed
//                 </button>
//                 <button
//                   className="submit-btn"
//                   onClick={() => handleSubmitStatus(task._id, task.task)}
//                 >
//                   Submit
//                 </button>
//               </div>

//               {statusUpdateMessage[task._id] && (
//                 <p className="status-message">{statusUpdateMessage[task._id]}</p>
//               )}
//             </li>
//           ))
//         ) : (
//           <p>No tasks assigned.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default FacultyDashboard;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import './FacultyDashboard.css';

// const FacultyDashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [selectedStatus, setSelectedStatus] = useState({});
//   const [statusUpdateMessage, setStatusUpdateMessage] = useState({});
//   const location = useLocation();
//   const { facultyId, facultyName } = location.state || {};

//   useEffect(() => {
//     const fetchTasks = async () => {
//       if (!facultyId) {
//         console.error('No facultyId provided');
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:5000/api/tasks/faculty/${facultyId}`);
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, [facultyId]);

//   const handleStatusChange = (taskId, status) => {
//     setSelectedStatus((prevStatus) => ({
//       ...prevStatus,
//       [taskId]: status,
//     }));
//   };

//   const handleSubmitStatus = async (taskId, taskName) => {
//     if (!selectedStatus[taskId]) {
//         setStatusUpdateMessage((prevMessage) => ({
//             ...prevMessage,
//             [taskId]: 'Please select a status',
//         }));
//         return;
//     }

//     try {
//         const response = await axios.post('http://localhost:5000/api/tasks/updateStatus', {
//             taskId,
//             facultyId,
//             status: selectedStatus[taskId],
//             taskName,
//         });

//         const updatedStatus = response.data; // Assuming your API returns updated task info

//         // Update message based on successful status update
//         setStatusUpdateMessage((prevMessage) => ({
//             ...prevMessage,
//             [taskId]: 'Status updated successfully',
//         }));

//         // Update task status in UI
//         setTasks((prevTasks) =>
//             prevTasks.map((task) =>
//                 task._id === taskId ? { ...task, status: updatedStatus.status } : task
//             )
//         );
//     } catch (error) {
//         console.error('Error updating status:', error);
//         setStatusUpdateMessage((prevMessage) => ({
//             ...prevMessage,
//             [taskId]: 'Error updating status',
//         }));
//     }
// };

// const getCurrentStatus = (task) => {
//   return task.status && task.status !== '' ? task.status : 'Not assigned';
// };

//   return (
//     <div className="dashboard-container">
//       <div className="header">
//         <h2>Welcome, {facultyName}</h2>
//         <h3 className="task-heading">Assigned Tasks</h3>
//       </div>
//       <ul className="task-list">
//         {tasks.length > 0 ? (
//           tasks.map((task) => (
//             <li className="task-card" key={task._id}>
//               <p>{task.task}</p>
//               <div className="current-status">
//                 <label>Status: {getCurrentStatus(task)}</label>
//               </div>
//               <div className="status-buttons">
//                 <label>Change Status:</label>
//                 <button
//                   className={`status-btn ${selectedStatus[task._id] === 'pending' ? 'pending active' : 'pending'}`}
//                   onClick={() => handleStatusChange(task._id, 'pending')}
//                 >
//                   Pending
//                 </button>
//                 <button
//                   className={`status-btn ${selectedStatus[task._id] === 'ongoing' ? 'ongoing active' : 'ongoing'}`}
//                   onClick={() => handleStatusChange(task._id, 'ongoing')}
//                 >
//                   Ongoing
//                 </button>
//                 <button
//                   className={`status-btn ${selectedStatus[task._id] === 'completed' ? 'completed active' : 'completed'}`}
//                   onClick={() => handleStatusChange(task._id, 'completed')}
//                 >
//                   Completed
//                 </button>
//                 <button
//                   className="submit-btn"
//                   onClick={() => handleSubmitStatus(task._id, task.task)}
//                 >
//                   Submit
//                 </button>
//               </div>

//               {statusUpdateMessage[task._id] && (
//                 <p className="status-message">{statusUpdateMessage[task._id]}</p>
//               )}
//             </li>
//           ))
//         ) : (
//           <p>No tasks assigned.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default FacultyDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './FacultyDashboard.css';
const FacultyDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [statusUpdateMessage, setStatusUpdateMessage] = useState({});
  const location = useLocation();
  const { facultyId, facultyName } = location.state || {};
  useEffect(() => {
    const fetchTasks = async () => {
      if (!facultyId) {
        console.error('No facultyId provided');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/faculty/${facultyId}`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [facultyId]);
  const handleStatusChange = (taskId, status) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [taskId]: status,
    }));
  };
  const handleSubmitStatus = async (taskId, taskName) => {
    if (!selectedStatus[taskId]) {
      setStatusUpdateMessage((prevMessage) => ({
        ...prevMessage,
        [taskId]: 'Please select a status',
      }));
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/tasks/updateStatus', {
        taskId,
        facultyId,
        status: selectedStatus[taskId],
        taskName,
      });
      const updatedStatus = response.data.status; 
      setStatusUpdateMessage((prevMessage) => ({
        ...prevMessage,
        [taskId]: 'Status updated successfully',
      }));
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: updatedStatus } : task
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      setStatusUpdateMessage((prevMessage) => ({
        ...prevMessage,
        [taskId]: 'Error updating status',
      }));
    }
  };
  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>Welcome, {facultyName}</h2>
        <h3 className="task-heading">Assigned Tasks</h3>
      </div>
      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li className="task-card" key={task._id}>
              <p>{task.task}</p>
              <div className="current-status">
              <label>Status: {task.status || 'Not assigned'}</label> 
              </div>
              <div className="status-buttons">
                <label>Change Status:</label>
                <button
                  className={`status-btn ${selectedStatus[task._id] === 'pending' ? 'pending active' : 'pending'}`}
                  onClick={() => handleStatusChange(task._id, 'pending')}
                >
                  Pending
                </button>
                <button
                  className={`status-btn ${selectedStatus[task._id] === 'ongoing' ? 'ongoing active' : 'ongoing'}`}
                  onClick={() => handleStatusChange(task._id, 'ongoing')}
                >
                  Ongoing
                </button>
                <button
                  className={`status-btn ${selectedStatus[task._id] === 'completed' ? 'completed active' : 'completed'}`}
                  onClick={() => handleStatusChange(task._id, 'completed')}
                >
                  Completed
                </button>
                <button
                  className="submit-btn"
                  onClick={() => handleSubmitStatus(task._id, task.task)}
                >
                  Submit
                </button>
              </div>

              {statusUpdateMessage[task._id] && (
                <p className="status-message">{statusUpdateMessage[task._id]}</p>
              )}
            </li>
          ))
        ) : (
          <p>No tasks assigned.</p>
        )}
      </ul>
    </div>
  );
};
export default FacultyDashboard;
