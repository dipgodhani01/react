import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import RoutesPaths from "./routes/index";
import PageNotFound from "../pages/PageNotFound";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../redux/Action";
import { useState } from "react";
import LoaderLarge from "../component/LoaderLarge";

function Router() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.data.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(getUser());
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (!loading && user?.isLogin && location.pathname === "/login") {
      navigate("/");
    }
  }, [user, location.pathname, navigate, loading]);

  const FinalRoute = (props) => {
    const route = props?.route;
    if (loading) {
      return <LoaderLarge />;
    }
    if ((!user || !user.isLogin) && route?.meta?.authRoute === true) {
      return <Navigate to="/login" replace={true} state={{ from: location }} />;
    }
    return <route.component {...props} />;
  };

  if (loading) {
    return <LoaderLarge />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {RoutesPaths.map((route, index) => {
          return (
            <Route
              exact
              key={index}
              path={route?.path}
              element={<FinalRoute route={route} />}
            />
          );
        })}
      </Route>
      <Route exact path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
