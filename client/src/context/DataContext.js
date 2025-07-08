import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../redux/Action";
import { useDispatch } from "react-redux";

const DataContext = createContext();
export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getUser(setUser));
  }, [dispatch]);

  const values = {
    user,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
