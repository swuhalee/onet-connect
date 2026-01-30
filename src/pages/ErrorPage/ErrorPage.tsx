import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { trackError } from '../../utils/analytics';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useEffect } from 'react';
import i18n from '../../i18n';

const ErrorPage = () => {
  const { t } = useTranslation();
  const error = useRouteError();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      trackError(
        `RouteError_${error.status}`,
        error.statusText || `HTTP ${error.status} Error`,
        typeof error.data === 'string' ? error.data : JSON.stringify(error.data)
      );
    } else if (error instanceof Error) {
      trackError(
        error.name || 'UnknownError',
        error.message || 'An unknown error occurred',
        error.stack
      );
    } else {
      trackError('UnknownError', 'An unknown error occurred', String(error));
    }
  }, [error]);

  const handleGoHome = () => {
    navigate(`/${i18n.language}`, { replace: true });
  };

  const handleReload = () => {
    window.location.reload();
  };

  const { title, message } = getErrorDisplay(error, t);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: alpha(theme.palette.text.primary, 0.5) }}>
          {message}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReload}
            sx={{
              padding: '8px 24px',
              borderRadius: '0px',
              fontSize: '14px',
              fontWeight: 500,
              boxShadow: 'none',
              '&:hover': { boxShadow: 'none' },
            }}
          >
            {t('errorPage.reloadPage')}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleGoHome}
            sx={{
              padding: '8px 24px',
              borderRadius: '0px',
              fontSize: '14px',
              fontWeight: 500,
              boxShadow: 'none',
              '&:hover': { boxShadow: 'none' },
            }}
          >
            {t('errorPage.goHome')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

function getErrorDisplay(error: unknown, t: TFunction): { title: string; message: string } {
  if (isRouteErrorResponse(error)) {
    const statusKey = getStatusMessageKey(error.status);
    return {
      title: t('errorPage.title.statusFormat', {
        status: error.status,
        statusMessage: t(statusKey),
      }),
      message: t('errorPage.message.default'),
    };
  }

  if (error instanceof Error) {
    return {
      title: t('errorPage.title.oops'),
      message: t('errorPage.message.default'),
    };
  }

  return {
    title: t('errorPage.title.unknown'),
    message: t('errorPage.message.default'),
  };
}

function getStatusMessageKey(status: number): string {
  const known = [400, 401, 403, 404, 500, 502, 503];
  return known.includes(status) ? `errorPage.status.${status}` : 'errorPage.status.default';
}

export default ErrorPage;
