import React from 'react';
import dataScienceImage from '../assets/Data Sciecne.jpg'; // Import the image

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Department of Computer Science and Engineering (Data Science)</h1>
      <div className="department-info">
        <div className="department-section">
          <img src={dataScienceImage} alt="Data Science" className="department-img" />
          <p>The Department of Computer Science and Engineering focuses on the Data Science stream, offering students an in-depth knowledge of data-driven technologies, machine learning, and artificial intelligence.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
