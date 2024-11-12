// src/components/ProfileListAnimals.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './ProfileListAnimals.css';

const ProfileListAnimals = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await api.get('/profiles/animal/');
        const sortedProfiles = response.data.sort(
          (a, b) => new Date(b.missing_date) - new Date(a.missing_date)
        );
        setProfiles(sortedProfiles);
      } catch (error) {
        console.error('Ошибка при получении профилей:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

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

  return (
    <div className="profile-list-animals-container">
      <h1>Список пропавших животных</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id} className="profile-list-animals-item">
            <Link to={`/animals/${profile.id}`} className="profile-list-animals-link">
              {profile.photo && (
                <img
                  src={profile.photo}
                  alt={`${translatePetType(profile.pet_type)} - ${profile.applicant_name}`}
                  className="profile-list-animals-photo"
                />
              )}
              <div className="profile-list-animals-details">
                <h2>Вид питомца: {translatePetType(profile.pet_type)}</h2>
                <p><strong>ФИО заявителя:</strong> {profile.applicant_name}</p>
                <p><strong>Область пропажи:</strong> {profile.missing_region}</p>
                <p><strong>Дата пропажи:</strong> {profile.missing_date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileListAnimals;
