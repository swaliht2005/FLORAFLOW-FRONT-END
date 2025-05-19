

import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [user, setUser] = useState({
    profileImage: '1746035514731-310521470.jpeg',
  });

  return (
    <ProfileContext.Provider value={{ profileImage, user, setProfileImage, setUser }}>
      {children}
    </ProfileContext.Provider>
  );
};