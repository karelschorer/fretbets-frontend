import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosSetup';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/profile');
        setEmail(response.data.email);
      } catch (err) {
        setError('Failed to fetch profile');
        if (err.response && err.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">User Profile</h2>
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      <div>
        <p className="text-gray-700 text-center">Email: {email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
