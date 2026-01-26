import { Box, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MainContainer from '../../layout/styles/MainContainer';

const PrivacyPolicyPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <MainContainer>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {t('privacyPolicy.title')}
                </Typography>
                <Divider sx={{ marginTop: "8px", marginBottom: "8px" }} />
                
                <Typography variant="body2" sx={{ marginBottom: "16px" }}>
                    {t('privacyPolicy.effectiveDate')}
                </Typography>

                <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                    {t('privacyPolicy.introduction')}
                </Typography>

                <Box sx={{ marginBottom: "8px" }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'primary.main' }}>
                        {t('privacyPolicy.section1.title')}
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ lineHeight: 1.7 }}>
                        {t('privacyPolicy.section1.content')}
                        <br />
                        • {t('privacyPolicy.section1.item1')}
                        <br />
                        • {t('privacyPolicy.section1.item2')}
                        <br />
                        • {t('privacyPolicy.section1.item3')}
                    </Typography>
                </Box>

                <Box sx={{ marginBottom: "8px" }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'primary.main' }}>
                        {t('privacyPolicy.section2.title')}
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ lineHeight: 1.7 }}>
                        {t('privacyPolicy.section2.content')}
                        <br />
                        • {t('privacyPolicy.section2.items')}
                    </Typography>
                </Box>

                <Box sx={{ marginBottom: "8px" }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'primary.main' }}>
                        {t('privacyPolicy.section3.title')}
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ lineHeight: 1.7 }}>
                        {t('privacyPolicy.section3.content')}
                    </Typography>
                </Box>

                <Box sx={{ marginBottom: "8px" }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'primary.main' }}>
                        {t('privacyPolicy.section4.title')}
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ lineHeight: 1.7 }}>
                        {t('privacyPolicy.section4.content')}
                        <br />
                        • {t('privacyPolicy.section4.item1')}
                        <br />
                        • {t('privacyPolicy.section4.item2')}
                        <br />
                        • {t('privacyPolicy.section4.item3')}
                    </Typography>
                </Box>

                <Box sx={{ marginTop: 2, padding: 2, bgcolor: 'action.hover', borderRadius: 1, marginBottom: "24px" }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {t('privacyPolicy.section5.title')}
                    </Typography>
                    <Typography variant="body2">
                        {t('privacyPolicy.section5.officer')}
                        <br />
                        {t('privacyPolicy.section5.email')}
                    </Typography>
                </Box>
            </MainContainer>
        </>
    );
};

export default PrivacyPolicyPage;
