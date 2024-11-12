// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Передаем значение поиска родительскому компоненту
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <h9>Lost&Found</h9>
      </Link>
      <div className="navbar-center">
        <Link to="/people">Люди</Link>
        <Link to="/animals">Животные</Link>
        <Link to="/create-person">Создать профиль человека</Link>
        <Link to="/create-animal">Создать профиль животного</Link>
      </div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="login-link">
        <Link to="/login">Войти</Link>
      </div>
    </nav>
  );
};

export default Navbar;
