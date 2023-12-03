import React, { createContext, useEffect, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
const [loggedin, setloggedin] = useState(null) 


useEffect(()=> {
   setloggedin(localStorage.getItem("MyShopAuthToken"))
},[])

  return (
    <AppContext.Provider value={{loggedin, setloggedin}}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext};
