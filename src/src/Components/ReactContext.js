import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [favplaces, setfavplaces] = useState([]);

  return (
    <MyContext.Provider value={{ favplaces, setfavplaces }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  return useContext(MyContext);
};

export { MyProvider, useMyContext, MyContext }; // Add MyContext to the export statement
