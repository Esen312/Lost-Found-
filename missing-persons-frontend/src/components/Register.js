// src/components/Register.js
import React, { useState } from 'react';
import api from '../api';
import './Auth.css';
import {Link} from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register/', formData);
      setMessage('Регистрация прошла успешно. Пожалуйста, войдите.');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setMessage('Не удалось зарегистрироваться. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Регистрация</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Имя пользователя:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Пароль:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p className="auth-footer">
        Нет аккаунта? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
};

export default Register;
