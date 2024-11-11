// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfileList from './components/ProfileList';
import CreateProfileForm from './components/CreateProfileForm';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';

function App() {
  const [authToken, setAuthToken] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar onSearch={handleSearch} />
        <Routes>
          <Route path="/people" element={<ProfileList profileType="person" searchTerm={searchTerm} />} />
          <Route path="/animals" element={<ProfileList profileType="animal" searchTerm={searchTerm} />} />
          <Route path="/create" element={<CreateProfileForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
