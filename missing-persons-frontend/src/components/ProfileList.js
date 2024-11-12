// src/components/ProfileList.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import './ProfileList.css';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [profileType, setProfileType] = useState('person'); // person или animal

  useEffect(() => {
    // Запрашиваем список профилей в зависимости от выбранного типа
    const fetchProfiles = async () => {
      try {
        const endpoint = profileType === 'person' ? '/profiles/person/' : '/profiles/animal/';
        const response = await api.get(endpoint);
        setProfiles(response.data);
      } catch (error) {
        console.error('Ошибка при получении профилей:', error);
      }
    };

    fetchProfiles();
  }, [profileType]);

  const handleProfileTypeChange = (type) => {
    setProfileType(type);
  };

  return (
    <div className="profile-list-container">
      <h1>{profileType === 'person' ? 'Пропавшие люди' : 'Пропавшие животные'}</h1>

      <div className="profile-type-selector">
        <button
          className={profileType === 'person' ? 'active' : ''}
          onClick={() => handleProfileTypeChange('person')}
        >
          Пропавшие люди
        </button>
        <button
          className={profileType === 'animal' ? 'active' : ''}
          onClick={() => handleProfileTypeChange('animal')}
        >
          Пропавшие животные
        </button>
      </div>

      <ul className="profile-list">
        {profiles.map((profile) => (
          <li key={profile.id} className="profile-item">
            {profile.photo && (
              <img
                src={profile.photo}
                alt={`${profileType === 'person' ? profile.missing_person_name : profile.pet_type}`}
                className="profile-photo"
              />
            )}
            <div className="profile-details">
              <h2 className="profile-name">
                {profileType === 'person' ? profile.missing_person_name : `${profile.pet_type} - ${profile.applicant_name}`}
              </h2>
              <p><strong>Область пропажи:</strong> {profile.missing_region}</p>
              <p><strong>Местность пропажи:</strong> {profile.missing_area}</p>
              <p><strong>Дата пропажи:</strong> {profile.missing_date}</p>
              <p><strong>Тип местности поиска:</strong> {profile.search_area_type === 'city' ? 'Город' : 'Лес'}</p>
              {profileType === 'person' ? (
                <p><strong>Особые приметы:</strong> {profile.distinctive_features}</p>
              ) : (
                <p><strong>Описание:</strong> {profile.distinctive_features}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
