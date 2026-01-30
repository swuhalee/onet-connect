import { Typography, Divider } from '@mui/material';
import { useTranslation, Trans } from 'react-i18next';
import MainContainer from '../../layout/styles/MainContainer';
import { OG_IMAGE_URL } from '../../configs/appUrl';

const HomePage = () => {
    const { t } = useTranslation();

    return (
        <>
            <title>{t('meta.home.title')}</title>
            <meta name="description" content={t('meta.home.description')} />
            <meta property="og:title" content={t('meta.home.title')} />
            <meta property="og:description" content={t('meta.home.description')} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={OG_IMAGE_URL} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={t('meta.home.title')} />
            <meta name="twitter:description" content={t('meta.home.description')} />
            <meta name="twitter:image" content={OG_IMAGE_URL} />

            <MainContainer>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {t('home.gameIntroduction')}
                </Typography>
                <Divider sx={{ marginTop: "8px", marginBottom: "12px" }} />
                <Typography variant="body1" sx={{ marginBottom: "24px" }}>
                    <Trans
                        i18nKey="home.gameIntroductionText"
                        components={[
                            <Typography key="0" component="span" sx={{ fontWeight: 500 }} />
                        ]}
                    />
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "24px" }}>
                    {t('home.rules')}
                </Typography>
                <Divider sx={{ marginTop: "8px", marginBottom: "12px" }} />

                <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                    {t('home.rulesText1')}
                </Typography>

                <Typography variant="body1" sx={{ marginBottom: "24px" }}>
                    <Trans
                        i18nKey="home.rulesText2"
                        components={[
                            <Typography key="0" component="span" sx={{ fontWeight: 700 }} />
                        ]}
                    />
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "24px" }}>
                    {t('home.gravityPattern')}
                </Typography>
                <Divider sx={{ marginTop: "8px", marginBottom: "12px" }} />
                <Typography variant="body1" sx={{ marginBottom: "24px" }}>
                    {t('home.gravityPatternText')}
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "24px" }}>
                    {t('home.hintAndShuffle')}
                </Typography>
                <Divider sx={{ marginTop: "8px", marginBottom: "12px" }} />
                <Typography variant="body1" sx={{ marginBottom: "24px" }}>
                    <Trans
                        i18nKey="home.hintAndShuffleText"
                        components={[
                            <Typography key="0" component="span" sx={{ fontWeight: 700 }} />,
                            <Typography key="1" component="span" sx={{ fontWeight: 500 }} />
                        ]}
                    />
                </Typography>
            </MainContainer>
        </>
    );
};

export default HomePage;