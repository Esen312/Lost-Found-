// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <header className="home-page-header">
        <h1>Добро пожаловать на Lost&Found</h1>
        <p>
          Платформа для помощи в поиске пропавших людей и животных. Здесь вы можете публиковать объявления,
          искать и следить за обновлениями, а также делиться информацией в социальных сетях, чтобы помочь
          найти близких или домашних питомцев.
        </p>
      </header>
      <div className="home-page-content">
        <div className="home-page-section">
          <h2>Поиск пропавших</h2>
          <p>Просмотрите объявления о пропавших людях и животных в вашем районе.</p>
          <div className="home-page-links">
            <Link to="/people" className="home-page-button">Пропавшие люди</Link>
            <Link to="/animals" className="home-page-button">Пропавшие животные</Link>
          </div>
        </div>
        <div className="home-page-section">
          <h2>Добавить объявление</h2>
          <p>Создайте новое объявление, если кто-то из ваших близких или питомцев пропал.</p>
          <div className="home-page-links">
            <Link to="/create-person" className="home-page-button">Добавить человека</Link>
            <Link to="/create-animal" className="home-page-button">Добавить животное</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
