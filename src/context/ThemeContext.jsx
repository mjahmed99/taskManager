// src/context/ThemeContext.jsx
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={isDark ? 'dark' : 'light'}>
        <button onClick={toggleTheme}>Toggle Theme</button>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
