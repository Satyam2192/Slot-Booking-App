import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Get the stored username if available
  const [username, setUsername] = useState(() => localStorage.getItem("username") || "");

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    }
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
