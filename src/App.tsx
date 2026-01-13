import React from 'react';
import { Route, Routes } from 'react-router'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useAppTheme } from './theme';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const RankingPage = React.lazy(() => import('./pages/RankingPage/RankingPage'));

function App() {
  const theme = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="ranking" element={<RankingPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
