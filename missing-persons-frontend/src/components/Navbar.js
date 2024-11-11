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
      <h1 className="navbar-logo">Lost&Found</h1>
      <div className="navbar-center">
        <Link to="/people">Люди</Link>
        <Link to="/animals">Животные</Link>
        <Link to="/create">Создать Профиль</Link>
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
