import { Box, Drawer, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link, useLocation, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import GameIcon from '@mui/icons-material/Casino';
import RankingIcon from '@mui/icons-material/Stars';

interface MobileDrawerProps {
    open: boolean;
    onClose: () => void;
}

const DrawerHeader = styled(Box)(({ theme }) => ({
    height: "80px",
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const MenuContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
});

const MenuItem = styled(Link, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px",
    textDecoration: "none",
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    backgroundColor: active ? theme.palette.primary.main + "20" : "transparent",
    "&:hover": {
        backgroundColor: active ? theme.palette.primary.main + "30" : theme.palette.action.hover,
    },
}));

const MobileDrawer = ({ open, onClose }: MobileDrawerProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();
    const { lng } = useParams();
    const { t } = useTranslation();
    const currentLng = lng || 'ko';

    const isGameActive = location.pathname === `/${currentLng}` || location.pathname === `/${currentLng}/`;
    const isRankingActive = location.pathname === `/${currentLng}/ranking`;

    if (!isMobile) {
        return null;
    }

    const backdropColor = theme.palette.mode === 'light'
        ? 'rgba(255, 255, 255, 0.5)'
        : 'rgba(0, 0, 0, 0.5)';

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: backdropColor,
                    },
                },
            }}
            sx={{
                width: "40%",
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: "40%",
                },
            }}
        >
            <DrawerHeader />
            <MenuContainer>
                <MenuItem to={`/${currentLng}`} active={isGameActive} onClick={onClose}>
                    <GameIcon />
                    <Typography>{t('navigation.game')}</Typography>
                </MenuItem>
                <MenuItem to={`/${currentLng}/ranking`} active={isRankingActive} onClick={onClose}>
                    <RankingIcon />
                    <Typography>{t('navigation.ranking')}</Typography>
                </MenuItem>
            </MenuContainer>
        </Drawer>
    );
};

export default MobileDrawer;
