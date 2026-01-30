import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { detectBrowserLanguage } from '../utils/languageDetection';

const AppLayout = React.lazy(() => import('../layout/AppLayout'));
const HomePage = React.lazy(() => import('../pages/HomePage/HomePage'));
const GamePage = React.lazy(() => import('../pages/GamePage/GamePage'));
const RankingPage = React.lazy(() => import('../pages/RankingPage/RankingPage'));
const AccountPage = React.lazy(() => import('../pages/AccountPage/AccountPage'));
const PrivacyPolicyPage = React.lazy(() => import('../pages/PrivacyPolicyPage/PrivacyPolicyPage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
const ErrorPage = React.lazy(() => import('../pages/ErrorPage/ErrorPage'));

// TODO: Loading 화면 추가
export const router = createBrowserRouter([
  {
    path: '/:lng',
    element: (
      <Suspense fallback={null}>
        <AppLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={null}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'game', element: <GamePage /> },
      { path: 'ranking', element: <RankingPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'privacy', element: <PrivacyPolicyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: '/',
    element: <Navigate to={`/${detectBrowserLanguage()}`} replace />,
  },
  {
    path: '*',
    element: <Navigate to={`/${detectBrowserLanguage()}`} replace />,
  },
]);
