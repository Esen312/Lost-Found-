// src/components/ProfileListPerson.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './ProfileListPerson.css';

const ProfileListPerson = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await api.get('/profiles/person/');
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

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="profile-list-person-container">
      <h1>Список пропавших людей</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id} className="profile-list-person-item">
            <Link to={`/people/${profile.id}`} className="profile-list-person-link">
              {profile.photo && (
                <img
                  src={profile.photo}
                  alt={profile.missing_person_name}
                  className="profile-list-person-photo"
                />
              )}
              <div className="profile-list-person-details">
                <h2>Имя пропавшего: {profile.missing_person_name}</h2>
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

export default ProfileListPerson;
