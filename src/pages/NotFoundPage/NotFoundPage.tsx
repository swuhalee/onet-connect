import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import MainContainer from "../../layout/styles/MainContainer";
import i18n from "../../i18n";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <title>{t('meta.notFound.title')}</title>
      <meta name="description" content={t('meta.notFound.description')} />
      <meta property="og:title" content={t('meta.notFound.title')} />
      <meta property="og:description" content={t('meta.notFound.description')} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t('meta.notFound.title')} />
      <meta name="twitter:description" content={t('meta.notFound.description')} />
      <meta name="twitter:image" content="/og-image.png" />

      <MainContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            gap: 3,
          }}
        >
        <Typography variant="h1" sx={{ fontSize: "72px", fontWeight: "bold" }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          {t('notFound.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('notFound.message')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/${i18n.language}`)}
          sx={{
            marginTop: 2,
            padding: "8px 24px",
            borderRadius: "0px",
            fontSize: "14px",
            fontWeight: 500,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          {t('notFound.goHome')}
        </Button>
        </Box>
      </MainContainer>
    </>
  );
};

export default NotFoundPage;
