import { lazy } from "react";

const RoutesPaths = [
  {
    path: "/",
    component: lazy(() => import("../../pages/Dashboard")),
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/login",
    component: lazy(() => import("../../pages/Login")),
    meta: {
      authRoute: false,
    },
  },
  {
    path: "/update_password",
    component: lazy(() => import("../../pages/ChangePassword")),
    meta: {
      authRoute: false,
    },
  },
  {
    path: "/dashboard",
    component: lazy(() => import("../../pages/Dashboard")),
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/users",
    component: lazy(() => import("../../pages/Users")),
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/user_details/:id",
    component: lazy(() => import("../../component/users/UserDetails")),
    meta: {
      authRoute: true,
    },
  },
 

];

export default RoutesPaths;
