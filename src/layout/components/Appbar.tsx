import { useLocation, Link } from "react-router";
import { Box, CircularProgress, Container, ListItemIcon, Menu, MenuItem, styled, Typography } from "@mui/material";
import LoginButton from "./LoginButton";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { StyledButton } from "../../common/styles/StyledButton";
import LogoutIcon from '@mui/icons-material/Logout';
import BuildIcon from '@mui/icons-material/Build';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from "react";
import { useLogout } from "../../hooks/useLogout";

const AppbarWrapper = styled(Box)(({ theme }) => ({
    height: "80px",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const AppbarContainer = styled(Container)(({ theme }) => ({
    height: "100%",
    maxWidth: theme.breakpoints.values.lg,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
}));

const LeftSection = styled(Box)({
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: "48px",
});

const AppbarLogo = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "12px",
});

const LogoImage = styled("img")({
    width: "65px",
    height: "50px",
    objectFit: "contain",
});

const LogoText = styled(Typography)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: 500,
    color: theme.palette.text.primary,
}));

const NavigationLinks = styled(Box)({
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: "32px",
});

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

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        marginTop: theme.spacing(1.5),
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            marginLeft: theme.spacing(-0.5),
            marginRight: theme.spacing(1),
        },
        '& .MuiMenuItem-root': {
            '&:hover': {
                backgroundColor: theme.palette.background.default,
            },
        },
        '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            backgroundColor: theme.palette.background.paper,
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
}));

const AppBar = () => {
    /**
     * 현재 페이지 경로 확인 부분
     */
    const location = useLocation();
    const isGameActive = location.pathname === "/";
    const isRankingActive = location.pathname === "/ranking";


    const { data: userProfile } = useGetUserProfile();
    const { mutate: logout, isPending: isLogoutPending } = useLogout();

    /**
     * 메뉴 표시 관련 부분
     */
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppbarWrapper>
            <AppbarContainer>
                <LeftSection>
                    <AppbarLogo>
                        <LogoImage src="/logo.svg" alt="Onet Connect Logo" />
                        <LogoText>Onet Connect</LogoText>
                    </AppbarLogo>

                    <NavigationLinks>
                        <NavLink to="/" active={isGameActive}>
                            게임
                        </NavLink>
                        <NavLink to="/ranking" active={isRankingActive}>
                            랭킹
                        </NavLink>
                    </NavigationLinks>
                </LeftSection>

                {
                    userProfile
                        ? <>
                            <StyledButton onClick={handleClick}>
                                <AccountCircleIcon fontSize="small" sx={{ marginRight: "8px" }} />
                                {userProfile?.displayName}
                            </StyledButton>

                            <StyledMenu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem component={Link} to="/account" sx={{ fontSize: "14px" }}>
                                    <ListItemIcon>
                                        <BuildIcon fontSize="small" />
                                    </ListItemIcon>
                                    계정
                                </MenuItem>
                                <MenuItem sx={{ fontSize: "14px" }} onClick={() => logout()}>
                                    {
                                        isLogoutPending
                                            ? <CircularProgress size={14} />
                                            : (
                                                <>
                                                    <ListItemIcon>
                                                        <LogoutIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    로그아웃
                                                </>
                                            )
                                    }
                                </MenuItem>
                            </StyledMenu>
                        </>
                        : <LoginButton />
                }
            </AppbarContainer>
        </AppbarWrapper>
    )
}

export default AppBar
