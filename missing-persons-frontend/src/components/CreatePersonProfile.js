// src/components/CreatePersonProfile.js
import React, { useState } from 'react';
import api from '../api';
import './CreateProfileForm.css';

const CreatePersonProfile = () => {
  const [formData, setFormData] = useState({
    applicant_name: '',
    relation_degree: '',
    applicant_contact: '',
    missing_person_name: '',
    photo: null,
    gender: '',
    birth_date: '',
    missing_region: '',
    additional_regions: '',
    missing_person_contact: '',
    missing_area: '',
    missing_date: '',
    missing_time: '',
    police_report: false,
    search_area_type: '',
    disappearance_circumstances: '',
    health_condition: '',
    clothing_description: '',
    distinctive_features: '',
    belongings: '',
    additional_info: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    try {
      await api.post('/profiles/person/', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Профиль создан успешно');
    } catch (error) {
      console.error('Ошибка при создании профиля:', error);
      alert('Не удалось создать профиль');
    }
  };

  return (
    <div className="create-profile-form">
      <h2>Создать профиль пропавшего человека</h2>
      <form onSubmit={handleSubmit}>
        <label>ФИО заявителя:</label>
        <input type="text" name="applicant_name" value={formData.applicant_name} onChange={handleChange} required />

        <label>Степень родства:</label>
        <input type="text" name="relation_degree" value={formData.relation_degree} onChange={handleChange} required />

        <label>Контактный телефон заявителя:</label>
        <input type="tel" name="applicant_contact" value={formData.applicant_contact} onChange={handleChange} required />

        <label>ФИО пропавшего:</label>
        <input type="text" name="missing_person_name" value={formData.missing_person_name} onChange={handleChange} required />

        <label>Фото пропавшего:</label>
        <input type="file" name="photo" onChange={handleFileChange} />

        <label>Пол пропавшего:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Выберите пол</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="other">Другое</option>
        </select>

        <label>Дата рождения:</label>
        <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} />

        <label>Область пропажи:</label>
        <input type="text" name="missing_region" value={formData.missing_region} onChange={handleChange} />

        <label>Дополнительные области поиска:</label>
        <input type="text" name="additional_regions" value={formData.additional_regions} onChange={handleChange} />

        <label>Номер телефона пропавшего:</label>
        <input type="tel" name="missing_person_contact" value={formData.missing_person_contact} onChange={handleChange} />

        <label>Местность пропажи:</label>
        <input type="text" name="missing_area" value={formData.missing_area} onChange={handleChange} />

        <label>Дата пропажи:</label>
        <input type="date" name="missing_date" value={formData.missing_date} onChange={handleChange} />

        <label>Время пропажи:</label>
        <input type="time" name="missing_time" value={formData.missing_time} onChange={handleChange} />

        <label>
          Заявление в полицию:
          <input type="checkbox" name="police_report" checked={formData.police_report} onChange={handleChange} />
        </label>

        <label>Тип местности поиска:</label>
        <select name="search_area_type" value={formData.search_area_type} onChange={handleChange}>
          <option value="">Выберите тип</option>
          <option value="city">Город</option>
          <option value="forest">Лес</option>
        </select>

        <label>Обстоятельства пропажи:</label>
        <textarea name="disappearance_circumstances" value={formData.disappearance_circumstances} onChange={handleChange} />

        <label>Состояние здоровья:</label>
        <textarea name="health_condition" value={formData.health_condition} onChange={handleChange} />

        <label>Во что одет пропавший:</label>
        <textarea name="clothing_description" value={formData.clothing_description} onChange={handleChange} />

        <label>Особые приметы:</label>
        <textarea name="distinctive_features" value={formData.distinctive_features} onChange={handleChange} />

        <label>Что у пропавшего было с собой:</label>
        <textarea name="belongings" value={formData.belongings} onChange={handleChange} />

        <label>Дополнительная информация:</label>
        <textarea name="additional_info" value={formData.additional_info} onChange={handleChange} />

        <button type="submit">Создать профиль</button>
      </form>
    </div>
  );
};

export default CreatePersonProfile;
