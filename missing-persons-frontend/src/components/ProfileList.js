// src/components/ProfileList.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import './ProfileList.css';

const ProfileList = ({ profileType, searchTerm }) => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    api.get('/profiles/')
      .then((response) => {
        const filteredProfiles = response.data
          .filter((profile) => profile.profile_type === profileType)
          .filter((profile) => profile.name.toLowerCase().includes(searchTerm.toLowerCase())) // Фильтрация по запросу
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setProfiles(filteredProfiles);
      })
      .catch((error) => console.error('Ошибка при получении профилей:', error));
  }, [profileType, searchTerm]);

  return (
    <div className="profile-list-container">
      <h1>{profileType === 'person' ? 'Пропавшие люди' : 'Пропавшие животные'}</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id} className="profile-item">
            {profile.photo && (
              <img
                src={profile.photo}
                alt={profile.name}
                className="profile-photo"
              />
            )}
            <div className="profile-details">
              <h2 className="profile-name">{profile.name}</h2>
              <p className="profile-description">{profile.description}</p>
              <p className="profile-info"><strong>Последнее известное место:</strong> {profile.last_seen_location}</p>
              <p className="profile-info"><strong>Статус:</strong> {profile.status}</p>
              <p className="profile-info"><strong>Тип профиля:</strong> {profile.profile_type === 'person' ? 'Человек' : 'Животное'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
