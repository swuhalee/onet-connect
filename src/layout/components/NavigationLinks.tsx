import { Link, useLocation, useParams } from "react-router";
import { Box, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "../../utils/languageDetection";

const NavigationLinksContainer = styled(Box)(({ theme }) => ({
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: "32px",
    [theme.breakpoints.down('sm')]: {
        display: "none",
    },
}));

const NavLink = styled(Link, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
    height: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    fontSize: "16px",
    fontWeight: active ? 600 : 400,
    position: "relative",
    padding: "0 8px",
    ...(active && {
        "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            backgroundColor: theme.palette.primary.main,
        },
    }),
    "&:hover": {
        color: theme.palette.primary.main,
    },
}));

const NavigationLinks = () => {
    const location = useLocation();
    const { lng } = useParams();
    const { t, i18n } = useTranslation();
    const currentLng = getCurrentLanguage(lng, i18n.language);
    
    const isGameActive = location.pathname === `/${currentLng}/game`;
    const isRankingActive = location.pathname === `/${currentLng}/ranking`;

    return (
        <NavigationLinksContainer>
            <NavLink to={`/${currentLng}/game`} active={isGameActive}>
                {t('navigation.game')}
            </NavLink>
            <NavLink to={`/${currentLng}/ranking`} active={isRankingActive}>
                {t('navigation.ranking')}
            </NavLink>
        </NavigationLinksContainer>
    );
};

export default NavigationLinks;
