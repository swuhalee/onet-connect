import { Box, Drawer, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router";
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

    const isGameActive = location.pathname === "/";
    const isRankingActive = location.pathname === "/ranking";

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
                <MenuItem to="/" active={isGameActive} onClick={onClose}>
                    <GameIcon />
                    <Typography>게임</Typography>
                </MenuItem>
                <MenuItem to="/ranking" active={isRankingActive} onClick={onClose}>
                    <RankingIcon />
                    <Typography>랭킹</Typography>
                </MenuItem>
            </MenuContainer>
        </Drawer>
    );
};

export default MobileDrawer;
