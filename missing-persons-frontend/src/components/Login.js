// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './Auth.css';

const Login = ({ setAuthToken }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
      const response = await api.post('/login/', formData);
      if (response.data.access) {
        setAuthToken(response.data.access);  // Сохраняем токен в родительском компоненте
        setMessage('Вы успешно вошли в систему.');
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      setMessage('Не удалось войти. Проверьте имя пользователя и пароль.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Вход</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Имя пользователя:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <label>
          Пароль:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <button type="submit">Войти</button>
      </form>
      <p className="auth-footer">
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </div>
  );
};

export default Login;
