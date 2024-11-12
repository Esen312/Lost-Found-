// src/components/PersonProfileDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './PersonProfileDetail.css';

const PersonProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profiles/person/${id}/`);
        setProfile(response.data);
      } catch (error) {
        console.error('Ошибка при получении профиля:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const translateGender = (gender) => {
    switch (gender) {
      case 'male':
        return 'Мужской';
      case 'female':
        return 'Женский';
      default:
        return 'Другое';
    }
  };

  const translateAreaType = (type) => {
    return type === 'city' ? 'Город' : 'Лес';
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (!profile) {
    return <p>Профиль не найден.</p>;
  }

  return (
    <div className="person-profile-detail-container">
      <h1>{profile.missing_person_name}</h1>
      {profile.photo && (
        <img
          src={profile.photo}
          alt={profile.missing_person_name}
          className="person-profile-detail-photo"
        />
      )}
      <div className="person-profile-detail-info">
        <p><strong>ФИО заявителя:</strong> {profile.applicant_name}</p>
        <p><strong>Степень родства:</strong> {profile.relation_degree}</p>
        <p><strong>Контактный телефон заявителя:</strong> {profile.applicant_contact}</p>
        <p><strong>Пол пропавшего:</strong> {translateGender(profile.gender)}</p>
        <p><strong>Дата рождения:</strong> {profile.birth_date}</p>
        <p><strong>Область пропажи:</strong> {profile.missing_region}</p>
        <p><strong>Дополнительные области поиска:</strong> {profile.additional_regions}</p>
        <p><strong>Дата пропажи:</strong> {profile.missing_date}</p>
        <p><strong>Время пропажи:</strong> {profile.missing_time}</p>
        <p><strong>Тип местности поиска:</strong> {translateAreaType(profile.search_area_type)}</p>
        <p><strong>Обстоятельства пропажи:</strong> {profile.disappearance_circumstances}</p>
        <p><strong>Состояние здоровья:</strong> {profile.health_condition}</p>
        <p><strong>Во что одет пропавший:</strong> {profile.clothing_description}</p>
        <p><strong>Особые приметы:</strong> {profile.distinctive_features}</p>
        <p><strong>Что у пропавшего было с собой:</strong> {profile.belongings}</p>
      </div>
      <div className="additional-info">
        <h2>Дополнительная информация</h2>
        <p>{profile.additional_info}</p>
      </div>
    </div>
  );
};

export default PersonProfileDetail;
