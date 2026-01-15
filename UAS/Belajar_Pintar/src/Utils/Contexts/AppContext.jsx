import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [achievements, setAchievements] = useState(['Belajar Start!']); 
  const [theme, setTheme] = useState('light'); 

  const addAchievement = (badge) => {
    setAchievements((prev) => [...new Set([...prev, badge])]); 
  };

  return (
    <AppContext.Provider value={{ achievements, addAchievement, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext); 