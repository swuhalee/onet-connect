import React from 'react';
import { Route, Routes, Navigate } from 'react-router'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useAppTheme } from './theme';
import { SnackbarProvider } from 'notistack';
import { detectBrowserLanguage } from './utils/languageDetection';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const RankingPage = React.lazy(() => import('./pages/RankingPage/RankingPage'));
const AccountPage = React.lazy(() => import('./pages/AccountPage/AccountPage'));

function App() {
  const theme = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider 
        autoHideDuration={3000}
        maxSnack={3}
      />

      <Routes>
        <Route path="/:lng" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="ranking" element={<RankingPage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
        
        {/* 기본 경로 접속 시 브라우저 언어로 리다이렉트 */}
        <Route path="/" element={<Navigate to={`/${detectBrowserLanguage()}`} replace />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
