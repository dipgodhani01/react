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
    path: "/register",
    component: lazy(() => import("../../pages/Register")),
    meta: {
      authRoute: false,
    },
  },
  {
    path: "/forgot_password",
    component: lazy(() => import("../../pages/ResetPassword")),
    meta: {
      authRoute: false,
    },
  },
  {
    path: "/verification",
    component: lazy(() => import("../../pages/VerifyOTP")),
    meta: {
      authRoute: false,
    },
  },
  {
    path: "/privacy_policy",
    component: lazy(() => import("../../pages/PrivacyPolicy")),
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/contact_us",
    component: lazy(() => import("../../pages/ContactUs")),
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/home",
    component: lazy(() => import("../../pages/Home")),
    meta: {
      authRoute: true,
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
    path: "/alerts",
    component: lazy(() => import("../../pages/Alerts")),
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/signals",
    component: lazy(() => import("../../pages/Signals")),
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/market",
    component: lazy(() => import("../../pages/Market")),
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/profile",
    component: lazy(() => import("../../pages/Profile")),
    meta: {
      authRoute: true,
    },
  },
  {
    path: "home/live_chart",
    component: lazy(() => import("../../pages/LiveChart")),
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/home/pivot_technical",
    component: lazy(() => import("../../pages/PivotAndTechnical")),
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/home/market_news",
    component: lazy(() => import("../../pages/MarketNews")),
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/home/plan_pricing",
    component: lazy(() => import("../../pages/Pricing")),
    meta: {
      authRoute: true,
    },
  },
];

export default RoutesPaths;
