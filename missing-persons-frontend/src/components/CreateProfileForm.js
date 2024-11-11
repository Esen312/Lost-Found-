// src/components/CreateProfileForm.js
import React, { useState } from 'react';
import api from '../api';
import './CreateProfileForm.css';

const CreateProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    description: '',
    last_seen_location: '',
    latitude: '',
    longitude: '',
    status: 'missing',
    profile_type: 'person',
    photo: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      photo: file,
    }));
    setPreview(URL.createObjectURL(file)); // Устанавливаем URL для превью
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    try {
      await api.post('/profiles/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Профиль успешно создан');
      setFormData({
        name: '',
        age: '',
        description: '',
        last_seen_location: '',
        latitude: '',
        longitude: '',
        status: '',
        profile_type: 'person',
        photo: null,
      });
      setPreview(null); // Очищаем превью после успешного создания профиля
    } catch (error) {
      console.error('Ошибка при создании профиля:', error);
      alert('Не удалось создать профиль');
    }
  };

  return (
    <div className="create-profile-form">
      <h2>Создать новый профиль</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Фото:
          <input type="file" name="photo" onChange={handleFileChange} />
        </label>
        {preview && (
          <div className="preview">
            <p>Предпросмотр:</p>
            <img src={preview} alt="Превью" className="preview-image" />
          </div>
        )}
        <label>
          Имя:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Возраст:
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </label>
        <label>
          Описание:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>
          Последнее известное место:
          <input type="text" name="last_seen_location" value={formData.last_seen_location} onChange={handleChange} />
        </label>
        <label>
          Широта:
          <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} />
        </label>
        <label>
          Долгота:
          <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} />
        </label>
        <label>
          Статус:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="">Выберите статус</option>
            <option value="missing">Пропал</option>
            <option value="found">Найден</option>
            <option value="active">Активен</option>
          </select>
        </label>
        <label>
          Тип профиля:
          <select name="profile_type" value={formData.profile_type} onChange={handleChange}>
            <option value="person">Человек</option>
            <option value="animal">Животное</option>
          </select>
        </label>
        <button type="submit">Создать профиль</button>
      </form>
    </div>
  );
};

export default CreateProfileForm;
