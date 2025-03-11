
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import axios from 'axios'; // Import axios for API requests
// import './Login.css'; // Import the CSS file

// const Login = ({ setIsLoggedIn, setUsername }) => {
//   const [showLogin, setShowLogin] = useState(false);
//   const [username, setLoginUsername] = useState(''); // Temporary username state for input
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState(false);
//   const [facultyMembers, setFacultyMembers] = useState([]); // State to hold faculty members
//   const [selectedFaculty, setSelectedFaculty] = useState(''); // Track the selected faculty name
//   const navigate = useNavigate(); // Initialize useNavigate for navigation

//   // Fetch faculty members from the backend when the component mounts
//   useEffect(() => {
//     const fetchFacultyMembers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/faculty'); // Adjust URL to your API endpoint
//         setFacultyMembers(response.data); // Assuming response.data is an array of faculty members
//       } catch (error) {
//         console.error('Error fetching faculty members:', error);
//       }
//     };

//     fetchFacultyMembers();
//   }, []);

//   const handleLogin = (event) => {
//     event.preventDefault();

//     if (selectedFaculty === 'Selvani Deepthi' && password === '1234') {
//       // If login for Selvani Deepthi is correct
//       setIsLoggedIn(true);
//       setUsername(selectedFaculty);
//       navigate('/Dashboard');
//     } else if (password === 'facultyPassword') {
//       // Replace 'facultyPassword' with real validation for other faculty
//       setIsLoggedIn(true);
//       setUsername(selectedFaculty);
//       navigate('/Dashboard');
//     } else {
//       setLoginError(true);
//     }
//   };

//   const handleFacultyClick = (facultyName) => {
//     setShowLogin(true);
//     setLoginError(false); // Reset error state when opening login
//     setLoginUsername(facultyName); // Automatically fill the username with selected faculty name
//     setSelectedFaculty(facultyName);
//   };

//   return (
//     <div className="login-container">
//       <h1>Login</h1>
//       <div className="hod-section">
//         <div className="hod-info">
//           <p onClick={() => handleFacultyClick('Selvani Deepthi')} style={{ cursor: 'pointer', color: 'blue' }}>
//             Dr. Selvani Deepthi
//           </p>
//           <p>Specialization: Data Science and Machine Learning</p>
//         </div>
//       </div>
//       <div className="faculty-section">
//         <h2>Faculty Members</h2>
//         <div className="faculty-info">
//           {facultyMembers.length > 0 ? (
//             facultyMembers.map((faculty) => (
//               <div
//                 className="faculty-member"
//                 key={faculty._id} // Assuming _id is the unique identifier for each faculty
//                 onClick={() => handleFacultyClick(faculty.name)}
//                 style={{ cursor: 'pointer', color: 'blue' }}
//               >
//                 <p>{faculty.name}</p>
//                 <p>Specialization: {faculty.subjects}</p>
//               </div>
//             ))
//           ) : (
//             <p>No faculty members available.</p> // Message when no faculty members are available
//           )}
//         </div>
//       </div>

//       {showLogin && (
//         <div className="login-overlay" onClick={() => setShowLogin(false)}>
//           <div className="login-form" onClick={(e) => e.stopPropagation()}>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Username"
//                   value={username}
//                   onChange={(e) => setLoginUsername(e.target.value)}
//                   required
//                   className="input-field username"
//                   readOnly // Make the username input read-only
//                 />
//               </div>
//               <div>
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="input-field password"
//                 />
//               </div>
//               {loginError && <p style={{ color: 'red' }}>Invalid username or password!</p>}
//               <button type="submit">Submit</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
const Login = ({ setIsLoggedIn, setUsername, setFacultyId }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setLoginUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFacultyMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/faculty');
        setFacultyMembers(response.data);
      } catch (error) {
        console.error('Error fetching faculty members:', error);
      }
    };
    fetchFacultyMembers();
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    if (selectedFaculty === 'Dr. Selvani Deepthi' && password === '1234') {
      // Hardcoded login for Dr. Selvani Deepthi
      setIsLoggedIn(true);
      setUsername(selectedFaculty);
      //setFacultyId('someFacultyId'); // Replace with actual ID if needed
      navigate('/Dashboard');
    } else {
      // For other faculty members, check credentials via backend
      try {
        const response = await axios.post('http://localhost:5000/api/faculty/login', {
          name: selectedFaculty,
          password: password,
        });

        if (response.data.success) {
          setIsLoggedIn(true);
          setUsername(selectedFaculty);
          setFacultyId(response.data.facultyId); // Set the faculty ID from response
          navigate('/FacultyDashboard');
        } else {
          setLoginError(true); // Invalid credentials
        }
      } catch (error) {
        console.error('Login error:', error);
        setLoginError(true); // API request failed
      }
    }
  };
  const handleFacultyClick = (facultyName) => {
    setShowLogin(true);
    setLoginError(false);
    setLoginUsername(facultyName);
    setSelectedFaculty(facultyName);
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="hod-section">
        <div className="hod-info">
          <p
            onClick={() => handleFacultyClick('Dr. Selvani Deepthi')}
            style={{ cursor: 'pointer', color: 'blue' }}
          >
            Dr. Selvani Deepthi
          </p>
          <p>Specialization: Data Science and Machine Learning</p>
        </div>
      </div>
      <div className="faculty-section">
        <h2>Faculty Members</h2>
        <div className="faculty-info">
          {facultyMembers.length > 0 ? (
            facultyMembers.map((faculty) => (
              <div
                className="faculty-member"
                key={faculty._id}
                onClick={() => handleFacultyClick(faculty.name)}
                style={{ cursor: 'pointer', color: 'blue' }}
              >
                <p>{faculty.name}</p>
                <p>Specialization: {faculty.subjects}</p>
              </div>
            ))
          ) : (
            <p>No faculty members available.</p>
          )}
        </div>
      </div>
      {showLogin && (
        <div className="login-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-form" onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                  className="input-field username"
                  readOnly
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field password"
                />
              </div>
              {loginError && <p style={{ color: 'red' }}>Invalid username or password!</p>}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;
