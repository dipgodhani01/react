import { createContext, useContext, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { getAdmin } from "../redux/Action";

const DataContext = createContext();
export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getAdmin(setUser));
  }, [dispatch]);

  const values = {
    user,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
