

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/About';
// import Faculty from './pages/Faculty';
// import Circular from './pages/Circular';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';

// import './App.css';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState('');

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUsername(''); // Clear username after logout
//     window.location.href = '/'; // Redirect to home page after logout
//   };

//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <div className="brand">
//             <h1>Computer Science and Engineering (Data Science)</h1>
//           </div>
//           <nav className="nav-links">
//             <ul>
//               <li>
//                 <Link to="/">Home</Link>
//               </li>
//               <li>
//                 <Link to="/about">About</Link>
//               </li>
//               <li>
//                 <Link to="/faculty">Faculty</Link>
//               </li>
//               <li>
//                 <Link to="/circular">Circular</Link>
//               </li>
//               {!isLoggedIn ? (
//                 <li>
//                   <Link to="/login">Login</Link>
//                 </li>
//               ) : (
//                 <li style={{ cursor: 'pointer' }} onClick={handleLogout}>
//                   Logout
//                 </li>
//               )}
//             </ul>
//           </nav>
//         </header>
//         <Routes>
//           <Route
//             path="/"
//             element={isLoggedIn ? <Dashboard username={username} setIsLoggedIn={setIsLoggedIn} /> : <Home />}
//           />
//           <Route path="/about" element={<About />} />
//           <Route path="/faculty" element={<Faculty />} />
//           <Route path="/circular" element={<Circular />} />
//           <Route
//             path="/login"
//             element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />}
//           />
//           <Route
//             path="/dashboard"
//             element={
//               isLoggedIn ? (
//                 <Dashboard username={username} setIsLoggedIn={setIsLoggedIn} />
//               ) : (
//                 <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
//               )
//             }
//           />
          
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Faculty from './pages/Faculty';
import Circular from './pages/Circular';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FacultyDashboard from './pages/FacultyDashboard'; // Adjusted import path if needed
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [facultyId, setFacultyId] = useState(''); // Declare facultyId state

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername(''); // Clear username after logout
    setFacultyId(''); // Clear facultyId after logout
    window.location.href = '/'; // Redirect to home page after logout
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="brand">
            <h1>Computer Science and Engineering (Data Science)</h1>
          </div>
          <nav className="nav-links">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/faculty">Faculty</Link>
              </li>
              <li>
                <Link to="/circular">Circular</Link>
              </li>
              {!isLoggedIn ? (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              ) : (
                <li style={{ cursor: 'pointer' }} onClick={handleLogout}>
                  Logout
                </li>
              )}
            </ul>
          </nav>
        </header>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard username={username} setIsLoggedIn={setIsLoggedIn} /> : <Home />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/circular" element={<Circular />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setFacultyId={setFacultyId} />}
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard username={username} setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
              )
            }
          />
          <Route
            path="/FacultyDashboard"
            element={<FacultyDashboard username={username} facultyId={facultyId} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
