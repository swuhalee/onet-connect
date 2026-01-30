import { RouterProvider } from 'react-router';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useAppTheme } from './theme';
import { SnackbarProvider } from 'notistack';
import { router } from './configs/router';

function App() {
  const theme = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        autoHideDuration={3000}
        maxSnack={3}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
