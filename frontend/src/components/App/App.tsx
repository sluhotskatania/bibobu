import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../../redux/auth/operations";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";
import { Toaster } from "react-hot-toast";

import Loader from "../Loader/Loader";
import { AppDispatch } from "../../redux/store";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PublicRoute from "../PublicRoute/PublicRoute";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const ToursPage = lazy(() => import("../../pages/ToursPage/ToursPage"));
const TourDetailsPage = lazy(
  () => import("../../pages/TourDetailsPage/TourDetailsPage")
);
const AboutPage = lazy(() => import("../../pages/AboutPage/AboutPage"));
const RegisterPage = lazy(
  () => import("../../pages/RegisterPage/RegisterPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RequestResetEmailPage = lazy(
  () => import("../../pages/RequestResetEmailPage/RequestResetEmailPage")
);
const ResetPasswordPage = lazy(
  () => import("../../pages/ResetPasswordPage/ResetPasswordPage")
);
const ProfilePage = lazy(() => import("../../pages/ProfilePage/ProfilePage"));

export default function App() {
  const dispatch: AppDispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(refreshToken());
    }
  }, [dispatch, isLoggedIn]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Публічні сторінки */}
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/request-reset-email"
            element={
              <PublicRoute>
                <RequestResetEmailPage />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPasswordPage />
              </PublicRoute>
            }
          />

          {/* Захищені сторінки */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Доступні для всіх */}
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/:id" element={<TourDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
