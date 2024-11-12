// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import ProfileListPerson from './components/ProfileListPerson';
import ProfileListAnimals from './components/ProfileListAnimals';

import PersonProfileDetail from './components/PersonProfileDetail';
import AnimalProfileDetail from './components/AnimalProfileDetail';

import Register from './components/Register';
import Login from './components/Login';

import HomePage from './components/HomePage';


import CreatePersonProfile from "./components/CreatePersonProfile";
import CreateAnimalProfile from "./components/CreateAnimalProfile";

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

          <Route path="/" element={<HomePage />} />

          <Route path="/people" element={<ProfileListPerson profileType="person" searchTerm={searchTerm} />} />
          <Route path="/animals" element={<ProfileListAnimals profileType="animal" searchTerm={searchTerm} />} />

          <Route path="/people/:id" element={<PersonProfileDetail />} />
          <Route path="/animals/:id" element={<AnimalProfileDetail />} />

          <Route path="/create-person" element={<CreatePersonProfile />} />
          <Route path="/create-animal" element={<CreateAnimalProfile />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
