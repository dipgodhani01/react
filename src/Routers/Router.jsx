import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Layout from "../layout/Layout";
import PageNotFound from "../pages/PageNotFound";
import RoutesPaths from "./routes";
import { getAdmin } from "../redux/Action";
import LargeLoader from "../component/LargeLoader";

function Router() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.data.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(getAdmin());
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (!loading && admin?.isAdminLogin && location.pathname === "/login") {
      navigate("/dashboard");
    }
  }, [admin, location.pathname, navigate, loading]);

  const FinalRoute = (props) => {
    const route = props?.route;
    if (loading) {
      return <LargeLoader />;
    }

    if ((!admin || !admin.isAdminLogin) && route?.meta?.authRoute === true) {
      return <Navigate to="/login" replace={true} state={{ from: location }} />;
    }

    return <route.component {...props} />;
  };

  if (loading) {
    return <LargeLoader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {RoutesPaths.map((route, index) => (
          <Route
            exact
            key={index}
            path={route.path}
            element={<FinalRoute route={route} />}
          />
        ))}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
