// src/components/CreateAnimalProfile.js
import React, { useState } from 'react';
import api from '../api';
import './CreateProfileForm.css';

const CreateAnimalProfile = () => {
  const [formData, setFormData] = useState({
    applicant_name: '',
    relation_degree: '',
    applicant_contact: '',
    pet_type: '',
    pet_gender: '',
    photo: null,
    missing_region: '',
    additional_regions: '',
    missing_area: '',
    missing_date: '',
    missing_time: '',
    search_area_type: '',
    disappearance_circumstances: '',
    distinctive_features: '',
    belongings: '',
    additional_info: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
      await api.post('/profiles/animal/', form, {
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
      <h2>Создать профиль пропавшего животного</h2>
      <form onSubmit={handleSubmit}>
        <label>ФИО заявителя:</label>
        <input type="text" name="applicant_name" value={formData.applicant_name} onChange={handleChange} required />

        <label>Степень родства:</label>
        <input type="text" name="relation_degree" value={formData.relation_degree} onChange={handleChange} required />

        <label>Контактный телефон заявителя:</label>
        <input type="tel" name="applicant_contact" value={formData.applicant_contact} onChange={handleChange} required />

        <label>Вид питомца:</label>
        <select name="pet_type" value={formData.pet_type} onChange={handleChange} required>
          <option value="">Выберите вид</option>
          <option value="dog">Собака</option>
          <option value="cat">Кот</option>
          <option value="other">Другое</option>
        </select>

        <label>Пол питомца:</label>
        <select name="pet_gender" value={formData.pet_gender} onChange={handleChange} required>
          <option value="">Выберите пол</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>

        <label>Фото питомца:</label>
        <input type="file" name="photo" onChange={handleFileChange} />

        <label>Область пропажи:</label>
        <input type="text" name="missing_region" value={formData.missing_region} onChange={handleChange} />

        <label>Дополнительные области поиска:</label>
        <input type="text" name="additional_regions" value={formData.additional_regions} onChange={handleChange} />

        <label>Местность пропажи:</label>
        <input type="text" name="missing_area" value={formData.missing_area} onChange={handleChange} />

        <label>Дата пропажи:</label>
        <input type="date" name="missing_date" value={formData.missing_date} onChange={handleChange} />

        <label>Время пропажи:</label>
        <input type="time" name="missing_time" value={formData.missing_time} onChange={handleChange} />

        <label>Тип местности поиска:</label>
        <select name="search_area_type" value={formData.search_area_type} onChange={handleChange}>
          <option value="">Выберите тип</option>
          <option value="city">Город</option>
          <option value="forest">Лес</option>
        </select>

        <label>Обстоятельства пропажи:</label>
        <textarea name="disappearance_circumstances" value={formData.disappearance_circumstances} onChange={handleChange} />

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

export default CreateAnimalProfile;
