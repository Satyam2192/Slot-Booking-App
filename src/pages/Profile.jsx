import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { username, setUsername } = useContext(UserContext);
  const timezone = localStorage.getItem(`timezone_${username}`) || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername("");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-500">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">User Profile</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <p className="text-lg text-gray-800 dark:text-gray-200">Username: {username}</p>
        <p className="text-lg text-gray-800 dark:text-gray-200">Timezone: {timezone}</p>
      </div>
      <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded transition-colors duration-300 hover:bg-red-600">
        Change Username
      </button>
    </div>
  );
};

export default Profile;
