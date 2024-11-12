// src/components/AnimalProfileDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './AnimalProfileDetail.css';

const AnimalProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profiles/animal/${id}/`);
        setProfile(response.data);
      } catch (error) {
        console.error('Ошибка при получении профиля:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const translatePetType = (type) => {
    switch (type) {
      case 'dog':
        return 'Собака';
      case 'cat':
        return 'Кот';
      case 'other':
        return 'Другое';
      default:
        return type;
    }
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (!profile) {
    return <p>Профиль не найден.</p>;
  }

  return (
    <div className="animal-profile-detail-container">
      <h1>Вид питомца: {translatePetType(profile.pet_type)}</h1>
      {profile.photo && (
        <img
          src={profile.photo}
          alt={`${translatePetType(profile.pet_type)}`}
          className="animal-profile-detail-photo"
        />
      )}
      <div className="animal-profile-detail-info">
        <p><strong>ФИО заявителя:</strong> {profile.applicant_name}</p>
        <p><strong>Степень родства:</strong> {profile.relation_degree}</p>
        <p><strong>Контактный телефон:</strong> {profile.applicant_contact}</p>
        <p><strong>Пол питомца:</strong> {profile.pet_gender === 'male' ? 'Мужской' : 'Женский'}</p>
        <p><strong>Область пропажи:</strong> {profile.missing_region}</p>
        <p><strong>Дата пропажи:</strong> {profile.missing_date}</p>
        <p><strong>Время пропажи:</strong> {profile.missing_time}</p>
        <p><strong>Тип местности:</strong> {profile.search_area_type === 'city' ? 'Город' : 'Лес'}</p>
        <p><strong>Особые приметы:</strong> {profile.distinctive_features}</p>
        <p><strong>Что было с собой:</strong> {profile.belongings}</p>
      </div>
      <div className="additional-info">
        <h2>Дополнительная информация</h2>
        <p>{profile.additional_info}</p>
      </div>
    </div>
  );
};

export default AnimalProfileDetail;
