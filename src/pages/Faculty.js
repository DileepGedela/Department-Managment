


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Faculty.css';

// const Faculty = () => {
//   const [facultyMembers, setFacultyMembers] = useState([]);
//   const [selectedFaculty, setSelectedFaculty] = useState(''); // Editable faculty name
//   const [password, setPassword] = useState(''); // Password field
//   const [loginError, setLoginError] = useState(false); // Error handling for login
//   const [showLogin, setShowLogin] = useState(false); // To display login form
//   const [error, setError] = useState(''); // Error handling for fetching faculty list
//   const navigate = useNavigate();

//   // Fetch the list of faculty members on component mount
//   useEffect(() => {
//     const fetchFacultyMembers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/faculty');
//         setFacultyMembers(response.data);
//       } catch (error) {
//         console.error('Error fetching faculty members:', error);
//         setError('Failed to load faculty members');
//       }
//     };

//     fetchFacultyMembers();
//   }, []);

//   // Handle form submission for login
//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       console.log('Attempting login with', { name: selectedFaculty, password }); // Debugging
//       const response = await axios.post('http://localhost:5000/api/faculty/login', {
//         name: selectedFaculty, // Use entered faculty name
//         password: password,
//       });

//       if (response.data.success) {
//         console.log('Login successful');
//         setFacultyId(response.data.facultyId);
//         navigate('/FacultyDashboard'); // Redirect on successful login
//       } else {
//         console.log('Login failed', response.data.message); // Debugging
//         setLoginError(true); // Show error if login fails
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setLoginError(true); // Set login error if something goes wrong
//     }
//   };

//   // When a faculty member is clicked, pre-fill the faculty name and open the login form
//   const handleFacultyClick = (facultyName) => {
//     setSelectedFaculty(facultyName); // Pre-fill selected faculty name
//     setShowLogin(true); // Show login form
//     setLoginError(false); // Reset login error
//   };

//   // Close the login form
//   const closeLogin = () => {
//     setShowLogin(false);
//     setSelectedFaculty(''); // Clear faculty name on close
//     setPassword(''); // Clear password on close
//   };

//   return (
//     <div className="faculty-container">
//       <h1>Our Faculty</h1>
//       {error && <p>{error}</p>}
//       <div className="faculty-list">
//         {facultyMembers.length > 0 ? (
//           facultyMembers.map((faculty) => (
//             <div
//               className="faculty-member"
//               key={faculty._id}
//               onClick={() => handleFacultyClick(faculty.name)}
//             >
//               <h3>{faculty.name}</h3>
//               <p>Subjects: {faculty.subjects}</p>
//             </div>
//           ))
//         ) : (
//           !error && <p>No faculty members found.</p>
//         )}
//       </div>

//       {showLogin && (
//         <div className="login-overlay" onClick={closeLogin}>
//           <div className="login-form" onClick={(e) => e.stopPropagation()}>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Username"
//                   value={selectedFaculty} // Pre-filled with selected faculty, but editable
//                   onChange={(e) => setSelectedFaculty(e.target.value)} // Editable username
//                   required
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={password} // Password field
//                   onChange={(e) => setPassword(e.target.value)} // Set password input
//                   required
//                   className="input-field"
//                 />
//               </div>
//               {loginError && <p style={{ color: 'red' }}>Invalid username or password!</p>}
//               <button type="submit">Login</button>
//               <button type="button" onClick={closeLogin}>Cancel</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Faculty;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Faculty.css';

const Faculty = () => {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacultyMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/faculty');
        setFacultyMembers(response.data);
      } catch (error) {
        console.error('Error fetching faculty members:', error);
        setError('Failed to load faculty members');
      }
    };

    fetchFacultyMembers();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/faculty/login', {
        name: selectedFaculty,
        password: password,
      });

      if (response.data.success) {
        const facultyId = response.data.facultyId;
        navigate('/FacultyDashboard', { state: { facultyId, facultyName: selectedFaculty } });
      } else {
        setLoginError(true);
      }
    } catch (error) {
      setLoginError(true);
    }
  };

  const handleFacultyClick = (facultyName) => {
    setSelectedFaculty(facultyName);
    setShowLogin(true);
    setLoginError(false);
  };

  const closeLogin = () => {
    setShowLogin(false);
    setSelectedFaculty('');
    setPassword('');
  };

  return (
    <div className="faculty-container">
      <h1>Our Faculty</h1>
      {error && <p>{error}</p>}
      <div className="faculty-list">
        {facultyMembers.length > 0 ? (
          facultyMembers.map((faculty) => (
            <div
              className="faculty-member"
              key={faculty._id}
              onClick={() => handleFacultyClick(faculty.name)}
            >
              <h3>{faculty.name}</h3>
              <p>Subjects: {faculty.subjects}</p>
            </div>
          ))
        ) : (
          !error && <p>No faculty members found.</p>
        )}
      </div>

      {showLogin && (
        <div className="login-overlay" onClick={closeLogin}>
          <div className="login-form" onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              {loginError && <p style={{ color: 'red' }}>Invalid username or password!</p>}
              <button type="submit">Login</button>
              <button type="button" onClick={closeLogin}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faculty;
